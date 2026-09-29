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

  // Strictly protected private route: /showcase (and any subroutes) - Only for Kang with password
  if (pathname.startsWith('/showcase')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login/', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // If user is already authenticated and visits /login, redirect to /showcase/
  if (pathname.startsWith('/login')) {
    if (isAuthenticated) {
      const redirectTarget = request.nextUrl.searchParams.get('redirect') || '/showcase/';
      return NextResponse.redirect(new URL(redirectTarget, request.url));
    }
    return NextResponse.next();
  }

  // All other routes: / (MHIT Proposal), /specs (Research Methodology), and public assets
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
