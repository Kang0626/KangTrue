import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.SITE_PASSWORD || 'kks0415293';

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true, message: 'Authenticated' });
      // Invalidate old legacy truescape cookie
      response.cookies.set({
        name: 'truescape_auth',
        value: '',
        path: '/',
        maxAge: 0,
      });
      // Set new authorized cookie
      response.cookies.set({
        name: 'kks_portfolio_auth',
        value: 'kks_authorized_access_2026',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Incorrect password. Access denied.' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request payload.' },
      { status: 400 }
    );
  }
}
