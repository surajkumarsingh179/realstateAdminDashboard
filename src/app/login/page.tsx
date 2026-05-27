"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Building2, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { isAuthenticated } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) router.replace("/dashboard");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[45%] bg-[hsl(222,25%,10%)] p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-white" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full border border-white" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full border border-white" />
        </div>
        <div className="relative z-10 flex items-center gap-3 mb-auto">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">BrokerCRM</p>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>

        <div className="relative z-10 mt-auto mb-16">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-3">Trusted by brokers across India</p>
          <h2 className="text-white text-3xl font-light leading-tight mb-2">
            Manage every lead,
          </h2>
          <h2 className="text-indigo-400 text-3xl font-light leading-tight mb-8">
            close every deal.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            A professional CRM built specifically for real estate broker firms. Track leads, manage follow-ups, and grow your business.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: "Leads Managed", value: "10k+" },
            { label: "Broker Firms", value: "200+" },
            { label: "Deals Closed", value: "₹500Cr+" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-white font-bold text-xl">{s.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <p className="font-bold text-sm text-foreground">BrokerCRM</p>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1.5">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@brokerfirm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-3.5 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground font-medium mb-1.5">Demo Credentials</p>
            <p className="text-xs text-foreground font-mono">admin@brokerfirm.com</p>
            <p className="text-xs text-foreground font-mono">Admin@123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
