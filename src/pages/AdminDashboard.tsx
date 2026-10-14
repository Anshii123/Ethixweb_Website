import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  RefreshCw,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Phone,
  Mail,
  Building,
  Calendar,
  AlertCircle,
  FileText,
  Send,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { api } from '../lib/api';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import type { Lead, AdminStats, LeadStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const { admin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const toast = useToast();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  // Modals
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    document.title = 'Lead Management Console | Ethixweb Admin';
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.getStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err: any) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.getLeads({
        page,
        limit: 10,
        status: statusFilter,
        service: serviceFilter,
        search,
      });

      if (res.success && res.data) {
        setLeads(res.data.leads);
        setTotalPages(res.data.pagination.totalPages);
        setTotalLeads(res.data.pagination.total);
      } else {
        setError(res.error || 'Failed to fetch leads from database.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error fetching leads.');
    } finally {
      setIsLoading(false);
    }
  }, [page, statusFilter, serviceFilter, search]);

  useEffect(() => {
    fetchStats();
    fetchLeads();
  }, [fetchStats, fetchLeads]);

  const handleLogout = async () => {
    await logout();
    toast.info('Logged out', 'You have been safely signed out.');
    navigate('/admin/login');
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await api.updateLead(leadId, { status: newStatus });
      if (res.success && res.data) {
        toast.success(`Status updated to ${newStatus}`);
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
        fetchStats();
      } else {
        toast.error('Failed to update lead status', res.error);
      }
    } catch (err: any) {
      toast.error('Update error', err.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;

    try {
      const res = await api.updateLead(selectedLead._id, { note: newNoteText.trim() });
      if (res.success && res.data) {
        toast.success('Note attached to lead history');
        setSelectedLead(res.data);
        setLeads((prev) => prev.map((l) => (l._id === res.data!._id ? res.data! : l)));
        setNewNoteText('');
      } else {
        toast.error('Failed to add note', res.error);
      }
    } catch (err: any) {
      toast.error('Note creation error', err.message);
    }
  };

  const confirmDelete = async () => {
    if (!leadToDelete) return;

    try {
      const res = await api.deleteLead(leadToDelete._id);
      if (res.success) {
        toast.success('Lead removed from database');
        setLeads((prev) => prev.filter((l) => l._id !== leadToDelete._id));
        setIsDeleteModalOpen(false);
        setLeadToDelete(null);
        fetchStats();
        if (selectedLead?._id === leadToDelete._id) {
          setIsDetailModalOpen(false);
          setSelectedLead(null);
        }
      } else {
        toast.error('Failed to delete lead', res.error);
      }
    } catch (err: any) {
      toast.error('Deletion error', err.message);
    }
  };

  const formatService = (service: string) => {
    const map: Record<string, string> = {
      'website-design': 'Website Design',
      'web-applications': 'Web Applications',
      'ai-automation': 'AI & Automation',
      'crm-integration': 'CRM Integrations',
      'seo-growth': 'SEO & Growth',
      'maintenance-support': 'Maintenance SLA',
    };
    return map[service] || service;
  };

  const formatBudget = (budget?: string) => {
    if (!budget) return 'Unspecified';
    const map: Record<string, string> = {
      'under-1.5L': 'Foundational Sprint / Pilot Scope',
      '1.5L-3.5L': 'Core Redesign & Lead Engine',
      '3.5L-8L': 'Full Web App & AI Systems',
      'above-8L': 'Comprehensive Operations SLA',
      'not-sure': 'Flexible / TBD',
    };
    return map[budget] || budget;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0D10] text-[#0F1012] dark:text-[#F4F4F6] pb-20 transition-colors duration-200">
      {/* Top Admin Header Bar */}
      <header className="bg-[#0A0B0D] text-white border-b border-white/10 sticky top-0 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/ethixweb-emblem.webp"
                alt="Ethixweb Emblem"
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
              />
              <div>
                <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Ethixweb Lead Management Console</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Live Atlas
                  </span>
                </h1>
                <p className="text-xs text-ethix-charcoal-400">
                  Signed in as <strong className="text-white">{admin?.name || admin?.email}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg text-ethix-charcoal-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ethix-red"
                aria-label={`Switch to ${theme === 'dark' ? 'day' : 'night'} mode`}
                title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} Mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-ethix-charcoal-300" />
                )}
              </button>

              <Button
                variant="outline"
                size="sm"
                className="text-white border-ethix-charcoal-700 hover:bg-ethix-charcoal-800 hover:text-white"
                onClick={() => {
                  fetchStats();
                  fetchLeads();
                  toast.info('Data refreshed from MongoDB');
                }}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Sync
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={handleLogout}
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#14161C] border border-ethix-charcoal-200 dark:border-[#262A33] shadow-subtle space-y-1">
            <span className="text-xs font-semibold text-ethix-charcoal-500 dark:text-ethix-charcoal-400 uppercase tracking-wider">
              Total Enquiries
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-ethix-charcoal-900 dark:text-white font-mono">
              {stats?.totalLeads ?? '—'}
            </div>
            <span className="text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block">
              {stats?.last7DaysLeads ?? 0} in last 7 days
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#14161C] border border-ethix-charcoal-200 dark:border-[#262A33] shadow-subtle space-y-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              New Leads
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-300 font-mono">
              {stats?.newLeads ?? '—'}
            </div>
            <span className="text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block">Needs review</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#14161C] border border-ethix-charcoal-200 dark:border-[#262A33] shadow-subtle space-y-1">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Contacted
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 dark:text-amber-300 font-mono">
              {stats?.contactedLeads ?? '—'}
            </div>
            <span className="text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block">Outreach started</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#14161C] border border-ethix-charcoal-200 dark:border-[#262A33] shadow-subtle space-y-1">
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Qualified
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 dark:text-purple-300 font-mono">
              {stats?.qualifiedLeads ?? '—'}
            </div>
            <span className="text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block">Proposal stage</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#14161C] border border-ethix-charcoal-200 dark:border-[#262A33] shadow-subtle space-y-1 col-span-2 sm:col-span-1">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Closed / Won
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
              {stats?.closedLeads ?? '—'}
            </div>
            <span className="text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block">Production contracts</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#14161C] border border-ethix-charcoal-200 dark:border-[#262A33] shadow-subtle space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search by client name, email, company, or phone..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                leftElement={<Search className="w-4 h-4 text-ethix-charcoal-400" />}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-40">
                <Select
                  options={[
                    { value: 'all', label: 'All Statuses' },
                    { value: 'new', label: 'New' },
                    { value: 'contacted', label: 'Contacted' },
                    { value: 'qualified', label: 'Qualified' },
                    { value: 'closed', label: 'Closed / Won' },
                  ]}
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              <div className="w-44">
                <Select
                  options={[
                    { value: 'all', label: 'All Services' },
                    { value: 'website-design', label: 'Website Design' },
                    { value: 'web-applications', label: 'Web Applications' },
                    { value: 'ai-automation', label: 'AI & Automation' },
                    { value: 'crm-integration', label: 'CRM Integrations' },
                    { value: 'seo-growth', label: 'SEO & Growth' },
                    { value: 'maintenance-support', label: 'Maintenance' },
                  ]}
                  value={serviceFilter}
                  onChange={(e) => {
                    setServiceFilter(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Leads Table Container */}
        <div className="bg-white dark:bg-[#14161C] rounded-3xl border border-ethix-charcoal-200/80 dark:border-[#262A33] shadow-premium overflow-hidden">
          {isLoading ? (
            <div className="py-24 text-center space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-ethix-red mx-auto" />
              <p className="text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400 font-medium">
                Querying MongoDB Atlas database...
              </p>
            </div>
          ) : leads.length === 0 ? (
            /* Empty State */
            <div className="py-20 px-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-ethix-ivory-200 dark:bg-[#1C1F26] text-ethix-charcoal-500 dark:text-ethix-charcoal-400 flex items-center justify-center mx-auto">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-ethix-charcoal-900 dark:text-white">
                No Leads Found
              </h3>
              <p className="text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400 max-w-sm mx-auto leading-relaxed">
                {search || statusFilter !== 'all' || serviceFilter !== 'all'
                  ? 'No enquiries match the current filters. Try resetting search criteria.'
                  : 'No enquiries have been submitted yet. Navigate to the Contact page to submit a test project enquiry.'}
              </p>
              <div className="pt-2 flex justify-center gap-3">
                {(search || statusFilter !== 'all' || serviceFilter !== 'all') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearch('');
                      setStatusFilter('all');
                      setServiceFilter('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                )}
                <a
                  href="/contact"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ethix-red text-white text-xs font-bold shadow-subtle hover:bg-ethix-red-hover transition-colors"
                >
                  <span>Open Contact Form</span>
                </a>
              </div>
            </div>
          ) : (
            /* Responsive Data Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-ethix-ivory-50 dark:bg-[#181A22] border-b border-ethix-charcoal-200 dark:border-[#262A33] text-[11px] font-bold uppercase tracking-wider text-ethix-charcoal-600 dark:text-ethix-charcoal-300">
                    <th className="py-3.5 px-4 sm:px-6">Client / Contact</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Budget (INR)</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ethix-charcoal-100 dark:divide-[#262A33] text-xs">
                  {leads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="hover:bg-ethix-ivory-50/80 dark:hover:bg-[#181A22]/70 transition-colors group cursor-pointer"
                      onClick={() => {
                        setSelectedLead(lead);
                        setIsDetailModalOpen(true);
                      }}
                    >
                      {/* Name & Email */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-ethix-charcoal-900 dark:text-white text-sm">
                          {lead.name}
                        </div>
                        <div className="text-ethix-charcoal-500 dark:text-ethix-charcoal-400 font-mono text-[11px]">
                          {lead.email}
                        </div>
                        {lead.company && (
                          <div className="text-ethix-charcoal-400 dark:text-ethix-charcoal-400 text-[11px] mt-0.5">
                            {lead.company}
                          </div>
                        )}
                      </td>

                      {/* Service */}
                      <td className="py-4 px-4">
                        <span className="font-medium text-ethix-charcoal-800 dark:text-ethix-charcoal-200">
                          {formatService(lead.service)}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="py-4 px-4">
                        <span className="font-mono text-ethix-charcoal-700 dark:text-ethix-charcoal-300 font-semibold">
                          {formatBudget(lead.budget)}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        <Badge status={lead.status} />
                      </td>

                      {/* Created Date */}
                      <td className="py-4 px-4 text-ethix-charcoal-500 dark:text-ethix-charcoal-400 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Actions */}
                      <td
                        className="py-4 px-4 sm:px-6 text-right space-x-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsDetailModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-ethix-charcoal-500 dark:text-ethix-charcoal-400 hover:text-ethix-charcoal-900 dark:hover:text-white hover:bg-ethix-ivory-200 dark:hover:bg-[#20232A] transition-colors"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setLeadToDelete(lead);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-ethix-charcoal-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Bar */}
          {!isLoading && leads.length > 0 && (
            <div className="py-4 px-6 bg-ethix-ivory-50 dark:bg-[#181A22] border-t border-ethix-charcoal-200 dark:border-[#262A33] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-300">
              <div>
                Showing <strong className="text-ethix-charcoal-900 dark:text-white">{leads.length}</strong> of{' '}
                <strong className="text-ethix-charcoal-900 dark:text-white">{totalLeads}</strong> total enquiries
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
                >
                  Previous
                </Button>
                <span className="font-mono text-xs px-2">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lead Detail & Status Update Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedLead(null);
        }}
        title={`Lead Details: ${selectedLead?.name || ''}`}
        maxWidth="lg"
      >
        {selectedLead && (
          <div className="space-y-6">
            {/* Top Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-ethix-ivory-50 dark:bg-[#181A22] border border-ethix-charcoal-200/70 dark:border-[#262A33] text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-ethix-charcoal-400" />
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="font-mono text-ethix-red dark:text-red-400 hover:underline font-medium"
                  >
                    {selectedLead.email}
                  </a>
                </div>

                {selectedLead.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-ethix-charcoal-400" />
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="font-mono text-ethix-charcoal-800 dark:text-ethix-charcoal-200 hover:underline"
                    >
                      {selectedLead.phone}
                    </a>
                  </div>
                )}

                {selectedLead.company && (
                  <div className="flex items-center gap-2 text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
                    <Building className="w-4 h-4 text-ethix-charcoal-400" />
                    <span>{selectedLead.company}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block">Service:</span>
                  <strong className="text-ethix-charcoal-900 dark:text-white">
                    {formatService(selectedLead.service)}
                  </strong>
                </div>

                <div>
                  <span className="text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block">Budget:</span>
                  <span className="font-mono font-bold text-ethix-charcoal-900 dark:text-white">
                    {formatBudget(selectedLead.budget)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-ethix-charcoal-500 dark:text-ethix-charcoal-400 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Received: {new Date(selectedLead.createdAt).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Change Selector */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#181A22] border border-ethix-charcoal-200/70 dark:border-[#262A33] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ethix-charcoal-700 dark:text-ethix-charcoal-200 block mb-0.5">
                  Pipeline Status
                </span>
                <span className="text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                  Update status directly in MongoDB
                </span>
              </div>

              <div className="flex items-center gap-2">
                {(['new', 'contacted', 'qualified', 'closed'] as LeadStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusChange(selectedLead._id, st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      selectedLead.status === st
                        ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-950 shadow-sm'
                        : 'bg-ethix-ivory-200 dark:bg-[#20232A] text-ethix-charcoal-700 dark:text-ethix-charcoal-300 hover:bg-ethix-ivory-300 dark:hover:bg-[#292D37]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Message */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
                Project Message & Enquiry Scope:
              </span>
              <div className="p-4 rounded-xl bg-ethix-ivory-50 dark:bg-[#181A22] border border-ethix-charcoal-200/60 dark:border-[#262A33] text-xs sm:text-sm text-ethix-charcoal-800 dark:text-ethix-charcoal-200 leading-relaxed whitespace-pre-wrap">
                {selectedLead.message}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-3 pt-4 border-t border-ethix-charcoal-100 dark:border-[#262A33]">
              <span className="text-xs font-bold uppercase tracking-wider text-ethix-charcoal-700 dark:text-ethix-charcoal-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-ethix-brass" />
                <span>Internal Audit & Activity Notes</span>
              </span>

              {selectedLead.notes && selectedLead.notes.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedLead.notes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white dark:bg-[#14161C] border border-ethix-charcoal-200 dark:border-[#262A33] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] text-ethix-charcoal-400">
                        <strong className="text-ethix-charcoal-700 dark:text-ethix-charcoal-200">{note.author}</strong>
                        <span>{new Date(note.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                      <p className="text-ethix-charcoal-700 dark:text-ethix-charcoal-300">{note.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-ethix-charcoal-400 italic">No notes recorded yet.</p>
              )}

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add internal note or call follow-up..."
                  className="flex-1 text-xs bg-white dark:bg-[#14161C] text-ethix-charcoal-900 dark:text-white placeholder:text-ethix-charcoal-400 dark:placeholder:text-ethix-charcoal-500 border border-ethix-charcoal-300 dark:border-[#262A33] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ethix-charcoal-900 dark:focus:ring-white"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                />
                <Button type="submit" variant="secondary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Save Note
                </Button>
              </form>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Modal for Lead Deletion */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setLeadToDelete(null);
        }}
        title="Confirm Lead Deletion"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
            Are you sure you want to permanently delete the lead enquiry from{' '}
            <strong className="text-ethix-charcoal-900 dark:text-white">{leadToDelete?.name}</strong> (
            {leadToDelete?.email})?
          </p>
          <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-lg border border-red-200 dark:border-red-900/50">
            This action cannot be undone and will delete the record from MongoDB Atlas.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setLeadToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
