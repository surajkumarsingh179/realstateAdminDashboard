"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Settings, LogOut, Building2,
  ChevronLeft, ChevronRight, X, Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

// Future phases placeholders — not rendered but structure is ready
// { href: "/analytics", label: "Analytics", icon: BarChart3 },
// { href: "/properties", label: "Properties", icon: Home },
// { href: "/team", label: "Team", icon: UserSquare },
// { href: "/notifications", label: "Notifications", icon: Bell },

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const SidebarContent = () => (
    <div className={cn("flex flex-col h-full bg-sidebar-bg border-r border-sidebar-border transition-all duration-300", collapsed ? "w-16" : "w-60")}>
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-sidebar-border", collapsed && "justify-center px-2")}>
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
          <Building2 className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-sidebar-text leading-tight">BrokerCRM</p>
            <p className="text-[10px] text-sidebar-muted uppercase tracking-wider">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                collapsed && "justify-center px-2",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-text hover:bg-sidebar-accent hover:text-sidebar-text"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-sidebar-border" />

      {/* User + Logout */}
      <div className={cn("p-3 space-y-2", collapsed && "flex flex-col items-center")}>
        {!collapsed && user && (
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg">
            <Avatar className="h-7 w-7 flex-shrink-0">
              <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden min-w-0">
              <p className="text-xs font-semibold text-sidebar-text truncate">{user.name}</p>
              <p className="text-[10px] text-sidebar-muted truncate">{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm font-medium text-sidebar-muted hover:bg-red-50 hover:text-red-600 transition-colors",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle (desktop only) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex items-center justify-center p-2 mx-2 mb-2 rounded-lg text-sidebar-muted hover:bg-sidebar-accent transition-colors text-xs gap-1"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onMobileClose} />
          <aside className="absolute left-0 top-0 h-full shadow-2xl">
            <div className="relative h-full">
              <button
                onClick={onMobileClose}
                className="absolute right-3 top-3 z-10 p-1.5 rounded-lg bg-sidebar-accent text-sidebar-muted hover:text-sidebar-text"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
