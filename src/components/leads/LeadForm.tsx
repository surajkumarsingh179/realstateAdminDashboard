"use client";
import React, { useState, useEffect } from "react";
import { Lead, LeadStatus, LeadPriority, PropertyType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Lead, "id" | "createdAt">) => void;
  lead?: Lead | null;
  mode: "add" | "edit";
}

const EMPTY_FORM = {
  name: "", phone: "", email: "", budget: "", city: "",
  propertyType: "apartment" as PropertyType, priority: "medium" as LeadPriority,
  status: "new" as LeadStatus, followUpDate: "", source: "", notes: "", assignedTo: "",
};

export function LeadForm({ open, onClose, onSubmit, lead, mode }: LeadFormProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (lead && mode === "edit") {
      setForm({
        name: lead.name,
        phone: lead.phone,
        email: lead.email || "",
        budget: String(lead.budget),
        city: lead.city,
        propertyType: lead.propertyType,
        priority: lead.priority,
        status: lead.status,
        followUpDate: lead.followUpDate,
        source: lead.source || "",
        notes: lead.notes || "",
        assignedTo: lead.assignedTo || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [lead, mode, open]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.budget || isNaN(Number(form.budget)) || Number(form.budget) <= 0) e.budget = "Valid budget required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.followUpDate) e.followUpDate = "Follow-up date required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    onSubmit({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      budget: Number(form.budget),
      city: form.city.trim(),
      propertyType: form.propertyType,
      priority: form.priority,
      status: form.status,
      followUpDate: form.followUpDate,
      source: form.source.trim() || undefined,
      notes: form.notes.trim() || undefined,
      assignedTo: form.assignedTo.trim() || undefined,
    });
    setLoading(false);
    onClose();
  };

  const set = (key: string, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => { const n = { ...p }; delete n[key]; return n; });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Lead" : "Edit Lead"}</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "add" ? "Enter the lead details below to add them to your pipeline." : "Update the lead information below."}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
              <Input id="name" placeholder="e.g. Arjun Mehta" value={form.name} onChange={(e) => set("name", e.target.value)} />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
              <Input id="phone" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="budget">Budget (₹) <span className="text-red-500">*</span></Label>
              <Input id="budget" type="number" placeholder="e.g. 8500000" value={form.budget} onChange={(e) => set("budget", e.target.value)} />
              {errors.budget && <p className="text-xs text-red-500">{errors.budget}</p>}
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
              <Input id="city" placeholder="e.g. Mumbai" value={form.city} onChange={(e) => set("city", e.target.value)} />
              {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Property Type</Label>
              <Select value={form.propertyType} onValueChange={(v) => set("propertyType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["apartment", "villa", "plot", "commercial", "penthouse", "townhouse"].map((t) => (
                    <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Priority</Label>
              <Select value={form.priority} onValueChange={(v) => set("priority", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["new", "contacted", "hot", "warm", "cold", "converted", "lost"].map((s) => (
                    <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="followUpDate">Follow-up Date <span className="text-red-500">*</span></Label>
              <Input id="followUpDate" type="date" value={form.followUpDate} onChange={(e) => set("followUpDate", e.target.value)} />
              {errors.followUpDate && <p className="text-xs text-red-500">{errors.followUpDate}</p>}
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="source">Source</Label>
              <Input id="source" placeholder="e.g. Website, Referral" value={form.source} onChange={(e) => set("source", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Input id="assignedTo" placeholder="e.g. Priya Sharma" value={form.assignedTo} onChange={(e) => set("assignedTo", e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Any additional notes about this lead..." value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {mode === "add" ? "Add Lead" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
