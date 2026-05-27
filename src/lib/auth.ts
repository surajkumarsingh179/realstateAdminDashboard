import { User } from "@/types";

const ADMIN_CREDENTIALS = {
  email: "admin@brokerfirm.com",
  password: "Admin@123",
};

const ADMIN_USER: User = {
  email: "admin@brokerfirm.com",
  name: "Admin User",
  role: "Super Admin",
};

const AUTH_KEY = "re_admin_auth";

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, JSON.stringify(ADMIN_USER));
    }
    return { success: true, user: ADMIN_USER };
  }
  return { success: false, error: "Invalid email or password." };
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function getAuthUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getAuthUser() !== null;
}
