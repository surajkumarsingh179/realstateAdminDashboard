export type LeadStatus = "new" | "contacted" | "hot" | "warm" | "cold" | "converted" | "lost";
export type LeadPriority = "high" | "medium" | "low";
export type PropertyType = "apartment" | "villa" | "plot" | "commercial" | "penthouse" | "townhouse";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  budget: number;
  city: string;
  propertyType: PropertyType;
  priority: LeadPriority;
  status: LeadStatus;
  followUpDate: string;
  source?: string;
  notes?: string;
  createdAt: string;
  assignedTo?: string;
}

export interface User {
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  hotLeads: number;
  convertedLeads: number;
  totalRevenue: number;
  conversionRate: number;
}

export interface WeeklyTrendData {
  day: string;
  leads: number;
  converted: number;
}

export interface StatusDistribution {
  status: string;
  count: number;
  color: string;
}
