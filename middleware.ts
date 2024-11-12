import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

const protectedRoutes = [
  '/admin/dashboard',
  '/admin/dashboard/brands',
  '/admin/dashboard/orders',
  '/admin/dashboard/products',
  '/admin/dashboard/users',
  '/user/cart',
  '/user/cart/checkout',
  '/user/orders',
  '/user/profile/settings',
  '/user/wishlist',
];
const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/reset-password/request',
  '/auth/reset-password',
];

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;

  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  headers.set('x-current-path', path);

  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  console.log('path', path);
  console.log('isProtectedRoute', isProtectedRoute);

  const session_id = (await cookies()).get('session_id')?.value;

  if (isProtectedRoute && !session_id) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?return_to=${encodeURIComponent(path)}`,
        request.nextUrl
      )
    );
  }

  // if (isAuthRoute && session_id) {
  //   return NextResponse.redirect(new URL('/', request.nextUrl));
  // }

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
