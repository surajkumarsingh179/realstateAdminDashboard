import React from "react";
import { LucideIcon, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: number;
  delay?: number;
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor, iconBg, trend, delay = 0 }: StatCardProps) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-5 opacity-0 animate-fade-in hover:shadow-md transition-shadow"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5">
          <TrendingUp className="w-3 h-3 text-emerald-500" />
          <span className="text-xs text-emerald-600 font-medium">+{trend}% this week</span>
        </div>
      )}
    </div>
  );
}
