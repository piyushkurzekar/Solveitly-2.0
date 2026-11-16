import { api, isUnauthorized } from "@/lib/api";
import type { LoginInput, RegisterInput } from "./schemas";

export type UserRole = "student" | "instructor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: UserRole;
  createdAt: string;
}

export const authApi = {
  async me(): Promise<User | null> {
    try {
      const { data } = await api.get<{ user: User }>("/auth/me");
      return data.user;
    } catch (error) {
      if (isUnauthorized(error)) return null;
      throw error;
    }
  },
  async login(input: LoginInput) {
    const { data } = await api.post<{ user: User }>("/auth/login", input);
    return data.user;
  },
  async register(input: RegisterInput) {
    const { data } = await api.post<{ user: User }>("/auth/register", input);
    return data.user;
  },
  async logout() {
    await api.post("/auth/logout");
  },
};
