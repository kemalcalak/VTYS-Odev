import { z } from "zod";

// Base user schema
export const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Login input validation schema
export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

// Registration input validation schema
export const RegisterSchema = UserSchema.pick({
  email: true,
  password: true,
  name: true,
});

// Environment variables validation schema
export const EnvSchema = z.object({
  MONGO_DB_CONNECTION: z.string().min(1, "MongoDB connection string is required"),
  JWT_SECRET: z.string().min(32, "JWT secret must be at least 32 characters"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// API response schemas
export const UserResponseSchema = UserSchema.omit({
  password: true,
}).extend({
  id: z.string(),
});

export const AuthResponseSchema = z.object({
  message: z.string(),
  user: UserResponseSchema,
  error: z.string().optional(),
});

// Types
export type User = z.infer<typeof UserSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;