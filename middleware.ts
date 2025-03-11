import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const encoder = new TextEncoder();

export async function middleware(request: NextRequest) {
  // Check if user is trying to access login page while authenticated
  if (request.nextUrl.pathname.startsWith('/auth/login')) {
    const token = request.cookies.get('token')?.value;
    if (token) {
      try {
        await jwtVerify(token, encoder.encode(JWT_SECRET));
        return NextResponse.redirect(new URL('/profile', request.url));
      } catch (error) {
        // Token is invalid, let them access login page
        return NextResponse.next();
      }
    }
  }

  // Protect /profile routes
  if (request.nextUrl.pathname.startsWith('/profile')) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      await jwtVerify(token, encoder.encode(JWT_SECRET));
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/auth/login']
};