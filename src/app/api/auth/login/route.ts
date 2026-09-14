import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.SITE_PASSWORD || 'Truescape!2026';

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true, message: 'Authenticated' });
      response.cookies.set({
        name: 'truescape_auth',
        value: 'verified_2026',
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
