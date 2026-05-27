"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthUser, login as authLogin, logout as authLogout } from "@/lib/auth";
import { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const u = getAuthUser();
    setUser(u);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = authLogin(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      router.push("/dashboard");
    }
    return result;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    router.push("/login");
  };

  return { user, loading, login, logout };
}
