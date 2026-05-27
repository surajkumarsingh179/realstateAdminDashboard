"use client";
import React, { useState, useMemo } from "react";
import { Plus, Search, Filter, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useMobileMenuOpen } from "@/components/layout/AppShell";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { LeadForm } from "@/components/leads/LeadForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLeads } from "@/hooks/useLeads";
import { Lead, LeadStatus } from "@/types";


const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "hot", label: "Hot" },
  { value: "warm", label: "Warm" },
  { value: "cold", label: "Cold" },
  { value: "converted", label: "Converted" },
  { value: "lost", label: "Lost" },
];

const PRIORITY_OPTIONS = [
  { value: "all", label: "All Priority" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function LeadsPage() {
  const onMobileMenuOpen = useMobileMenuOpen();
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.city.toLowerCase().includes(q) ||
        (lead.email?.toLowerCase().includes(q) ?? false);
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [leads, search, statusFilter, priorityFilter]);

  const hasActiveFilters = statusFilter !== "all" || priorityFilter !== "all" || search;

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const openAdd = () => {
    setEditingLead(null);
    setFormMode("add");
    setFormOpen(true);
  };

  const openEdit = (lead: Lead) => {
    setEditingLead(lead);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleSubmit = (data: Omit<Lead, "id" | "createdAt">) => {
    if (formMode === "edit" && editingLead) {
      updateLead(editingLead.id, data);
    } else {
      addLead(data);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Leads"
        subtitle={`${leads.length} total leads in your pipeline`}
        onMobileMenuOpen={onMobileMenuOpen || (() => {})}
        actions={
          <Button size="sm" onClick={openAdd} className="gap-1.5">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Lead</span>
          </Button>
        }
      />

      <div className="flex-1 p-4 md:p-6 space-y-4">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-36 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="h-9 w-36 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRIORITY_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 gap-1 text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
          </div>
        </div>

        {/* Results summary */}
        {hasActiveFilters && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Showing {filtered.length} of {leads.length} leads
          </p>
        )}

        {/* Table */}
        <LeadsTable leads={filtered} onEdit={openEdit} onDelete={deleteLead} />
      </div>

      <LeadForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        lead={editingLead}
        mode={formMode}
      />
    </div>
  );
}
