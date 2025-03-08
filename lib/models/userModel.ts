import mongoose from "mongoose";
import { User } from "./user";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument, mongoose.Model<UserDocument>>(
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

const UserModel: mongoose.Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
