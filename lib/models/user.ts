import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
