import { AuthResponseSchema } from "../validations/auth";

interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl || "";
    this.headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const status = response.status;

    try {
      const data = await response.json();
      return { data, status };
    } catch (error) {
      return { error: "Failed to parse response", status };
    }
  }

  private getAuthHeader(): Record<string, string> {
    // Get token from cookie or storage
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    return token ? { Authorization: `Bearer ${token.split("=")[1]}` } : {};
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          ...this.headers,
          ...this.getAuthHeader(),
        },
        body: JSON.stringify(data),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        error: "Network error",
        status: 500,
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: {
          ...this.headers,
          ...this.getAuthHeader(),
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        error: "Network error",
        status: 500,
      };
    }
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient({
  baseUrl: "/api",
});