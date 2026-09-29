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

  // Block unauthorized direct access to assets (3DGS models, GIFs, videos, datasets)
  if (pathname.startsWith('/assets/')) {
    if (!isAuthenticated) {
      return new NextResponse('Access Denied: Unauthorized Asset Access', { status: 403 });
    }
    return NextResponse.next();
  }

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
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
