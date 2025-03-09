import { apiClient } from "../api/client";
import { LoginSchema, RegisterSchema } from "../validations/auth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  error?: string;
}

export class AuthService {
  static async login(credentials: LoginCredentials) {
    // Validate input
    const validationResult = LoginSchema.safeParse(credentials);
    if (!validationResult.success) {
      throw new Error("Invalid credentials format");
    }

    const response = await apiClient.post<AuthResponse>("/auth/login", credentials);

    if (response.error || !response.data) {
      throw new Error(response.error || "Login failed");
    }

    return response.data;
  }

  static async register(data: RegisterData) {
    // Validate input
    const validationResult = RegisterSchema.safeParse(data);
    if (!validationResult.success) {
      throw new Error("Invalid registration data format");
    }

    const response = await apiClient.post<AuthResponse>("/auth/register", data);

    if (response.error || !response.data) {
      throw new Error(response.error || "Registration failed");
    }

    return response.data;
  }

  static async getCurrentUser() {
    const response = await apiClient.get<{ user: User }>("/auth/me");

    if (response.error || !response.data) {
      throw new Error(response.error || "Failed to get current user");
    }

    return response.data.user;
  }

  static async logout() {
    const response = await apiClient.post("/auth/logout", {});

    if (response.error) {
      throw new Error(response.error || "Logout failed");
    }

    return true;
  }
}