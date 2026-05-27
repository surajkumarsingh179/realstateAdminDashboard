"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { WEEKLY_TREND_DATA } from "@/data/leads";

export function WeeklyChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Weekly Lead Trend</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Leads received vs converted this week</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={WEEKLY_TREND_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="convertedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
          <Area type="monotone" dataKey="leads" name="New Leads" stroke="#6366f1" strokeWidth={2} fill="url(#leadsGradient)" dot={{ fill: "#6366f1", strokeWidth: 0, r: 3 }} />
          <Area type="monotone" dataKey="converted" name="Converted" stroke="#22c55e" strokeWidth={2} fill="url(#convertedGradient)" dot={{ fill: "#22c55e", strokeWidth: 0, r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
