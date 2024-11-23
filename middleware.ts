import { cookies, headers as NextHeaders } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

function isProtectedRoute(route: string) {
  const protectedRoutePattern = /^\/(admin|user)(\/|$)/;
  return protectedRoutePattern.test(route);
}

function isAuthRoute(route: string) {
  const authRoutePattern = /^\/auth(\/|$)/;
  const excludedRoutes = ['/auth/verify-email']; // Add more routes to exclude if needed
  return authRoutePattern.test(route) && !excludedRoutes.includes(route);
}

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;

  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  headers.set('x-current-path', path);

  console.log('path', path);
  console.log('isProtectedRoute', isProtectedRoute(path));

  const session_id = (await cookies()).get('session_id')?.value;

  if (isProtectedRoute(path) && !session_id) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?return_to=${encodeURIComponent(path)}`,
        request.nextUrl
      )
    );
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
