import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('truescape_auth')?.value;
  const { pathname } = request.nextUrl;

  // Allow static assets, next internal files, and api auth routes
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isAuthenticated = authCookie === 'verified_2026';

  // If user is on /login/
  if (pathname.startsWith('/login')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If not authenticated, redirect to /login/
  if (!isAuthenticated) {
    const loginUrl = new URL('/login/', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|assets|favicon.ico).*)'],
};
