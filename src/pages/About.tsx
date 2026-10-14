import React, { useState, useEffect } from 'react';
import {
  Globe2,
  Cpu,
  Layers,
  Users,
  Clock,
  Compass,
  Building,
  CheckCircle2,
  Shield,
  GitBranch,
  Terminal,
  Zap,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CtaBanner } from '../components/home/CtaBanner';
import { PageHero } from '../components/heroes/PageHero';
import { AboutOperatingVisual } from '../components/heroes/AboutOperatingVisual';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'delivery' | 'collaboration' | 'standards'>('delivery');

  useEffect(() => {
    document.title = 'About Ethixweb | Senior Digital Operations & Engineering Philosophy';
    window.scrollTo(0, 0);
  }, []);

  const principles = [
    {
      title: 'Direct Senior Engineering',
      tagline: 'Zero Account-Manager Telephone Games',
      description:
        'When you partner with Ethixweb, you collaborate directly with senior architects and engineers who design, code, and operate your systems. Questions get architectural answers immediately, not delayed relays through layers of account executives.',
      icon: <Users className="w-5 h-5 text-ethix-red" />,
    },
    {
      title: 'High-Velocity Sprints & Continuous Delivery',
      tagline: 'Working Code in Weeks, Not Quarters',
      description:
        'We eliminate bloated agency bureaucracy. By leveraging decoupled headless architectures, shared component design systems, and automated CI/CD pipelines, production milestones ship in 2 to 4 week focused sprints.',
      icon: <Clock className="w-5 h-5 text-ethix-brass" />,
    },
    {
      title: 'Commercial Growth & Measurable ROI',
      tagline: 'Software Engineered for Revenue Pipeline',
      description:
        'We do not build digital art projects or static brochures. Every web application, SEO structure, Google LSA strategy, and automated lead triage workflow is built to reduce customer acquisition costs, capture qualified demand, and accelerate booking conversions.',
      icon: <Cpu className="w-5 h-5 text-emerald-500" />,
    },
    {
      title: 'Resilient, Maintainable Architecture',
      tagline: 'Built on Battle-Tested Open Standards',
      description:
        'Software should not fail when traffic spikes or third-party APIs update. We build strictly typed TypeScript, React frontends, high-performance Vite tooling, serverless endpoints, secure MongoDB data layers, and WCAG AA accessibility.',
      icon: <Layers className="w-5 h-5 text-blue-500" />,
    },
  ];

  const operatingDetails = [
    {
      label: 'Headquarters & Corporate Strategy',
      value: 'Kent, WA 98031, United States (Ethixweb LLC)',
      detail: 'Strategy, client contracts, and US operational management',
      icon: <Building className="w-4 h-4 text-ethix-red" />,
    },
    {
      label: 'Global Technical Operations Hub',
      value: 'India (Dedicated Engineering & 24/7 Deployment Hub)',
      detail: 'Continuous development, automated testing, and ongoing SLA maintenance',
      icon: <Globe2 className="w-4 h-4 text-ethix-brass" />,
    },
    {
      label: 'Delivery Model',
      value: 'Senior-Led Engineering & Transparent Agile Sprints',
      detail: 'Direct Git repositories, bi-weekly staging demos, and daily asynchronous updates',
      icon: <Compass className="w-4 h-4 text-emerald-500" />,
    },
    {
      label: 'Guaranteed Response SLA',
      value: '< 1 Hour Critical Response / 24-Hour Business SLA',
      detail: 'Active dual-time-zone monitoring across US PST/EST and Indian IST windows',
      icon: <Clock className="w-4 h-4 text-blue-500" />,
    },
  ];

  const deliveryStages = [
    {
      phase: 'Discovery & Architectural Audit',
      duration: 'Week 1',
      description:
        'We deep-dive into your existing code, conversion drop-offs, CRM pipelines, and technical debt. You receive an architectural blueprint with clear milestone deliverables, technology stack selection, and fixed scope boundaries.',
      deliverables: ['System Architecture Diagram', 'Database & API Schema', 'Fixed Scope & Milestone Roadmap'],
      icon: <Terminal className="w-5 h-5 text-ethix-red" />,
    },
    {
      phase: 'Sprint Execution & Direct Branching',
      duration: 'Weeks 2 – 3',
      description:
        'Engineering begins in private Git branches. We write strictly-typed React and modular CSS components, wire database schemas, and integrate payment/CRM webhooks with continuous automated linting and unit checks.',
      deliverables: ['Accessible Design System', 'Serverless APIs & Lead Storage', 'Live Preview Deployments'],
      icon: <GitBranch className="w-5 h-5 text-ethix-brass" />,
    },
    {
      phase: 'Rigorous Verification & Security Testing',
      duration: 'Week 4',
      description:
        'Before any code touches production, we conduct end-to-end testing across 320px–1440px viewports, run WCAG AA accessibility audits, verify Core Web Vitals (INP/LCP/CLS), and test edge rate-limiting and anti-spam protection.',
      deliverables: ['Lighthouse 90+ Audit Report', 'Cross-Device QA Signoff', 'Cloudflare Turnstile & Zod Security'],
      icon: <Shield className="w-5 h-5 text-emerald-500" />,
    },
    {
      phase: 'Zero-Downtime Launch & Continuous SLA',
      duration: 'Ongoing',
      description:
        'We execute DNS switchovers with zero downtime, configure automated SSL certificates, connect production MongoDB databases, and transition your systems to our 24/7 dual-time-zone monitoring and maintenance SLA.',
      deliverables: ['Zero-Downtime DNS Deployment', 'Database Backup Automation', 'Monthly Maintenance & Performance SLAs'],
      icon: <Zap className="w-5 h-5 text-blue-500" />,
    },
  ];

  const collaborationFrameworks = [
    {
      title: 'Time-Zone Overlap & Continuous Velocity',
      body: 'With strategy in the US and deep technical execution in India, your development cycle operates continuously. US teams wake up to committed pull requests and fresh staging links; Indian operators benefit from daytime real-time Slack and WhatsApp engineering support.',
    },
    {
      title: 'Direct Engineer Access on Slack & WhatsApp',
      body: 'No bureaucratic account managers or delayed email chains. You get direct access to the engineers building your software. When an urgent schema change or production tweak is needed, you converse with the person who wrote the code.',
    },
    {
      title: 'Clean Handover & Code Sovereignty',
      body: 'You own 100% of your intellectual property, repository commits, and infrastructure credentials from day one. We never lock clients into proprietary website builders or obfuscated agency CMS setups.',
    },
    {
      title: 'Commercial Transparency & Invoicing',
      body: 'All contracts are clearly defined under Ethixweb LLC with fixed milestone schedules. Clear milestones, transparent deliverables, and zero surprise hourly billing.',
    },
  ];

  const technicalStandards = [
    { metric: '100%', label: 'Strict TypeScript Coverage', note: 'Zero untyped any leaks across frontends & serverless functions' },
    { metric: '< 1s', label: 'First Contentful Paint', note: 'Optimized serverless edge delivery and headless hydration' },
    { metric: 'WCAG AA', label: 'Accessibility Standard', note: 'Semantic HTML, full keyboard navigation, and high contrast' },
    { metric: '90+', label: 'Target Mobile Lighthouse', note: 'Sub-second performance across low-bandwidth 4G/5G connections' },
  ];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0D10] text-[#0F1012] dark:text-[#F4F4F6] transition-colors duration-200">
      {/* Editorial Header with Interactive Upper-Right Operating System Visual */}
      <PageHero
        badge="COMPANY & TECHNICAL OPERATING PHILOSOPHY"
        badgeIcon={<Globe2 className="w-3.5 h-3.5 text-ethix-red" />}
        title={
          <>
            We run the tech.{' '}
            <span className="text-ethix-red">You run the business.</span>
          </>
        }
        description="Ethixweb operates as a dedicated digital operations and engineering team. Headquartered in Kent, Washington, with a high-capacity engineering hub in India, we deliver high-velocity web applications, AI automation, and scalable digital operations without traditional agency bloat."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-ethix-red hover:bg-ethix-red-hover text-white px-6 py-3 rounded-full font-bold text-xs tracking-wide shadow-subtle transition-all duration-150"
            >
              <span>Partner With Our Team</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="#operating-model"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ethix-charcoal-800 dark:text-ethix-charcoal-200 hover:text-ethix-red px-5 py-3 rounded-full border border-ethix-charcoal-200/80 dark:border-white/10 hover:border-ethix-red/40 transition-colors"
            >
              <span>Explore Delivery Process</span>
            </a>
          </div>
        }
        metaInfo={
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Kent, WA 98031 Headquarters</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Dedicated India Engineering Hub</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Senior-Led Engineering Direct Access</span>
            </span>
          </div>
        }
        visual={<AboutOperatingVisual />}
      />

      {/* Main Narrative & Global Operating Reality */}
      <section className="py-20 border-b border-ethix-charcoal-200/70 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Story / Mission */}
            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
              <div className="space-y-2">
                <span className="text-xs font-mono font-semibold uppercase text-ethix-brass tracking-wider">
                  The Problem We Solve
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight">
                  Senior engineering rigor without the overhead of traditional agency bureaucracy.
                </h2>
              </div>

              <p>
                Business operators face an enduring dilemma when modernizing their digital presence: traditional agencies charge tens of thousands of dollars for bloated project management layers while delegating actual code to inexperienced interns. Conversely, ad-hoc freelancers often lack architectural depth, documentation standards, and the dependable long-term SLAs required to support mission-critical systems.
              </p>

              <p>
                Ethixweb was founded to permanently solve this breakdown. Registered and headquartered in Kent, Washington, with our core technical operations hub in India, we provide growing enterprises with direct access to senior full-stack developers, UI/UX architects, and automation specialists.
              </p>

              <p>
                Whether modernizing high-intent inbound booking funnels for commercial trades, deploying multilingual conversational AI receptionists, or managing precision search acquisition pipelines, our focus remains unwavering: practical execution, measurable commercial returns, and durable software architecture.
              </p>

              {/* Mission & Vision Cards */}
              <div className="pt-4 border-t border-ethix-charcoal-200/70 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-ethix-red" />
                    <h3 className="font-bold text-sm text-[#0F1012] dark:text-[#F4F4F6]">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-400 leading-relaxed">
                    To eliminate technical bottlenecks for growing businesses by building resilient, senior-engineered digital systems that directly grow revenue and improve operational efficiency.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-ethix-brass" />
                    <h3 className="font-bold text-sm text-[#0F1012] dark:text-[#F4F4F6]">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-400 leading-relaxed">
                    To be the most trusted technology execution partner for commercial operators in North America and India who value engineering craft, transparent communication, and continuous velocity.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Company Facts Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-premium space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-ethix-charcoal-100 dark:border-white/10">
                  <div className="p-2.5 rounded-xl bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0F1012] dark:text-[#F4F4F6]">
                      Verified Operating Structure
                    </h3>
                    <span className="text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400 font-mono">
                      Ethixweb LLC · Global Presence
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {operatingDetails.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-200/60 dark:border-white/5">
                      <div className="p-2 rounded-lg bg-white dark:bg-white/10 border border-ethix-charcoal-200/60 dark:border-white/10 shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block font-semibold">
                          {item.label}
                        </span>
                        <div className="text-xs sm:text-sm font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                          {item.value}
                        </div>
                        <p className="text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400 leading-tight">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
                  <strong className="font-bold">Transparent Partnership Guarantee:</strong> Every line of code is produced under strict version control in your own Git organization. No obfuscated plugins, no vendor lock-in, and zero proprietary agency CMS barriers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs: Delivery Process / Global Collaboration / Technical Standards */}
      <section className="py-24 bg-white dark:bg-[#101114] border-b border-ethix-charcoal-200/70 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-ethix-red">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight">
              Operational transparency at every phase of your project.
            </h2>
            <p className="text-sm sm:text-base text-ethix-charcoal-600 dark:text-ethix-charcoal-300">
              Explore our structured engineering rhythms, continuous dual-time-zone delivery model, and uncompromising technical benchmarks.
            </p>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => setActiveTab('delivery')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'delivery'
                    ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 shadow-md'
                    : 'bg-[#FAF8F5] dark:bg-white/5 text-ethix-charcoal-600 dark:text-ethix-charcoal-300 hover:text-ethix-charcoal-900 dark:hover:text-white border border-ethix-charcoal-200/80 dark:border-white/10'
                }`}
              >
                4-Stage Delivery Rhythm
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('collaboration')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'collaboration'
                    ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 shadow-md'
                    : 'bg-[#FAF8F5] dark:bg-white/5 text-ethix-charcoal-600 dark:text-ethix-charcoal-300 hover:text-ethix-charcoal-900 dark:hover:text-white border border-ethix-charcoal-200/80 dark:border-white/10'
                }`}
              >
                Global & India Collaboration
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('standards')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'standards'
                    ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 shadow-md'
                    : 'bg-[#FAF8F5] dark:bg-white/5 text-ethix-charcoal-600 dark:text-ethix-charcoal-300 hover:text-ethix-charcoal-900 dark:hover:text-white border border-ethix-charcoal-200/80 dark:border-white/10'
                }`}
              >
                Technical & Accessibility Standards
              </button>
            </div>
          </div>

          {/* Tab 1: Delivery Rhythm */}
          {activeTab === 'delivery' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {deliveryStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10">
                        {stage.icon}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-ethix-red bg-ethix-red/10 px-2.5 py-1 rounded">
                        {stage.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0F1012] dark:text-[#F4F4F6] leading-snug">
                      {stage.phase}
                    </h3>

                    <p className="text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-400 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-ethix-charcoal-200/60 dark:border-white/10 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-300 block font-semibold">
                      Key Deliverables:
                    </span>
                    {stage.deliverables.map((d, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5 text-xs text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Collaboration Frameworks */}
          {activeTab === 'collaboration' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in max-w-5xl mx-auto">
              {collaborationFrameworks.map((cf, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-ethix-red" />
                    <h3 className="text-lg font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                      {cf.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                    {cf.body}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Technical Standards */}
          {activeTab === 'standards' && (
            <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {technicalStandards.map((std, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 text-center space-y-2"
                  >
                    <div className="text-3xl sm:text-4xl font-extrabold text-ethix-red">
                      {std.metric}
                    </div>
                    <div className="text-xs font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                      {std.label}
                    </div>
                    <p className="text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                      {std.note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 text-center space-y-2">
                <h4 className="text-sm font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                  Strict WCAG 2.1 AA Compliance & Performance First
                </h4>
                <p className="text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-400 max-w-2xl mx-auto leading-relaxed">
                  We reject clumsy third-party accessibility overlay widgets that fail legal scrutiny. Every component is built with semantic HTML tags, ARIA attributes, keyboard tab-indices, and strict color contrast tokens.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 border-b border-ethix-charcoal-200/70 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-ethix-red">
              Engineering Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight">
              Principles that govern our architecture and client partnerships.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle hover:shadow-premium transition-all duration-300 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 w-fit rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10">
                    {p.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400 font-bold">
                    Core Standard
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                    {p.title}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-ethix-brass block mt-0.5">
                    {p.tagline}
                  </span>
                </div>
                <p className="text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <CtaBanner />
    </div>
  );
};

