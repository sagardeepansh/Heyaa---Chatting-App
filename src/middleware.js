import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');

  // console.log("----------------------", token);
  const { pathname } = req.nextUrl;

  // Allow access to the login page without a token
  if (pathname === '/auth/login') {
    return NextResponse.next();
  }

  // Redirect to login if no token is found
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Protect all routes except specified ones
};