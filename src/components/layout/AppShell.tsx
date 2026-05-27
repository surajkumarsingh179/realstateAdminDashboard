"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { isAuthenticated } from "@/lib/auth";
import { Loader2 } from "lucide-react";

const MobileMenuOpenContext = createContext<(() => void) | undefined>(undefined);

export function useMobileMenuOpen() {
  const context = useContext(MobileMenuOpenContext);
  if (!context) {
    throw new Error("useMobileMenuOpen must be used within AppShell");
  }
  return context;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <MobileMenuOpenContext.Provider value={() => setMobileOpen(true)}>
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ onMobileMenuOpen?: () => void }>, {
                onMobileMenuOpen: () => setMobileOpen(true),
              })
            : child
        )}
      </main>
    </div>
    </MobileMenuOpenContext.Provider>
  );
}
