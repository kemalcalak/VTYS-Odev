import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import UserModel from '../../../../lib/models/userModel';
import { UserSchema } from '../../../../lib/models/user';
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
    const validatedData = UserSchema.parse(body);

    await clientPromise;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    // Create new user
    const user = await UserModel.create({
      ...validatedData,
      password: hashedPassword,
    });

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
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}