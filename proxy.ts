import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This site is customer-facing only - worker accounts are handled by a
// separate application and have no routes here.

// Pages that are always reachable, cookie or not.
const PUBLIC_ROUTES = ["/", "/landing", "/login", "/signup", "/otp"];

// Pages that need a logged-in customer.
const USER_ROUTES = [
  "/home",
  "/create-request",
  "/requests",
  "/location",
  "/profile",
  "/alerts",
  "/reviews",
  "/help",
  "/WorkerProfile",
];

// The admin dashboard has no login of its own yet; keep it behind the same
// session cookie so it isn't wide open, without pretending it's fully wired up.
const ADMIN_ROUTES = ["/admin"];

const AUTH_PAGES = ["/login", "/signup", "/otp"];

function matches(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

// A session is only trustworthy when the shared auth_token AND customer_id
// cookie are BOTH present. Requiring both (instead of just auth_token,
// which is what this used to check) fixes the trap where a stale or
// half-cleared cookie made proxy.ts treat someone as logged in - bouncing
// them away from /login on every visit - while the actual customer data
// fetch had nothing to work with and silently fell back to placeholder
// "Guest" data on /home. If only one of the two cookies survives (partial
// clear, expiry drift, manual cookie deletion), the user is now correctly
// treated as logged OUT instead of being stranded on a page with no real
// data behind it.
function isCustomerAuthed(request: NextRequest) {
  return Boolean(request.cookies.get("auth_token")?.value && request.cookies.get("customer_id")?.value);
}

// Wipes every session cookie on the response we're about to send. Used any
// time we've decided the cookie combination is stale/inconsistent, so the
// browser doesn't keep re-sending a half-valid session on every request.
function clearSessionCookies(response: NextResponse) {
  response.cookies.delete("auth_token");
  response.cookies.delete("customer_id");
  return response;
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasToken = Boolean(request.cookies.get("auth_token")?.value);
  const customerAuthed = isCustomerAuthed(request);

  // Public pages are always allowed through, regardless of cookie state,
  // so login and signup never lock themselves out.
  if (matches(path, PUBLIC_ROUTES)) {
    const onAuthPage = matches(path, AUTH_PAGES);

    // Genuinely logged in - sending them back to the login/signup screen
    // is just friction, bounce them home.
    if (onAuthPage && customerAuthed) {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = "/home";
      homeUrl.search = "";
      return NextResponse.redirect(homeUrl);
    }

    // A token exists but doesn't pair up with customer_id (stale/partial
    // cookie state - this was the exact bug: /login kept bouncing to
    // /home even though no valid session backed it). Let the login page
    // render as normal, but wipe the stale cookie first so it doesn't
    // keep interfering on the next request.
    if (onAuthPage && hasToken && !customerAuthed) {
      return clearSessionCookies(NextResponse.next());
    }

    return NextResponse.next();
  }

  const isUserRoute = matches(path, USER_ROUTES);
  const isAdminRoute = matches(path, ADMIN_ROUTES);

  if (isUserRoute && !customerAuthed) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("redirect", path);
    return clearSessionCookies(NextResponse.redirect(loginUrl));
  }

  if (isAdminRoute && !hasToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};