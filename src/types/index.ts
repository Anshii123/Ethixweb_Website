export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export type ServiceType =
  | 'website-design'
  | 'web-applications'
  | 'ai-automation'
  | 'crm-integration'
  | 'seo-growth'
  | 'maintenance-support';

export type BudgetType =
  | 'under-1.5L'
  | '1.5L-3.5L'
  | '3.5L-8L'
  | 'above-8L'
  | 'not-sure';

export interface LeadNote {
  _id?: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: ServiceType;
  budget?: BudgetType;
  message: string;
  status: LeadStatus;
  notes?: LeadNote[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  lastLogin?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  closedLeads: number;
  last7DaysLeads: number;
  serviceCounts: Record<string, number>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  message?: string;
  details?: any;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: ServiceType;
  budget?: BudgetType | string;
  message: string;
  websiteUrl?: string;
  turnstileToken?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
