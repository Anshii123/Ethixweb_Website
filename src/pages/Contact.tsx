import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Clock, ShieldCheck, CheckCircle2, AlertTriangle, Send, MapPin } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { TurnstileWidget } from '../components/ui/TurnstileWidget';
import { ContactFormSchema, type ContactFormData } from '../lib/validation';
import { api } from '../lib/api';
import { useToast } from '../context/ToastContext';
import { PageHero } from '../components/heroes/PageHero';
import { ContactIntakeVisual } from '../components/heroes/ContactIntakeVisual';

export const Contact: React.FC = () => {
  useEffect(() => {
    document.title = 'Start a Project | Ethixweb Digital Operations';
    window.scrollTo(0, 0);
  }, []);

  const toast = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'website-design',
    budget: '1.5L-3.5L',
    message: '',
    websiteUrl: '', // Honeypot field
    turnstileToken: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [rateLimitNotice, setRateLimitNotice] = useState<string | null>(null);

  const serviceOptions = [
    { value: 'website-design', label: 'Website Design & Development (Headless / React)' },
    { value: 'web-applications', label: 'Custom Web Applications & Portals' },
    { value: 'ai-automation', label: 'AI & Automation (Receptionists / Copilots / CSRs)' },
    { value: 'crm-integration', label: 'CRM & Workflow Integrations (HubSpot / WhatsApp / Zoho)' },
    { value: 'seo-growth', label: 'SEO, Google Ads (LSA) & Digital Marketing' },
    { value: 'maintenance-support', label: 'Maintenance & Dedicated Operations SLA' },
  ];

  const budgetOptions = [
    { value: 'under-1.5L', label: 'Foundational Sprint / Pilot Scope' },
    { value: '1.5L-3.5L', label: 'Core Redesign & Lead Acquisition Engine' },
    { value: '3.5L-8L', label: 'Full Web Application & Multi-Channel AI Systems' },
    { value: 'above-8L', label: 'Comprehensive Digital Operations & Enterprise SLA' },
    { value: 'not-sure', label: 'To be determined after technical scope review' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setServerError(null);
    setRateLimitNotice(null);
  };

  const handleTurnstileVerify = useCallback((token: string) => {
    setFormData((prev) => {
      if (prev.turnstileToken === token) return prev;
      return { ...prev, turnstileToken: token };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setRateLimitNotice(null);

    // 1. Client-Side Zod Validation
    const validationResult = ContactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error('Please resolve the errors highlighted below.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Submit to Serverless Vercel API with MongoDB Atlas persistence
      const response = await api.submitLead(formData);

      if (response.success && response.data?.id) {
        setSubmittedLeadId(response.data.id);
        toast.success(
          'Enquiry received!',
          'Your project details have been safely stored in MongoDB Atlas and routed to our senior engineers.'
        );
      } else {
        if (response.code === 'RATE_LIMITED') {
          setRateLimitNotice(response.error || 'Rate limit reached. Please wait before retrying.');
          toast.error('Submission rate limit exceeded', response.error);
        } else {
          setServerError(response.error || 'Failed to submit enquiry. Please try again.');
          toast.error(response.error || 'Submission failed');
        }
      }
    } catch (err: any) {
      setServerError('An unexpected network error occurred. Your inputs have been preserved.');
      toast.error('Network error. Inputs preserved.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForNewEnquiry = () => {
    setSubmittedLeadId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'website-design',
      budget: '1.5L-3.5L',
      message: '',
      websiteUrl: '',
      turnstileToken: '',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0D10] text-[#0F1012] dark:text-[#F4F4F6] transition-colors duration-200">
      {/* Header Hero with Interactive Upper-Right Project Intake Visual */}
      <PageHero
        badge="START A PROJECT · DIRECT ARCHITECTURAL CONSULTATION"
        badgeIcon={<Send className="w-3.5 h-3.5 text-ethix-red" />}
        title={
          <>
            Let's discuss your{' '}
            <span className="text-ethix-red">digital operations scope.</span>
          </>
        }
        description="Tell us about your product, website redesign, or business automation goals. Every inquiry is reviewed directly by an Ethixweb senior technical lead with a guaranteed 24-hour response SLA."
        metaInfo={
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct Senior Review</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Confidentiality & Non-Disclosure</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Dual-Time-Zone Overlap</span>
            </span>
          </div>
        }
        visual={<ContactIntakeVisual />}
      />

      {/* Main Content: Form & Operational Direct Contact */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Columns: Form Container */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-[#101114] rounded-3xl p-8 sm:p-10 border border-ethix-charcoal-200/80 dark:border-white/10 shadow-premium">
                {/* Success State */}
                {submittedLeadId ? (
                  <div className="py-8 text-center space-y-6 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6]">
                        Enquiry Persisted Successfully
                      </h2>
                      <p className="text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-ethix-charcoal-900 dark:text-white">{formData.name}</strong>. Your project enquiry has been stored in MongoDB Atlas and assigned reference ID:
                      </p>
                      <div className="inline-block px-3 py-1 rounded bg-ethix-ivory-100 dark:bg-white/10 border border-ethix-charcoal-200 dark:border-white/10 font-mono text-xs text-ethix-charcoal-800 dark:text-ethix-charcoal-200">
                        {submittedLeadId}
                      </div>
                    </div>

                    <div className="p-5 bg-[#FAF8F5] dark:bg-[#14161B] rounded-2xl border border-ethix-charcoal-200/70 dark:border-white/10 max-w-md mx-auto text-left text-xs space-y-2.5 text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
                      <div className="font-bold uppercase tracking-wider text-[#0F1012] dark:text-[#F4F4F6]">
                        What Happens Next:
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>A senior technical lead reviews your specifications.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>We will reach out to <strong>{formData.email}</strong> within 24 business hours.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>We will present an initial architecture roadmap and milestone schedule.</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="outline" onClick={handleResetForNewEnquiry}>
                        Submit Another Enquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Enquiry Form */
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* Server Error Alert */}
                    {serverError && (
                      <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <strong>Error:</strong> {serverError}
                        </div>
                      </div>
                    )}

                    {/* Rate Limit Alert */}
                    {rateLimitNotice && (
                      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2.5">
                        <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <strong>Rate Limit Triggered:</strong> {rateLimitNotice}
                        </div>
                      </div>
                    )}

                    {/* Honeypot field (hidden from genuine users via display:none and aria-hidden) */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <label htmlFor="websiteUrl">Do not fill this field</label>
                      <input
                        type="text"
                        id="websiteUrl"
                        name="websiteUrl"
                        value={formData.websiteUrl || ''}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Row 1: Full Name & Business Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Full Name"
                        name="name"
                        required
                        placeholder="e.g. Michael Vance"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                      />

                      <Input
                        label="Work Email"
                        name="email"
                        type="email"
                        required
                        placeholder="michael@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                    </div>

                    {/* Row 2: Phone & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="+1 (206) 555-0192 or +91 98765 43210"
                        helperText="Supports US, Indian (+91), and international numbers"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        error={errors.phone}
                      />

                      <Input
                        label="Company or Organization"
                        name="company"
                        placeholder="e.g. Apex Mechanical Services"
                        value={formData.company || ''}
                        onChange={handleChange}
                        error={errors.company}
                      />
                    </div>

                    {/* Row 3: Service Selection */}
                    <Select
                      label="Primary Service of Interest"
                      name="service"
                      required
                      options={serviceOptions}
                      value={formData.service}
                      onChange={handleChange}
                      error={errors.service}
                    />

                    {/* Row 4: Scope Tier */}
                    <Select
                      label="Estimated Project Scope Tier"
                      name="budget"
                      options={budgetOptions}
                      value={formData.budget || '1.5L-3.5L'}
                      onChange={handleChange}
                      helperText="Helps us assign the right architectural specialists and sprint timeline"
                      error={errors.budget}
                    />

                    {/* Row 5: Project Details */}
                    <Textarea
                      label="Project Message & Specifications"
                      name="message"
                      required
                      rows={5}
                      showCount
                      maxLength={3000}
                      placeholder="Describe your current tech stack, operational bottlenecks, timeline requirements, and goals..."
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                    />

                    {/* Cloudflare Turnstile Widget */}
                    <TurnstileWidget onVerify={handleTurnstileVerify} />

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full text-base"
                        isLoading={isSubmitting}
                        rightIcon={<Send className="w-4 h-4" />}
                      >
                        Submit Project Enquiry
                      </Button>
                      <p className="text-center text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400 mt-2.5">
                        Strict confidentiality guaranteed. Your information is encrypted and never shared.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Operating Context & Direct Desk */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Reach Box */}
              <div className="p-8 rounded-3xl bg-[#0F1012] dark:bg-[#14161B] text-white border border-ethix-charcoal-800 dark:border-white/10 shadow-elevated space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-ethix-red font-bold">
                    Direct Coordination Desk
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Need Direct Engineering Access?
                  </h3>
                  <p className="text-xs text-ethix-charcoal-300 leading-relaxed">
                    For high-priority scopes, urgent production issues, or NDA requests, reach our technical desk directly.
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-ethix-charcoal-800 dark:border-white/10 text-sm">
                  <a
                    href="mailto:info@ethixweb.com"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-ethix-red/20 text-ethix-red">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-ethix-charcoal-400">Direct Email</div>
                      <div className="font-semibold text-white">info@ethixweb.com</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5">
                    <div className="p-2 rounded-lg bg-ethix-brass/20 text-ethix-brass">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-ethix-charcoal-400">Operating Windows</div>
                      <div className="font-semibold text-white">US (PST/EST) & India (IST) Active Coverage</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-ethix-charcoal-400">Headquarters</div>
                      <div className="font-semibold text-white">Kent, WA 98031, United States</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Real-Time Database Persistence</span>
                  </div>
                  <p className="text-[11px] text-ethix-charcoal-400 leading-relaxed">
                    Submissions are validated with server-side Zod and persisted in MongoDB Atlas with atomic rate-limiting protection.
                  </p>
                </div>
              </div>

              {/* What Happens Next Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle space-y-3">
                <h4 className="text-sm font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                  What to expect after submitting:
                </h4>
                <ol className="space-y-2 text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-300 list-decimal list-inside leading-relaxed">
                  <li>
                    <strong className="text-ethix-charcoal-900 dark:text-white">Technical Review:</strong> We evaluate your existing stack, bottlenecks, and timeline.
                  </li>
                  <li>
                    <strong className="text-ethix-charcoal-900 dark:text-white">Architecture Consultation:</strong> A structured 30-minute call directly with a senior engineer.
                  </li>
                  <li>
                    <strong className="text-ethix-charcoal-900 dark:text-white">Transparent Proposal:</strong> A fixed milestone scope breakdown with zero hidden fees.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
