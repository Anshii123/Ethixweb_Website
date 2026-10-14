import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Bot,
  TrendingUp,
  BarChart3,
  Eye,
  Headphones,
  ArrowUpRight,
  CheckCircle2,
  Pause,
  Play,
  X,
  Sparkles,
  Layers,
} from 'lucide-react';

export interface ServiceItem {
  name: string;
  desc: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  tagline: string;
  description: string;
  techStack: string[];
  services: ServiceItem[];
}

export const ServicesOverview: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isManualPaused, setIsManualPaused] = useState<boolean>(false);
  const speed = 55; // 55s smooth marquee velocity
  const [selectedDiscipline, setSelectedDiscipline] = useState<ServiceCategory | null>(null);

  const categories: ServiceCategory[] = [
    {
      id: 'website',
      name: 'Website & Architecture',
      icon: <Globe className="w-4 h-4 text-ethix-red" />,
      accentColor: 'text-ethix-red',
      accentBg: 'bg-ethix-red/10',
      accentBorder: 'border-ethix-red/30',
      tagline: 'High-performance digital flagships built on modern tech stacks.',
      description:
        'We design and engineer bespoke web presences engineered for maximum Core Web Vitals, conversion architecture, responsive ergonomics, and complete technical SEO foundations.',
      techStack: ['React', 'Vite', 'Next.js', 'TailwindCSS', 'TypeScript', 'Node.js'],
      services: [
        { name: 'Website Redesign', desc: 'Modernizing legacy web presences into responsive, brand-aligned conversion engines.' },
        { name: 'Headless Architecture', desc: 'Decoupled frontends on Vite/React/Next.js backed by headless CMS infrastructure.' },
        { name: 'Landing Pages', desc: 'High-intent single-objective landing experiences with conversion rate tracking.' },
        { name: 'Web Applications', desc: 'Client portals, internal tooling, interactive quoting flows, and operational SaaS MVPs.' },
      ],
    },
    {
      id: 'ai',
      name: 'AI & Automation',
      icon: <Bot className="w-4 h-4 text-ethix-brass" />,
      accentColor: 'text-ethix-brass',
      accentBg: 'bg-ethix-brass/10',
      accentBorder: 'border-ethix-brass/30',
      tagline: 'Intelligent booking agents, CSRs, and automated business workflows.',
      description:
        'Free your team from repetitive inquiries. We deploy custom AI agents that converse naturally with customers, qualify leads, schedule appointments, and update your records 24/7.',
      techStack: ['OpenAI / Claude', 'LangChain', 'Vector DBs', 'Whisper Voice', 'Webhook Automations'],
      services: [
        { name: 'AI Receptionists / CSRs', desc: 'Conversational voice and chat agents that handle inquiries and schedule appointments.' },
        { name: 'Knowledge Base Chatbots', desc: 'Trained on your private documentation, SOPs, and product catalogs.' },
        { name: 'Autonomous LLM Workflows', desc: 'Automating multi-step operational tasks, email drafting, and CRM routing.' },
        { name: 'Human Handoff Protocols', desc: 'Seamless escalation to live team members when complex human attention is needed.' },
      ],
    },
    {
      id: 'growth',
      name: 'Growth & Acquisition',
      icon: <TrendingUp className="w-4 h-4 text-emerald-500" />,
      accentColor: 'text-emerald-500',
      accentBg: 'bg-emerald-500/10',
      accentBorder: 'border-emerald-500/30',
      tagline: 'Structured digital marketing and multi-channel customer pipelines.',
      description:
        'Disciplined customer acquisition engineered for measurable ROI. From technical search rankings and localized ad campaigns to automated CRM pipelines.',
      techStack: ['Google Ads & LSA', 'Meta Ads Manager', 'Schema.org', 'HubSpot', 'GoHighLevel'],
      services: [
        { name: 'Technical & Local SEO', desc: 'Audits, schema markup, regional citations, and programmatic search architecture.' },
        { name: 'Google Ads & LSA', desc: 'Precision intent targeting and Google verified badges for qualified inbound calls.' },
        { name: 'Meta Ads & Retargeting', desc: 'High-converting video and carousel campaigns that build predictable customer pipelines.' },
        { name: 'Social Media & Reels', desc: 'Brand-building organic video content designed for sustained audience engagement.' },
        { name: 'Email Marketing & Drips', desc: 'Lifecycle sequences, re-engagement funnels, and automated follow-ups.' },
        { name: 'CRM & Pipeline Integrations', desc: 'Connecting HubSpot, GoHighLevel, Zoho, WhatsApp, and booking calendars.' },
      ],
    },
    {
      id: 'data',
      name: 'Data & Dashboards',
      icon: <BarChart3 className="w-4 h-4 text-blue-500" />,
      accentColor: 'text-blue-500',
      accentBg: 'bg-blue-500/10',
      accentBorder: 'border-blue-500/30',
      tagline: 'Real-time telemetry, clear attribution, and actionable operational metrics.',
      description:
        'Eliminate blind spots in your business. We build live unified analytics dashboards that tie traffic, ad spend, and conversion outcomes directly to revenue.',
      techStack: ['Looker Studio', 'GA4 / BigQuery', 'PostHog', 'Mixpanel', 'Custom Telemetry'],
      services: [
        { name: 'Custom Operational Dashboards', desc: 'Unified real-time views combining website, marketing, and sales pipeline metrics.' },
        { name: 'Conversion & Funnel Analytics', desc: 'Granular tracking of user drop-offs, button clicks, and transaction funnels.' },
        { name: 'Monthly Executive Reporting', desc: 'Actionable executive summaries delivered with transparent insights and next steps.' },
      ],
    },
    {
      id: 'accessibility',
      name: 'Accessibility (WCAG AA)',
      icon: <Eye className="w-4 h-4 text-purple-500" />,
      accentColor: 'text-purple-500',
      accentBg: 'bg-purple-500/10',
      accentBorder: 'border-purple-500/30',
      tagline: 'Ensuring your web presence is inclusive, compliant, and universally usable.',
      description:
        'Protect your business against legal liability while expanding your audience reach. We design, audit, and remediate digital experiences to meet strict WCAG 2.1 AA standards.',
      techStack: ['Axe Core', 'WAVE Evaluation', 'Screen Reader Testing', 'ARIA Semantics'],
      services: [
        { name: 'Accessibility Remediation', desc: 'Code-level fixes for contrast, screen-reader semantics, and keyboard navigation.' },
        { name: 'Accessibility Testing & Audits', desc: 'Rigorous automated and manual evaluations against WCAG AA compliance benchmarks.' },
      ],
    },
    {
      id: 'support',
      name: 'Maintenance & Support',
      icon: <Headphones className="w-4 h-4 text-amber-500" />,
      accentColor: 'text-amber-500',
      accentBg: 'bg-amber-500/10',
      accentBorder: 'border-amber-500/30',
      tagline: 'Guaranteed uptime, continuous security patching, and proactive tech operations.',
      description:
        'Software requires ongoing care to remain secure and competitive. Our senior engineers handle code updates, API monitoring, and bug fixes so your business never stalls.',
      techStack: ['Uptime Kuma', 'Sentry Error Tracking', 'Docker', 'Automated Backups', 'Vercel / AWS'],
      services: [
        { name: 'Technical Support & SLA', desc: 'Dedicated engineering hours and guaranteed response times for critical issues.' },
        { name: 'AI & Content Updates', desc: 'Routine fine-tuning of AI prompts, knowledge vectors, and site copy.' },
        { name: 'API & Dependency Maintenance', desc: 'Continuous updates for external API changes, security patches, and cloud dependencies.' },
      ],
    },
  ];

  // Duplicated set for seamless, glitch-free infinite marquee loop
  const loopSlides = [...categories, ...categories];

  const isPaused = isHovered || isManualPaused;

  return (
    <section
      id="services"
      className="py-24 bg-white dark:bg-[#101114] border-b border-ethix-charcoal-200/70 dark:border-white/10 transition-colors duration-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-ethix-charcoal-100 dark:border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethix-red/10 border border-ethix-red/20 text-xs font-mono font-semibold text-ethix-red">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ethix-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ethix-red"></span>
              </span>
              <span>CONTINUOUS SERVICE ECOSYSTEM • LIVE SLIDER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight leading-tight">
              22 digital operations capabilities. Six core disciplines.
            </h2>
            <p className="text-base text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
              Gliding continuously across all technical competencies. Hover over any discipline to pause, inspect deliverables, or view detailed specifications.
            </p>
          </div>

          {/* Quick Action & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsManualPaused(!isManualPaused)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 bg-ethix-ivory-100 dark:bg-white/10 hover:bg-ethix-ivory-200 dark:hover:bg-white/15 text-ethix-charcoal-800 dark:text-white border border-ethix-charcoal-200/80 dark:border-white/10"
              title={isManualPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isManualPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                  <span>Resume Slider</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pause Motion</span>
                </>
              )}
            </button>


            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-ethix-charcoal-900 dark:bg-white dark:text-ethix-charcoal-900 px-4 py-2 rounded-xl hover:bg-ethix-red dark:hover:bg-ethix-red dark:hover:text-white transition-all group"
            >
              <span>Full 22-Service Catalog</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Quick Filter Pill Buttons (Click to open full discipline modal) */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400 mr-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Jump to:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedDiscipline(cat)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-ethix-ivory-50 dark:bg-white/5 hover:bg-ethix-ivory-100 dark:hover:bg-white/10 text-ethix-charcoal-700 dark:text-ethix-charcoal-300 border border-ethix-charcoal-200/70 dark:border-white/10 transition-all hover:border-ethix-red/40 hover:text-ethix-red"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CONTINUOUS INFINITE MOVING SLIDER TRACK */}
      <div
        className="relative w-full py-4 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left & Right Edge Gradient Fades for Premium Agency Vignette */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 md:w-40 bg-gradient-to-r from-white dark:from-[#101114] via-white/80 dark:via-[#101114]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 md:w-40 bg-gradient-to-l from-white dark:from-[#101114] via-white/80 dark:via-[#101114]/80 to-transparent z-20 pointer-events-none" />

        {/* Continuous Marquee Track */}
        <div
          className="flex items-stretch gap-6 will-change-transform"
          style={{
            width: 'max-content',
            animation: `marquee ${speed}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {loopSlides.map((cat, idx) => (
            <div
              key={`${cat.id}-${idx}`}
              className="w-[440px] sm:w-[540px] lg:w-[600px] shrink-0 p-7 sm:p-9 rounded-3xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-premium hover:shadow-elevated transition-all duration-300 hover:border-ethix-charcoal-400 dark:hover:border-white/30 flex flex-col justify-between group"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold border ${cat.accentBg} ${cat.accentColor} ${cat.accentBorder}`}
                  >
                    {cat.icon}
                    <span>{cat.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                </div>

                {/* Tagline & Description */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] leading-snug mb-3 group-hover:text-ethix-red dark:group-hover:text-ethix-red transition-colors">
                  {cat.tagline}
                </h3>
                <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Deliverables Grid for this Discipline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {cat.services.slice(0, 4).map((svc, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/70 dark:border-white/10 transition-colors hover:border-ethix-red/40"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <h4 className="font-bold text-xs text-[#0F1012] dark:text-[#F4F4F6] truncate">
                          {svc.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-ethix-charcoal-600 dark:text-ethix-charcoal-400 line-clamp-2 leading-relaxed">
                        {svc.desc}
                      </p>
                      <div className="pt-2 text-[10px] font-semibold text-ethix-red">
                        Ready for Deployment →
                      </div>
                    </div>
                  ))}
                </div>

                {/* If the category has more than 4 services (like Growth) */}
                {cat.services.length > 4 && (
                  <div className="mb-6 -mt-1 text-center">
                    <span className="text-[11px] font-semibold text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                      + {cat.services.length - 4} additional specialized deliverables included
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer: Action Links */}
              <div className="pt-5 border-t border-ethix-charcoal-200/60 dark:border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDiscipline(cat)}
                  className="inline-flex items-center gap-1.5 bg-ethix-red hover:bg-ethix-red-hover text-white px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-subtle transition-all duration-150 group/btn"
                >
                  <span>Detailed Deliverables & Scope</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <span className="text-[11px] font-mono font-medium text-ethix-charcoal-500 dark:text-ethix-charcoal-400 hidden sm:inline-block">
                  Hover to pause
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DISCIPLINE DEEP-DIVE MODAL */}
      {selectedDiscipline && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedDiscipline(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 rounded-3xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-300 dark:border-white/20 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDiscipline(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white dark:bg-white/10 text-ethix-charcoal-600 dark:text-ethix-charcoal-300 hover:text-ethix-charcoal-900 dark:hover:text-white border border-ethix-charcoal-200 dark:border-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 mb-6">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold border ${selectedDiscipline.accentBg} ${selectedDiscipline.accentColor} ${selectedDiscipline.accentBorder}`}
              >
                {selectedDiscipline.icon}
                <span>{selectedDiscipline.name}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] leading-tight">
                {selectedDiscipline.tagline}
              </h3>

              <p className="text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                {selectedDiscipline.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="mb-6 pb-6 border-b border-ethix-charcoal-200/70 dark:border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block mb-2">
                Production Tech Stack:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedDiscipline.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-white/10 border border-ethix-charcoal-200/80 dark:border-white/10 text-xs font-mono font-medium text-ethix-charcoal-800 dark:text-ethix-charcoal-200"
                  >
                    <Sparkles className="w-3 h-3 text-ethix-red" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Complete Deliverables Breakdown */}
            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                Complete Deliverables & Capabilities ({selectedDiscipline.services.length})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedDiscipline.services.map((svc, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <h5 className="font-bold text-sm text-[#0F1012] dark:text-[#F4F4F6]">
                        {svc.name}
                      </h5>
                    </div>
                    <p className="text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-400 leading-relaxed">
                      {svc.desc}
                    </p>
                    <div className="pt-2 text-[10px] font-semibold text-ethix-red">
                      Included in Scope • Full SLA
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal CTAs */}
            <div className="pt-4 border-t border-ethix-charcoal-200/70 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/services"
                onClick={() => setSelectedDiscipline(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold text-ethix-charcoal-900 dark:text-white hover:text-ethix-red transition-colors"
              >
                <span>Read Full Service Specification Docs</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                onClick={() => setSelectedDiscipline(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ethix-red hover:bg-ethix-red-hover text-white px-6 py-3 rounded-xl font-bold text-xs tracking-wide shadow-subtle transition-all duration-150"
              >
                <span>Deploy This Discipline</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
