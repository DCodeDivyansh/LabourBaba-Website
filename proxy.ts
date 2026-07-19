import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pages that are always reachable, cookie or not.
const PUBLIC_ROUTES = ["/", "/landing", "/login", "/signup", "/otp", "/worker/login", "/worker/register"];

// Customer-side pages that need a logged-in customer.
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

// Worker-side pages that need a logged-in worker.
const WORKER_ROUTES = ["/worker/home", "/worker/bookings", "/worker/earnings", "/worker/incoming", "/worker/profile"];

// The admin dashboard has no login of its own yet; keep it behind the same
// session cookie so it isn't wide open, without pretending it's fully wired up.
const ADMIN_ROUTES = ["/admin"];

const AUTH_PAGES = ["/login", "/signup", "/otp"];
const WORKER_AUTH_PAGES = ["/worker/login", "/worker/register"];

function matches(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("auth_token")?.value;

  // Public pages are always allowed through, regardless of cookie state,
  // so worker/customer login and signup never lock themselves out.
  if (matches(path, PUBLIC_ROUTES) || path === "/worker") {
    // ...unless the user is already signed in, in which case sending them
    // back to the login/signup screen is just friction - bounce them home.
    if (token && (matches(path, AUTH_PAGES) || matches(path, WORKER_AUTH_PAGES))) {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = matches(path, WORKER_AUTH_PAGES) ? "/worker/home" : "/home";
      homeUrl.search = "";
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  const isWorkerRoute = matches(path, WORKER_ROUTES);
  const isProtected = matches(path, USER_ROUTES) || isWorkerRoute || matches(path, ADMIN_ROUTES);

  if (isProtected && !token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = isWorkerRoute ? "/worker/login" : "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
