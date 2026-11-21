import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/auth/token";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Only guard /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  const isAuthenticated = !!session;

  // If already authenticated and trying to visit /admin/login, send to /admin
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // If unauthenticated, redirect to login page
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    const returnPath = pathname + search;
    if (returnPath && returnPath !== "/admin") {
      loginUrl.searchParams.set("redirect", returnPath);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
