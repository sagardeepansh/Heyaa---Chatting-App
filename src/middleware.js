import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/signup'];

  // If the user is trying to access a public route, allow it
  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  // If there's no token and the user is not on a public route, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    // If the token is valid, continue with the request
    if (payload) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("JWT verification failed:", error);

    // If the token is invalid, redirect to login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // If something unexpected happens, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Protect all routes except specific ones
};