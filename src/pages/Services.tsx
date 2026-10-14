import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  Search,
  Compass,
  Cpu,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { CtaBanner } from '../components/home/CtaBanner';
import { PageHero } from '../components/heroes/PageHero';
import { ServicesOrbitVisual } from '../components/heroes/ServicesOrbitVisual';

interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tech: string[];
  indiaRelevance: string;
}

interface CatalogCategory {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  tagline: string;
  description: string;
  services: ServiceItem[];
}

interface FaqItem {
  question: string;
  answer: string;
}

export const Services: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  useEffect(() => {
    document.title = 'Complete 22-Service Catalog | Ethixweb Digital Operations';
    window.scrollTo(0, 0);
  }, []);

  const catalog: CatalogCategory[] = [
    {
      id: 'website',
      name: 'Website & Architecture',
      count: 4,
      icon: <Globe className="w-5 h-5 text-ethix-red" />,
      accentColor: 'text-ethix-red',
      accentBg: 'bg-ethix-red/10',
      accentBorder: 'border-ethix-red/25',
      tagline: 'High-performance digital flagships engineered for conversion & speed.',
      description:
        'We design and develop bespoke, lightning-fast web presences that eliminate technical debt and convert inbound visitors into paying customers.',
      services: [
        {
          id: 'website-redesign',
          title: 'Website Redesign',
          tagline: 'Modernizing legacy web presences into revenue engines.',
          description:
            'Transform outdated, slow-loading websites into fast, responsive, and brand-aligned digital engines engineered for maximum user engagement and lead capture.',
          deliverables: ['Custom UI/UX Prototypes', 'Production React/TypeScript Build', 'Core Web Vitals 90+ Score', 'SEO Migration Preservation'],
          tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
          indiaRelevance: 'Sub-second rendering tuned for variable mobile bandwidth across Indian metros and Tier-2 business hubs.',
        },
        {
          id: 'headless-architecture',
          title: 'Headless Architecture',
          tagline: 'Decoupled frontends backed by modern CMS infrastructure.',
          description:
            'Decouple your frontend presentation layer from your backend CMS. Gives marketing teams publishing freedom while preserving sub-second edge rendering speed.',
          deliverables: ['Headless CMS Configuration', 'Serverless Edge Caching', 'Webhook Deployment Triggers', 'Zero Plugin Vulnerabilities'],
          tech: ['Next.js', 'Sanity', 'Strapi', 'Vercel Edge'],
          indiaRelevance: 'Eliminates bulky monolithic WordPress vulnerabilities and heavy server hosting overhead.',
        },
        {
          id: 'landing-pages',
          title: 'Conversion Landing Pages',
          tagline: 'High-intent single-objective conversion environments.',
          description:
            'Purpose-built single-objective landing experiences with persuasive copy, structured offer hierarchy, and frictionless inquiry ergonomics.',
          deliverables: ['High-Intent Above-the-Fold UX', 'A/B Testing Foundations', 'Instant Webhook Dispatches', 'Mobile Checkout Optimization'],
          tech: ['Tailwind CSS', 'Zod', 'Cloudflare Turnstile'],
          indiaRelevance: 'Frictionless lead forms supporting WhatsApp click-to-chat and instant mobile submission.',
        },
        {
          id: 'web-applications',
          title: 'Custom Web Applications',
          tagline: 'Tailored portals, quotation tools, and SaaS platforms.',
          description:
            'Tailored full-stack portals, internal operating tools, and transactional software built to match your exact business requirements.',
          deliverables: ['Role-Based Authentication', 'MongoDB Atlas Schema', 'Serverless REST APIs', 'Interactive Operations Dashboard'],
          tech: ['Node.js Serverless', 'MongoDB Atlas', 'JWT Sessions'],
          indiaRelevance: 'Bespoke client portals with Razorpay, UPI, or Stripe checkout integrations and automated PDF invoicing.',
        },
      ],
    },
    {
      id: 'ai',
      name: 'AI & Automation',
      count: 4,
      icon: <Bot className="w-5 h-5 text-ethix-brass" />,
      accentColor: 'text-ethix-brass',
      accentBg: 'bg-ethix-brass/10',
      accentBorder: 'border-ethix-brass/25',
      tagline: '24/7 intelligent voice and chat agents running front-desk operations.',
      description:
        'Deploy custom-trained AI receptionists and autonomous workflows that converse naturally with customers, qualify inquiries, and handle repetitive operational tasks.',
      services: [
        {
          id: 'ai-receptionists',
          title: 'AI Receptionists & CSRs',
          tagline: 'Voice & conversational chat agents available around the clock.',
          description:
            'Autonomous voice and text receptionists trained on your pricing, policies, and service zones to schedule appointments, capture leads, and answer FAQs 24/7.',
          deliverables: ['Voice Model Fine-Tuning', 'Multi-Turn Conversational Logic', 'Calendar Booking Integration', 'Lead Qualification Protocols'],
          tech: ['OpenAI Whisper', 'ElevenLabs', 'LangChain', 'WebSockets'],
          indiaRelevance: 'Handles bilingual Hindi & English customer inquiries seamlessly, preventing lead drop-offs during peak and off-hours.',
        },
        {
          id: 'knowledge-base-bots',
          title: 'Knowledge Base Chatbots',
          tagline: 'Private, grounded RAG chatbots trained on company SOPs.',
          description:
            'Ground LLMs strictly on your verified product documentation, employee onboarding manuals, or customer service transcripts with zero hallucinations.',
          deliverables: ['Vector Database Indexing', 'PDF & Doc Ingestion Pipeline', 'Strict Guardrails & Moderation', 'Audit Logging & Analytics'],
          tech: ['Pinecone', 'OpenAI Embeddings', 'RAG Architecture'],
          indiaRelevance: 'Accelerates internal staff training and answers complex customer support tickets instantly.',
        },
        {
          id: 'autonomous-llm-workflows',
          title: 'Autonomous LLM Workflows',
          tagline: 'End-to-end task automation for back-office efficiency.',
          description:
            'Multi-step intelligent agents that extract invoice data, draft client proposals, categorize incoming emails, and trigger downstream CRM updates automatically.',
          deliverables: ['Document OCR & Parsing', 'Structured JSON Extraction', 'API Action Webhooks', 'Human-in-the-Loop Safeguards'],
          tech: ['Claude 3.5 Sonnet', 'Node.js', 'Vercel Serverless'],
          indiaRelevance: 'Automates customer onboarding, KYC document triage, and WhatsApp order status notifications.',
        },
        {
          id: 'human-handoff',
          title: 'Human Handoff Protocols',
          tagline: 'Smooth escalation to human staff when high empathy is needed.',
          description:
            'Ensure customers never hit a frustrating dead-end. When inquiries exceed AI confidence thresholds, conversations seamlessly transfer to live team members.',
          deliverables: ['Real-Time Agent Dashboard', 'Sentiment-Based Escalation', 'Contextual Summary Handoff', 'SLA Response Tracking'],
          tech: ['WebSocket Streaming', 'Slack / WhatsApp Webhooks', 'CRM Live Chat'],
          indiaRelevance: 'Notifies your senior account reps immediately on WhatsApp when a high-value prospect requests human consultation.',
        },
      ],
    },
    {
      id: 'growth',
      name: 'Growth & Acquisition',
      count: 6,
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
      accentColor: 'text-emerald-500',
      accentBg: 'bg-emerald-500/10',
      accentBorder: 'border-emerald-500/25',
      tagline: 'Structured digital marketing and multi-channel acquisition funnels.',
      description:
        'Disciplined customer acquisition engineered for measurable ROI. We build sustainable inbound pipelines combining technical search, paid ads, and CRM automation.',
      services: [
        {
          id: 'technical-seo',
          title: 'Technical & Local SEO',
          tagline: 'Dominating search rankings with programmatic architecture.',
          description:
            'Comprehensive technical audits, structured schema markup, regional city landing pages, and speed optimizations that earn authoritative Google search rankings.',
          deliverables: ['Complete Technical SEO Audit', 'Local Schema & Citations', 'Programmatic Suburb Pages', 'Backlink Profile Clean-Up'],
          tech: ['Schema.org', 'Google Search Console', 'Ahrefs'],
          indiaRelevance: 'Targets geo-specific buyer intent across Indian commercial hubs and NRI international markets.',
        },
        {
          id: 'google-ads-lsa',
          title: 'Google Ads & Local Services Ads (LSA)',
          tagline: 'High-intent search campaigns and Google Guaranteed badges.',
          description:
            'Laser-focused Google Search campaigns and Local Services Ads management. Capture qualified inbound phone calls from buyers actively looking for your exact services.',
          deliverables: ['Negative Keyword Filtering', 'Conversion Tracking Setup', 'LSA Verification Assistance', 'Weekly Bid Optimization'],
          tech: ['Google Ads API', 'CallRail', 'Looker Studio'],
          indiaRelevance: 'Stops ad budget waste by focusing strictly on transactional commercial keywords with verified call tracking.',
        },
        {
          id: 'meta-retargeting',
          title: 'Meta Ads & Video Retargeting',
          tagline: 'Engaging creative campaigns across Instagram and Facebook.',
          description:
            'High-converting video and carousel ad campaigns that introduce your brand, build immediate social proof, and retarget interested prospects until they book.',
          deliverables: ['Creative Angle Strategy', 'Video Ad Scripting & Editing', 'Retargeting Funnel Sequences', 'Custom Audience Modeling'],
          tech: ['Meta Conversions API', 'CapCut / Premiere', 'Event Telemetry'],
          indiaRelevance: 'Leverages India’s immense Instagram and mobile video engagement for brand authority and lead capture.',
        },
        {
          id: 'social-reels',
          title: 'Social Media & Short-Form Video',
          tagline: 'Organic engagement systems that establish industry authority.',
          description:
            'Authentic, educational short-form video strategies (Reels, Shorts, LinkedIn) designed to position your leadership team as the foremost authority in your trade.',
          deliverables: ['Monthly Content Calendar', 'Batch Recording Framework', 'Engaging Motion Graphics', 'Community Engagement Protocols'],
          tech: ['YouTube Shorts', 'Instagram Reels', 'LinkedIn Creator'],
          indiaRelevance: 'Builds authentic executive credibility for founders seeking domestic and international clients.',
        },
        {
          id: 'email-marketing',
          title: 'Email Marketing & Drip Funnels',
          tagline: 'Automated nurture sequences that re-activate past clients.',
          description:
            'Turn past quotes and previous customers into repeat business. We design automated email nurture sequences, seasonal promos, and educational newsletters.',
          deliverables: ['Welcome & Onboarding Drips', 'Quote Follow-Up Automation', 'Seasonal Promotion Blasts', 'Unsubscribe & Spam Clean-Up'],
          tech: ['Klaviyo', 'HubSpot Marketing', 'Mailgun'],
          indiaRelevance: 'Combines email with automated WhatsApp broadcast updates for 4x higher open rates.',
        },
        {
          id: 'crm-integrations',
          title: 'CRM & Pipeline Synchronization',
          tagline: 'Zero lead leakage between marketing channels and sales.',
          description:
            'Connect website forms, phone call recordings, and ad leads directly to your sales CRM with real-time notifications to team members.',
          deliverables: ['Two-Way CRM Webhooks', 'Automated Deal Stage Routing', 'Instant Sales Team Alerts', 'Lead Scoring Rules'],
          tech: ['HubSpot', 'GoHighLevel', 'Zoho CRM', 'Make / Zapier'],
          indiaRelevance: 'Direct integration with Zoho, WhatsApp Business API, and LeadSquared for Indian sales operations.',
        },
      ],
    },
    {
      id: 'data',
      name: 'Data & Dashboards',
      count: 3,
      icon: <BarChart3 className="w-5 h-5 text-blue-500" />,
      accentColor: 'text-blue-500',
      accentBg: 'bg-blue-500/10',
      accentBorder: 'border-blue-500/25',
      tagline: 'Real-time telemetry, clear attribution, and actionable operational metrics.',
      description:
        'Eliminate blind spots in your business. We build live unified analytics dashboards that tie traffic, ad spend, and conversion outcomes directly to revenue.',
      services: [
        {
          id: 'custom-dashboards',
          title: 'Custom Operational Dashboards',
          tagline: 'Single pane of glass for revenue, leads, and operational health.',
          description:
            'Unified real-time views combining website telemetry, ad spend ROI, sales closed, and technician utilization into one intuitive dashboard.',
          deliverables: ['Custom Metric KPI Formulas', 'Multi-Source Data Pipelines', 'Mobile Executive View', 'Automated Daily Slack Summaries'],
          tech: ['Looker Studio', 'BigQuery', 'Google Analytics 4'],
          indiaRelevance: 'Allows founders and department heads to monitor multi-branch operations from any mobile device.',
        },
        {
          id: 'funnel-analytics',
          title: 'Conversion & Funnel Analytics',
          tagline: 'Pinpoint user drop-off points with granular event telemetry.',
          description:
            'Identify exactly where prospective clients abandon your booking process. We instrument heatmaps, scroll depth, form field drop-offs, and micro-conversions.',
          deliverables: ['Event Tagging & GA4 Setup', 'Form Field Friction Audits', 'Checkout Funnel Heatmaps', 'Cross-Domain Tracking'],
          tech: ['PostHog', 'Mixpanel', 'Google Tag Manager'],
          indiaRelevance: 'Optimizes mobile checkout and quotation drop-offs on Indian cellular devices.',
        },
        {
          id: 'executive-reporting',
          title: 'Monthly Executive Reporting',
          tagline: 'Plain-language strategic briefings on business trajectory.',
          description:
            'Transparent, senior-authored executive summaries delivered monthly. Clear insights on what worked, what needs attention, and next sprint priorities.',
          deliverables: ['Executive Metric Highlights', 'Attribution Breakdown', 'Technical Health Audit', 'Prioritized Action Plan'],
          tech: ['Notion', 'Loom Video Briefs', 'PDF Deliverables'],
          indiaRelevance: 'Clear, direct communication without jargon or ambiguous vanity metrics.',
        },
      ],
    },
    {
      id: 'accessibility',
      name: 'Accessibility (WCAG AA)',
      count: 2,
      icon: <Eye className="w-5 h-5 text-purple-500" />,
      accentColor: 'text-purple-500',
      accentBg: 'bg-purple-500/10',
      accentBorder: 'border-purple-500/25',
      tagline: 'Ensuring your web presence is inclusive, compliant, and universally usable.',
      description:
        'Protect your business against legal liability while expanding your audience reach. We design, audit, and remediate digital experiences to meet strict WCAG 2.1 AA standards.',
      services: [
        {
          id: 'accessibility-remediation',
          title: 'Accessibility Improvements & Remediation',
          tagline: 'Code-level fixes for contrast, keyboard access, and screen readers.',
          description:
            'Durable code-level remediation replacing fragile overlay widgets with native semantic HTML, proper ARIA attributes, and accessible color tokens.',
          deliverables: ['Color Contrast Rectification', 'Keyboard Focus Ring Flow', 'Screen Reader Semantic Tree', 'Form Label Accessibility'],
          tech: ['Axe Core', 'WAVE Evaluation', 'NVDA Screen Reader'],
          indiaRelevance: 'Ensures compliance with global standards, crucial for Indian firms bidding on US, UK, and European enterprise contracts.',
        },
        {
          id: 'accessibility-audits',
          title: 'Accessibility Testing & Certification',
          tagline: 'Rigorous manual and automated evaluations against WCAG benchmarks.',
          description:
            'Thorough evaluation of every critical user journey by senior accessibility engineers using assistive technologies and automated testing suites.',
          deliverables: ['VPAT Statement of Compliance', 'Prioritized Issue Matrix', 'Assistive Tech Testing Video', 'Annual Re-Testing Protocol'],
          tech: ['Lighthouse Accessibility', 'Pa11y', 'W3C Validator'],
          indiaRelevance: 'Essential verification documentation for enterprise RFPs and international compliance filings.',
        },
      ],
    },
    {
      id: 'support',
      name: 'Maintenance & Support',
      count: 3,
      icon: <Headphones className="w-5 h-5 text-amber-500" />,
      accentColor: 'text-amber-500',
      accentBg: 'bg-amber-500/10',
      accentBorder: 'border-amber-500/25',
      tagline: 'Guaranteed uptime, continuous security patching, and proactive tech operations.',
      description:
        'Software requires ongoing care to remain secure and competitive. Our senior engineers handle code updates, API monitoring, and bug fixes so your business never stalls.',
      services: [
        {
          id: 'sla-support',
          title: 'Technical Support & SLA',
          tagline: 'Dedicated senior engineering hours and guaranteed response times.',
          description:
            'Direct access to senior developers who know your codebase intimately. Guaranteed response times for emergency hotfixes, server issues, and urgent updates.',
          deliverables: ['Guaranteed Response SLA', 'Dedicated Sprint Hours', 'Proactive Health Monitoring', 'Direct Slack / WhatsApp Desk'],
          tech: ['Uptime Kuma', 'Sentry Error Telemetry', 'Docker'],
          indiaRelevance: '24/7 continuous engineering coverage enabled by our US leadership and India technical hub alignment.',
        },
        {
          id: 'ai-content-updates',
          title: 'AI & Content Operations',
          tagline: 'Routine fine-tuning of prompts, knowledge vectors, and site copy.',
          description:
            'Keep your AI agents and site copy razor-sharp. We continuously update knowledge bases, fine-tune prompts against real chat logs, and publish fresh content.',
          deliverables: ['Prompt Optimization Sprints', 'Vector Index Refreshing', 'New Landing Page Staging', 'Copy Revisions & Tweaks'],
          tech: ['LangSmith', 'OpenAI Eval', 'Headless CMS'],
          indiaRelevance: 'Adapts AI responses to new service offerings, seasonal pricing, and regional customer queries.',
        },
        {
          id: 'api-maintenance',
          title: 'API & Dependency Maintenance',
          tagline: 'Continuous security patching and third-party API monitoring.',
          description:
            'Prevent unexpected breaks when third-party APIs change. We monitor deprecation notices, patch npm dependencies, and maintain cloud infrastructure.',
          deliverables: ['Weekly Dependency Audits', 'API Version Migrations', 'Automated Database Backups', 'Security Patch Deployment'],
          tech: ['GitHub Dependabot', 'MongoDB Atlas Backups', 'Cloudflare'],
          indiaRelevance: 'Protects critical business tools from downtime caused by external payment or CRM API deprecations.',
        },
      ],
    },
  ];

  const rhythmSteps = [
    {
      id: 'audit',
      icon: <Search className="w-5 h-5 text-ethix-red" />,
      title: 'Audit',
      subtitle: 'Diagnostics & Systems Mapping',
      description:
        'We examine your current technology stack, user drop-off points, CRM bottlenecks, competitor landscape, and revenue goals to define precise technical requirements.',
    },
    {
      id: 'plan',
      icon: <Compass className="w-5 h-5 text-ethix-brass" />,
      title: 'Plan',
      subtitle: 'Architecture & UX Blueprints',
      description:
        'We design user journeys, mobile-first wireframes, API contracts, database schema, and automated workflows before writing production code.',
    },
    {
      id: 'build',
      icon: <Cpu className="w-5 h-5 text-emerald-500" />,
      title: 'Build',
      subtitle: 'Senior Full-Stack Engineering',
      description:
        'Production frontend engineering with React, Vite, and Tailwind, paired with serverless endpoints, atomic rate limits, and secure MongoDB data persistence.',
    },
    {
      id: 'optimize',
      icon: <RefreshCw className="w-5 h-5 text-blue-500" />,
      title: 'Optimize',
      subtitle: 'Continuous Operations & Growth',
      description:
        'Edge deployment on Vercel with automated security headers, DNS optimization, analytics instrumentations, and live production smoke testing.',
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: 'How does Ethixweb differ from a traditional digital marketing agency?',
      answer:
        'Traditional agencies typically sell strategy through senior executives and then outsource the actual work to junior interns or overseas contractors. Ethixweb is an engineering-first digital operations partner. You work directly with the senior engineers and architects designing, building, and running your systems, with complete transparency and zero middle-management telephone.',
    },
    {
      question: 'What is your typical project timeline from kickoff to launch?',
      answer:
        'Most core website redesigns, booking engines, and CRM integrations launch within 2 to 4 weeks. Because we operate with senior engineers and continuous delivery between our US headquarters and India technical hub, sprint deliverables progress with extraordinary velocity.',
    },
    {
      question: 'Can Indian companies work with Ethixweb and pay conveniently?',
      answer:
        'Yes. While Ethixweb is a US-headquartered technology company, our dedicated engineering hub operates in India, providing seamless local timezone collaboration, deep understanding of Indian business workflows (WhatsApp APIs, UPI/Razorpay checkouts, regional search), and flexible commercial agreements.',
    },
    {
      question: 'Do we own the source code, designs, and database after completion?',
      answer:
        '100% yes. Unlike traditional agencies that hold domains hostage or trap you in proprietary site builders, we build on open, modern standards (React, TypeScript, MongoDB Atlas, TailwindCSS). You receive complete repository ownership, administrative database access, and clean documentation.',
    },
    {
      question: 'How do ongoing maintenance and SLA support contracts work?',
      answer:
        'We offer transparent monthly engineering hours and guaranteed response times. Our engineers handle uptime monitoring, security patching, AI prompt updates, and content additions, functioning as your dedicated internal technical team.',
    },
  ];

  const filteredCategories =
    activeCategoryFilter === 'all'
      ? catalog
      : catalog.filter((c) => c.id === activeCategoryFilter);

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0D10] text-[#0F1012] dark:text-[#F4F4F6] transition-colors duration-200">
      {/* Header Hero with Interactive Upper-Right Orbit Visual */}
      <PageHero
        badge="OFFICIAL 22-SERVICE CATALOG · DIGITAL OPERATIONS"
        badgeIcon={<Sparkles className="w-3.5 h-3.5 text-ethix-red" />}
        title={
          <>
            Everything you need to run, automate, and grow your{' '}
            <span className="text-ethix-red">digital operations.</span>
          </>
        }
        description="We eliminate the friction between disconnected freelancers, creative agencies, and offshore coders. Twenty-two production-ready capabilities across six core disciplines—built by senior architects and maintained 24/7."
        actions={
          <>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-ethix-red hover:bg-ethix-red-hover text-white px-6 py-3 rounded-full font-bold text-xs tracking-wide shadow-subtle transition-all duration-150"
            >
              <span>Request Scope Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="#catalog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ethix-charcoal-800 dark:text-ethix-charcoal-200 hover:text-ethix-red px-5 py-3 rounded-full border border-ethix-charcoal-200/80 dark:border-white/10 hover:border-ethix-red/40 transition-colors"
            >
              <span>Browse Service Directory</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </>
        }
        metaInfo={
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct Senior Engineers</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Continuous 24/7 SLA</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Fixed Milestone Sprints</span>
            </span>
          </div>
        }
        visual={<ServicesOrbitVisual />}
      />

      {/* Connected Architecture Ecosystem Banner */}
      <section className="py-14 border-b border-ethix-charcoal-200/70 dark:border-white/10 bg-ethix-ivory-50/60 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {catalog.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#14161B] border border-ethix-charcoal-200/70 dark:border-white/10 shadow-subtle hover:shadow-premium hover:-translate-y-0.5 transition-all text-center flex flex-col items-center justify-between group"
              >
                <div className="p-2.5 rounded-xl bg-ethix-ivory-50 dark:bg-white/5 border border-ethix-charcoal-200/50 dark:border-white/10 mb-2 group-hover:scale-105 transition-transform">
                  {cat.icon}
                </div>
                <div className="font-bold text-xs text-[#0F1012] dark:text-[#F4F4F6] mb-1">
                  {cat.name}
                </div>
                <div className="text-[10px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                  {cat.count} Capabilities
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Operating Rhythm Strip */}
      <section className="py-20 border-b border-ethix-charcoal-200/70 dark:border-white/10 bg-white dark:bg-[#101114]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
              Execution Pipeline
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight md:whitespace-nowrap">
              Our Operating Rhythm: Audit → Plan → Build → Optimize
            </h2>
            <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 max-w-2xl mx-auto">
              A transparent four-phase sprint methodology that gets digital systems to production in weeks, not quarters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rhythmSteps.map((step) => (
              <div
                key={step.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-ethix-red bg-ethix-red/10 dark:bg-ethix-red/20 px-2 py-0.5 rounded">
                    {step.title}
                  </span>
                  <div className="p-2 rounded-lg bg-ethix-ivory-100 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                  {step.title}
                </h3>
                <h4 className="text-xs font-semibold text-ethix-charcoal-500 dark:text-ethix-charcoal-400 uppercase tracking-wider">
                  {step.subtitle}
                </h4>
                <p className="text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete 22-Service Catalog Grouped by Category */}
      <section id="catalog" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-ethix-charcoal-200/70 dark:border-white/10">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-ethix-red font-bold">
                Detailed Specifications
              </span>
              <h3 className="text-2xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6]">
                Filter by Technical Discipline
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategoryFilter === 'all'
                    ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 shadow-subtle'
                    : 'bg-white dark:bg-white/5 text-ethix-charcoal-700 dark:text-ethix-charcoal-300 border border-ethix-charcoal-200/70 dark:border-white/10 hover:border-ethix-red/40'
                }`}
              >
                All 22 Services
              </button>
              {catalog.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeCategoryFilter === cat.id
                      ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 shadow-subtle'
                      : 'bg-white dark:bg-white/5 text-ethix-charcoal-700 dark:text-ethix-charcoal-300 border border-ethix-charcoal-200/70 dark:border-white/10 hover:border-ethix-red/40'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              id={cat.id}
              className="scroll-mt-28 border-b border-ethix-charcoal-200/70 dark:border-white/10 pb-20 last:border-b-0 last:pb-0"
            >
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-ethix-red">
                      {cat.name} // {cat.count} Services
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight">
                    {cat.name}
                  </h2>
                  <p className="text-sm sm:text-base text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-ethix-charcoal-900 dark:bg-white dark:text-ethix-charcoal-900 px-5 py-2.5 rounded-full hover:bg-ethix-red dark:hover:bg-ethix-red dark:hover:text-white transition-colors self-start md:self-auto"
                >
                  <span>Inquire About {cat.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Services Grid within Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.services.map((svc) => (
                  <div
                    key={svc.id}
                    id={svc.id}
                    className="p-8 rounded-3xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#0F1012] dark:text-[#F4F4F6] mb-1">
                          {svc.title}
                        </h3>
                        <p className="text-xs font-mono text-ethix-red font-medium">
                          {svc.tagline}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                        {svc.description}
                      </p>

                      {/* India & Global Relevance Note */}
                      <div className="p-3.5 rounded-xl bg-ethix-ivory-50 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10 text-xs text-ethix-charcoal-700 dark:text-ethix-charcoal-300 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-ethix-brass shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#0F1012] dark:text-white">Business Context:</strong>{' '}
                          {svc.indiaRelevance}
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] uppercase font-bold text-ethix-charcoal-500 dark:text-ethix-charcoal-300 block mb-2">
                          Standard Scope Deliverables
                        </span>
                        <ul className="space-y-1.5">
                          {svc.deliverables.map((del, dIdx) => (
                            <li
                              key={dIdx}
                              className="text-xs text-ethix-charcoal-700 dark:text-ethix-charcoal-300 flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-ethix-charcoal-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {svc.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-ethix-ivory-100 dark:bg-white/5 text-ethix-charcoal-600 dark:text-ethix-charcoal-400 border border-ethix-charcoal-200/50 dark:border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1 text-xs font-bold text-ethix-red hover:text-ethix-red-hover transition-colors"
                      >
                        <span>Start Scope</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 border-t border-ethix-charcoal-200/70 dark:border-white/10 bg-white dark:bg-[#101114]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
              Clear Questions & Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300">
              Everything you need to know about working with Ethixweb.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-ethix-charcoal-200/80 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#14161B] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#0F1012] dark:text-[#F4F4F6]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-ethix-charcoal-500 transition-transform duration-200 shrink-0 ${
                      openFaq === i ? 'rotate-180 text-ethix-red' : ''
                    }`}
                  />
                </button>

                {openFaq === i && (
                  <div className="px-6 pb-6 text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed border-t border-ethix-charcoal-100 dark:border-white/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <CtaBanner />
    </div>
  );
};
