import mongoose, { Document } from "mongoose";
import { User } from "./user";

interface UserDocument extends Omit<User, 'id'>, Document {}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = (mongoose.models.User || mongoose.model<UserDocument>("User", userSchema)) as mongoose.Model<UserDocument>;

export default UserModel;
