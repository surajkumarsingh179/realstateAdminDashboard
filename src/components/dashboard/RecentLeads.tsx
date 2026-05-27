"use client";
import React from "react";
import Link from "next/link";
import { Lead } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface RecentLeadsProps {
  leads: Lead[];
}

const STATUS_LABEL: Record<string, string> = {
  new: "New", contacted: "Contacted", hot: "Hot", warm: "Warm",
  cold: "Cold", converted: "Converted", lost: "Lost",
};

export function RecentLeads({ leads }: RecentLeadsProps) {
  const recent = leads.slice(0, 6);

  return (
    <div className="bg-card border border-border rounded-xl">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Leads</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Latest {recent.length} leads added</p>
        </div>
        <Link href="/leads" className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="divide-y divide-border">
        {recent.map((lead) => (
          <div key={lead.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-primary">
                  {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                <p className="text-xs text-muted-foreground truncate">{lead.city} · {lead.propertyType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-3">
              <span className="text-xs font-semibold text-foreground hidden sm:block">{formatCurrency(lead.budget)}</span>
              <Badge variant={lead.status as any} className="text-xs">
                {STATUS_LABEL[lead.status]}
              </Badge>
              <span className="text-xs text-muted-foreground hidden md:block">{formatDate(lead.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
