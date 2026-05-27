"use client";
import { useState, useCallback } from "react";
import { Lead } from "@/types";
import { DUMMY_LEADS } from "@/data/leads";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(DUMMY_LEADS);

  const addLead = useCallback((lead: Omit<Lead, "id" | "createdAt">) => {
    const newLead: Lead = {
      ...lead,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  }, []);

  const updateLead = useCallback((id: string, updates: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { leads, addLead, updateLead, deleteLead };
}
