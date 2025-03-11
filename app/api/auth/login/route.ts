import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import UserModel from '../../../../lib/models/userModel';
import { clientPromise } from '../../../../lib/db/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const encoder = new TextEncoder();

async function generateToken(payload: { userId: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(encoder.encode(JWT_SECRET));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = z.object({
      email: z.string().email(),
      password: z.string(),
    }).parse(body);

    await clientPromise;

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const token = await generateToken({ userId: user._id.toString() });

    // Create response with HTTP-only cookie
    const response = NextResponse.json({
      user: { id: user._id, email: user.email, name: user.name }
    });
    
    // Set HTTP-only secure cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure in production
      sameSite: 'strict',
      path: '/',
      maxAge: 60 // 1 minute
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}