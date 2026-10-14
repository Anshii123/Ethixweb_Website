import type {
  ApiResponse,
  ContactFormData,
  Lead,
  LoginFormData,
  PaginationMeta,
  AdminStats,
  AdminUser,
} from '../types';

const API_BASE = '/api';

class ApiClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // Optional backup token from sessionStorage if browser cookie restrictions apply
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('ethix_admin_jwt') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          success: false,
          error: json?.error || `Request failed with status ${response.status}`,
          code: json?.code,
          details: json?.details,
        };
      }

      return json as ApiResponse<T>;
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Network error. Please check your internet connection.',
        code: 'NETWORK_ERROR',
      };
    }
  }

  // Submit contact enquiry
  async submitLead(data: ContactFormData): Promise<ApiResponse<{ id: string }>> {
    return this.request<{ id: string }>('/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Admin Login
  async loginAdmin(
    data: LoginFormData
  ): Promise<ApiResponse<{ admin: AdminUser; token?: string }>> {
    const res = await this.request<{ admin: AdminUser; token?: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data?.token) {
      sessionStorage.setItem('ethix_admin_jwt', res.data.token);
    }

    return res;
  }

  // Admin Logout
  async logoutAdmin(): Promise<ApiResponse<{ loggedOut: boolean }>> {
    sessionStorage.removeItem('ethix_admin_jwt');
    return this.request<{ loggedOut: boolean }>('/auth/logout', {
      method: 'POST',
    });
  }

  // Admin Session
  async getSession(): Promise<ApiResponse<{ authenticated: boolean; admin: AdminUser | null }>> {
    return this.request<{ authenticated: boolean; admin: AdminUser | null }>('/auth/session', {
      method: 'GET',
    });
  }

  // Admin Leads List
  async getLeads(params: {
    page?: number;
    limit?: number;
    status?: string;
    service?: string;
    search?: string;
  } = {}): Promise<ApiResponse<{ leads: Lead[]; pagination: PaginationMeta }>> {
    const query = new URLSearchParams();
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));
    if (params.status) query.set('status', params.status);
    if (params.service) query.set('service', params.service);
    if (params.search) query.set('search', params.search);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.request<{ leads: Lead[]; pagination: PaginationMeta }>(`/admin/leads${queryString}`, {
      method: 'GET',
    });
  }

  // Update Lead
  async updateLead(
    id: string,
    data: { status?: string; note?: string }
  ): Promise<ApiResponse<Lead>> {
    return this.request<Lead>(`/admin/leads?id=${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ id, ...data }),
    });
  }

  // Delete Lead
  async deleteLead(id: string): Promise<ApiResponse<{ id: string; deleted: boolean }>> {
    return this.request<{ id: string; deleted: boolean }>(`/admin/leads?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  }

  // Admin Stats
  async getStats(): Promise<ApiResponse<AdminStats>> {
    return this.request<AdminStats>('/admin/stats', {
      method: 'GET',
    });
  }
}

export const api = new ApiClient();
