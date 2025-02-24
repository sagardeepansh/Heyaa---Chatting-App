import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');
  const url = req.nextUrl.clone();

  // console.log("----------->",token)

  // Check if the requested route is not the login page and the user is not authenticated
  if (!token && url.pathname !== '/auth/login' && url.pathname !== '/auth/signup') {
    // Redirect to login if no token and not on the login page
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*'], // Protect all routes under /auth
};
