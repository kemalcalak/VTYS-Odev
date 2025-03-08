import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../../lib/db/mongodb";
import UserModel, { UserDocument } from "../../../../lib/models/userModel";
import { RegisterSchema } from "../../../../lib/validations/auth";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input using Register schema
    const validationResult = RegisterSchema.safeParse({ name, email, password });
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await UserModel.findOne<UserDocument>({ email: validationResult.data.email }).exec();
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validationResult.data.password, salt);

    // Create new user
    const newUser = new UserModel({
      name: validationResult.data.name,
      email: validationResult.data.email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // Remove password from response
    const userWithoutPassword = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    return NextResponse.json(
      { message: "User registered successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}