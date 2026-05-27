"use client";
import React, { useState } from "react";
import { Users, TrendingUp, Flame, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useMobileMenuOpen } from "@/components/layout/AppShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { StatusChart } from "@/components/dashboard/StatusChart";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { useLeads } from "@/hooks/useLeads";

export default function DashboardPage() {
  const onMobileMenuOpen = useMobileMenuOpen();
  const { leads } = useLeads();

  const stats = {
    total: leads.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    hotLeads: leads.filter((l) => l.status === "hot").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Dashboard"
        subtitle={`Overview of your lead pipeline — ${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
        onMobileMenuOpen={onMobileMenuOpen || (() => {})}
      />

      <div className="flex-1 p-4 md:p-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            title="Total Leads"
            value={stats.total}
            subtitle="All time"
            icon={Users}
            iconColor="text-indigo-600"
            iconBg="bg-indigo-50"
            trend={12}
            delay={0}
          />
          <StatCard
            title="New Leads"
            value={stats.newLeads}
            subtitle="Awaiting contact"
            icon={TrendingUp}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
            trend={8}
            delay={100}
          />
          <StatCard
            title="Hot Leads"
            value={stats.hotLeads}
            subtitle="High priority"
            icon={Flame}
            iconColor="text-red-500"
            iconBg="bg-red-50"
            delay={200}
          />
          <StatCard
            title="Converted"
            value={stats.converted}
            subtitle="Deals closed"
            icon={CheckCircle2}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
            trend={5}
            delay={300}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <WeeklyChart />
          </div>
          <div>
            <StatusChart leads={leads} />
          </div>
        </div>

        {/* Recent Leads */}
        <RecentLeads leads={leads} />
      </div>
    </div>
  );
}
