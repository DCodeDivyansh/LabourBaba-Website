import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/landing", "/login", "/signup", "/otp"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const path = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith("/(public)") || path.startsWith("/(auth)")
  );

  const isUserRoute = path.startsWith("/(user)") || 
    path.startsWith("/home") || 
    path.startsWith("/create-request") || 
    path.startsWith("/requests") || 
    path.startsWith("/location") || 
    path.startsWith("/profile") || 
    path.startsWith("/alerts") || 
    path.startsWith("/reviews") || 
    path.startsWith("/help") ||
    path.startsWith("/WorkerProfile");

  if (isUserRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if ((path === "/login" || path === "/signup") && token) {
    const homeUrl = new URL("/home", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
