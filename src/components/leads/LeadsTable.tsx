"use client";
import React, { useState } from "react";
import { Lead } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Edit2, Trash2, Phone, MapPin, Home, Calendar,
  ChevronUp, ChevronDown, ChevronsUpDown,
} from "lucide-react";
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
  AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

type SortKey = "name" | "budget" | "createdAt" | "followUpDate" | "priority";

const PRIORITY_ORDER = { high: 3, medium: 2, low: 1 };

export function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sorted = [...leads].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "name") cmp = a.name.localeCompare(b.name);
    else if (sortKey === "budget") cmp = a.budget - b.budget;
    else if (sortKey === "createdAt") cmp = a.createdAt.localeCompare(b.createdAt);
    else if (sortKey === "followUpDate") cmp = a.followUpDate.localeCompare(b.followUpDate);
    else if (sortKey === "priority") cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    return sortDir === "asc" ? cmp : -cmp;
  });

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ChevronsUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button onClick={() => handleSort(k)} className="flex items-center gap-1 hover:text-foreground transition-colors font-medium">
      {label} <SortIcon k={k} />
    </button>
  );

  if (leads.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
          <Home className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-semibold text-foreground">No leads found</p>
        <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs text-muted-foreground">
                <th className="text-left px-4 py-3"><SortBtn k="name" label="Lead" /></th>
                <th className="text-left px-4 py-3">Contact</th>
                <th className="text-left px-4 py-3"><SortBtn k="budget" label="Budget" /></th>
                <th className="text-left px-4 py-3">Property</th>
                <th className="text-left px-4 py-3"><SortBtn k="priority" label="Priority" /></th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3"><SortBtn k="followUpDate" label="Follow-up" /></th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-primary">
                          {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{lead.name}</p>
                        {lead.assignedTo && <p className="text-[10px] text-muted-foreground">{lead.assignedTo}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      <span>{lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">{formatCurrency(lead.budget)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{lead.city}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground capitalize">{lead.propertyType}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={lead.priority as any} className="capitalize">{lead.priority}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={lead.status as any} className="capitalize">{lead.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(lead.followUpDate)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onEdit(lead)}>
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-red-500 hover:bg-red-50" onClick={() => setDeleteId(lead.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-border bg-muted/10 text-xs text-muted-foreground">
          Showing {sorted.length} lead{sorted.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {sorted.map((lead) => (
          <div key={lead.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">
                    {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.phone}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onEdit(lead)}>
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-red-500 hover:bg-red-50" onClick={() => setDeleteId(lead.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-muted-foreground">Budget: </span><span className="font-semibold">{formatCurrency(lead.budget)}</span></div>
              <div><span className="text-muted-foreground">City: </span><span>{lead.city}</span></div>
              <div><span className="text-muted-foreground">Type: </span><span className="capitalize">{lead.propertyType}</span></div>
              <div><span className="text-muted-foreground">Follow-up: </span><span>{formatDate(lead.followUpDate)}</span></div>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge variant={lead.status as any} className="capitalize text-xs">{lead.status}</Badge>
              <Badge variant={lead.priority as any} className="capitalize text-xs">{lead.priority}</Badge>
            </div>
          </div>
        ))}
        <p className="text-xs text-center text-muted-foreground py-1">
          {sorted.length} lead{sorted.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this lead? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) { onDelete(deleteId); setDeleteId(null); } }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
