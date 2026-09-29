import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.set({
    name: 'truescape_auth',
    value: '',
    path: '/',
    maxAge: 0,
  });
  response.cookies.set({
    name: 'kks_portfolio_auth',
    value: '',
    path: '/',
    maxAge: 0,
  });
  return response;
}
