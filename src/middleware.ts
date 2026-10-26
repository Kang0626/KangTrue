import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('kks_portfolio_auth')?.value;
  const { pathname } = request.nextUrl;

  const isAuthenticated = authCookie === 'kks_authorized_access_2026';

  // Allow next internal files and api auth routes
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Permanently redirect legacy /showcase to /
  if (pathname.startsWith('/showcase')) {
    return NextResponse.redirect(new URL('/', request.url), 308);
  }

  // If user is already authenticated and visits /login, redirect to /
  if (pathname.startsWith('/login')) {
    if (isAuthenticated) {
      const redirectTarget = request.nextUrl.searchParams.get('redirect') || '/';
      return NextResponse.redirect(new URL(redirectTarget, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
