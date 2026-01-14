import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // This will show in your terminal so we know it's working
  console.log("--- Middleware running on:", request.nextUrl.pathname);

  const authCookie = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!authCookie) {
      console.log("Redirecting to login: No session found.");
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};