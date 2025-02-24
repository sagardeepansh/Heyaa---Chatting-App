// pages/api/auth/logout.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  // Create a response and clear the token cookie
  const response = NextResponse.json({ status: 'success', message: 'Logged out successfully' });

  // Clear the token cookie by setting it to expire in the past
  response.cookies.set('token', '', {
    httpOnly: true,      // Cannot be accessed by JavaScript
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    sameSite: 'Strict',  // Protect against CSRF
    maxAge: -1,          // Expire immediately
    path: '/',           // Make sure the cookie is cleared site-wide
  });

  return response;  // Return the response after clearing the cookie
}
