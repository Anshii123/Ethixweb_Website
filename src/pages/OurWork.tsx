import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Wrench,
  Shield,
  Compass,
  Hammer,
  Home,
  Anchor,
  X,
  Sparkles,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CtaBanner } from '../components/home/CtaBanner';
import { PageHero } from '../components/heroes/PageHero';
import { OurWorkHeroVisual } from '../components/heroes/OurWorkHeroVisual';

interface Project {
  id: string;
  client: string;
  category: 'Web Design' | 'SEO' | 'Paid Media' | 'UX Design';
  title: string;
  industry: string;
  icon: React.ReactNode;
  image: string;
  year: string;
  problem: string;
  solution: string;
  verifiedOutcome: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  scopeDeliverables: string[];
  indiaTransferableInsight: string;
}

export const OurWork: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.title = 'Verified Case Studies & Client Work | Ethixweb';
    window.scrollTo(0, 0);
  }, []);

  const projects: Project[] = [
    {
      id: 'all-phase-plumbing',
      client: 'All Phase Plumbing',
      category: 'Web Design',
      industry: 'HVAC & Plumbing Contractors',
      icon: <Wrench className="w-5 h-5 text-ethix-red" />,
      image: '/images/case-studies/all-phase-plumbing/after-screenshot.webp',
      year: '2026',
      title: 'Emergency Service Inbound Engine & Local SEO Dominance',
      problem:
        'A legacy WordPress website with slow 5+ second mobile loads, zero automated booking, and overwhelming dependence on third-party lead aggregator brokers.',
      solution:
        'Built a custom React/Vite high-velocity web application with localized programmatic SEO service pages, real-time emergency dispatch forms, and direct CRM integration.',
      verifiedOutcome:
        'Established top 3 local pack rankings across target service cities and automated direct customer intake.',
      metrics: [
        { label: 'Inbound Organic Leads', value: '+140% Increase' },
        { label: 'Core Web Vitals Score', value: '98/100 Mobile' },
      ],
      tags: ['React', 'Local SEO', 'CRM Integration', 'Emergency Dispatch Engine'],
      scopeDeliverables: [
        'Complete React/TypeScript frontend redesign replacing monolithic WordPress',
        'Programmatic geo-targeted landing pages for 18 service suburbs',
        'Direct CRM dispatch webhook integration for technician scheduling',
        'Sub-second mobile speed optimization delivering 98 Lighthouse score',
      ],
      indiaTransferableInsight:
        'Applicable to multi-city service franchises, diagnostics, and repairs across India seeking to break free from high commissions on Urban Company or aggregator portals.',
    },
    {
      id: 'garys-pipelining',
      client: "Gary's Pipelining",
      category: 'Paid Media',
      industry: 'Trenchless Infrastructure & Utilities',
      icon: <Shield className="w-5 h-5 text-ethix-brass" />,
      image: '/images/case-studies/garys-pipeline/after-screenshot.webp',
      year: '2026',
      title: 'Commercial Infrastructure Lead Qualification & Google LSA',
      problem:
        'Specialized trenchless sewer restoration required educating municipal facility managers and property owners while filtering out non-qualified low-ticket inquiries.',
      solution:
        'Designed high-intent diagnostic landing pages, Google Local Services Ads (LSA) verification, interactive cost estimators, and automated sales pipeline routing.',
      verifiedOutcome:
        'Tripled qualified high-ticket commercial contract inquiries within 90 days while lowering blended cost-per-acquisition.',
      metrics: [
        { label: 'Commercial Pipeline Lift', value: '3.2x in 90 Days' },
        { label: 'Cost Per Qualified Lead', value: '-42% Reduced' },
      ],
      tags: ['Google Ads', 'Local Services Ads', 'Lead Qualification', 'Analytics'],
      scopeDeliverables: [
        'Google Verified Local Services Ads badge and direct call tracking',
        'Interactive diagnostic landing pages demonstrating pipe restoration',
        'Multi-step intake questionnaire filtering residential vs commercial scope',
        'Automated Looker Studio executive attribution reporting',
      ],
      indiaTransferableInsight:
        'Highly effective for Indian B2B suppliers, industrial equipment manufacturers, and commercial EPC contractors filtering out low-margin retail inquiries.',
    },
    {
      id: 'mto-cabinets',
      client: 'MTO Cabinets',
      category: 'UX Design',
      title: 'Architectural Millwork Portfolio & High-Ticket Inquiries',
      industry: 'Architectural Millwork & Cabinetry',
      icon: <Hammer className="w-5 h-5 text-emerald-500" />,
      image: '/images/hero-operations.webp',
      year: '2025',
      problem:
        'World-class bespoke craftsmanship was represented by a low-resolution website that caused high bounce rates among interior architects and luxury builders.',
      solution:
        'Engineered an editorial visual portfolio with sub-second image pipelines, interactive finish selector catalogs, and an intuitive custom consultation booking funnel.',
      verifiedOutcome:
        'Dramatically decreased mobile drop-off and positioned the brand as the premier custom architectural millwork builder in the Pacific Northwest.',
      metrics: [
        { label: 'Mobile Bounce Rate', value: '-65% Reduction' },
        { label: 'Design Consultations', value: '2.4x Increase' },
      ],
      tags: ['Headless CMS', 'High-Res Asset Pipeline', 'Retina UX', 'Consultation Flow'],
      scopeDeliverables: [
        'Decoupled headless image pipeline loading high-res galleries in under 600ms',
        'Interactive finish and wood species selector for design architects',
        'Consultation intake funnel capturing blueprint uploads and project budgets',
        'Strict WCAG 2.1 AA compliant color contrast and keyboard ergonomics',
      ],
      indiaTransferableInsight:
        'Ideal for luxury interior design studios, bespoke furniture manufacturers, and architectural practices in Mumbai, Bengaluru, and Delhi NCR.',
    },
    {
      id: 'catch-zone',
      client: 'Catch Zone Charters',
      category: 'Web Design',
      industry: 'Sportfishing & Marine Operations',
      icon: <Compass className="w-5 h-5 text-blue-500" />,
      image: '/images/case-studies/catching-chrome/after-screenshot.webp',
      year: '2026',
      title: 'Direct Sportfishing Charter Reservation & SMS Engine',
      problem:
        'Seasonal sportfishing operations were hamstrung by manual telephone booking logs, double bookings, and paying 20-30% commissions to travel directory platforms.',
      solution:
        'Created a real-time online charter reservation schedule with automatic calendar sync, automated SMS trip reminders, weather advisories, and direct payment processing.',
      verifiedOutcome:
        'Eliminated double bookings completely and shifted 40%+ of bookings from commission-charging directories directly to the company website.',
      metrics: [
        { label: 'Direct Booking Growth', value: '+40% Direct Sales' },
        { label: 'Booking Conflicts', value: '0 Double Bookings' },
      ],
      tags: ['Real-Time Booking', 'Twilio SMS', 'Stripe Integration', 'Responsive Design'],
      scopeDeliverables: [
        'Real-time calendar booking engine with instant credit card deposits',
        'Automated SMS confirmations, launch coordinates, and trip prep checklists',
        'Direct-to-consumer marine merchandise storefront',
        'Automated customer feedback and review capture funnel',
      ],
      indiaTransferableInsight:
        'Empowers experiential tourism operators, adventure travel companies, and boutique wellness retreats across India to bypass heavy OTA commissions.',
    },
    {
      id: 'bimini-buddie',
      client: 'Bimini Buddie',
      category: 'UX Design',
      title: 'Direct-to-Consumer Marine Product Video Experience',
      industry: 'Marine Lifestyle & D2C Accessories',
      icon: <Anchor className="w-5 h-5 text-purple-500" />,
      image: '/images/case-studies/catching-chrome/after-screenshot.webp',
      year: '2025',
      problem:
        'Patented marine shade product struggled with sluggish conversion on standard generic e-commerce templates, failing to convey engineering durability.',
      solution:
        'Engineered a video-first product demonstration landing experience, mobile-optimized 1-click checkout flow, and automated customer review generation.',
      verifiedOutcome:
        'Delivered sub-second mobile page loads and lifted checkout completion rates during peak boating season.',
      metrics: [
        { label: 'Mobile Page Speed', value: '0.9s Load Time' },
        { label: 'Checkout Conversion', value: '+28% Improvement' },
      ],
      tags: ['D2C Commerce', 'Video Integration', 'Mobile Ergonomics', 'Stripe'],
      scopeDeliverables: [
        'High-velocity video hero showcase illustrating patent engineering',
        'Frictionless mobile checkout flow with instant card authorization',
        'Post-purchase automated onboarding and installation video series',
        'Conversion event telemetry tracking drop-offs across device categories',
      ],
      indiaTransferableInsight:
        'Directly applicable to Indian D2C consumer brands optimizing mobile video commerce, UPI/card checkout speed, and product education.',
    },
    {
      id: 'preventive-home-solutions',
      client: 'Preventive Home Solutions',
      category: 'SEO',
      title: 'Structural Home Services Regional SEO Engine',
      industry: 'Structural Protection & Home Services',
      icon: <Home className="w-5 h-5 text-amber-500" />,
      image: '/images/case-studies/preventive-home-solutions/after-screenshot.webp',
      year: '2026',
      problem:
        'Zero organic search presence in key regional metropolitan areas; reliant entirely on volatile outbound door-to-door sales teams.',
      solution:
        'Deployed technical schema markup, structured geo-landing pages, Google Business Profile optimization, and automated customer review syndication.',
      verifiedOutcome:
        'Built a predictable, recurring monthly stream of high-intent structural inspection requests directly through organic search.',
      metrics: [
        { label: 'Organic Search Impressions', value: '+320% Growth' },
        { label: 'Monthly Inspection Requests', value: '45+ Direct Inbounds' },
      ],
      tags: ['Technical Schema', 'Geo-Targeting', 'Google Business Profile', 'Review Engine'],
      scopeDeliverables: [
        'Programmatic location pages targeting high-density property zip codes',
        'Automated SMS review requests after completed on-site inspections',
        'Core Web Vitals remediation lifting page experience signals',
        'Call recording integration verifying inbound search lead quality',
      ],
      indiaTransferableInsight:
        'Essential for multi-branch home services, commercial pest management, and facilities maintenance companies expanding across Indian tier-1 and tier-2 cities.',
    },
  ];

  const categories = ['All', 'Web Design', 'SEO', 'Paid Media', 'UX Design'];

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0D10] text-[#0F1012] dark:text-[#F4F4F6] transition-colors duration-200">
      {/* Header Hero with Interactive Upper-Right Project Showcase */}
      <PageHero
        badge="DOCUMENTED CLIENT CASE STUDIES · PROVEN SYSTEMS"
        badgeIcon={<Briefcase className="w-3.5 h-3.5 text-ethix-red" />}
        title={
          <>
            Real business systems.{' '}
            <span className="text-ethix-red">Measurable commercial outcomes.</span>
          </>
        }
        description="Explore how our senior-led engineering team replaces fragile legacy websites with robust, automated digital operations engines. Verified results, transparent metrics, and durable code."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-ethix-red hover:bg-ethix-red-hover text-white px-6 py-3 rounded-full font-bold text-xs tracking-wide shadow-subtle transition-all duration-150"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="#case-studies-grid"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ethix-charcoal-800 dark:text-ethix-charcoal-200 hover:text-ethix-red px-5 py-3 rounded-full border border-ethix-charcoal-200/80 dark:border-white/10 hover:border-ethix-red/40 transition-colors"
            >
              <span>See All Case Studies</span>
            </a>
          </div>
        }
        metaInfo={
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Verified Outcomes</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Full Stack Case Studies</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Transferable Lessons</span>
            </span>
          </div>
        }
        visual={<OurWorkHeroVisual />}
      />

      {/* Filter Tabs & Counter */}
      <section id="case-studies-grid" className="py-6 border-b border-ethix-charcoal-200/70 dark:border-white/10 bg-ethix-ivory-50/60 dark:bg-white/[0.02] sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400 mr-2">
                Filter by Discipline:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                    filter === cat
                      ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 shadow-subtle'
                      : 'bg-white dark:bg-white/5 text-ethix-charcoal-700 dark:text-ethix-charcoal-300 border border-ethix-charcoal-200/70 dark:border-white/10 hover:border-ethix-red/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
              Showing {filteredProjects.length} of {projects.length} Verified Case Studies
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  {/* Authentic Project Screenshot Feature */}
                  <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden bg-black border border-ethix-charcoal-200/60 dark:border-white/10 group-hover:border-ethix-red/50 transition-colors">
                    <img
                      src={p.image}
                      alt={p.client}
                      className="w-full h-full object-cover object-top filter brightness-[0.94] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/20">
                        {p.year}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-ethix-red text-[11px] font-mono font-bold text-white shadow-sm">
                        {p.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
                      <span className="font-mono text-[11px] text-ethix-brass font-bold">
                        {p.industry}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                        Verified Work
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-ethix-ivory-100 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10 group-hover:scale-105 transition-transform">
                        {p.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-ethix-charcoal-900 dark:text-white block">
                          {p.client}
                        </span>
                        <span className="text-[11px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                          {p.industry}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-semibold uppercase text-ethix-red bg-ethix-red/10 dark:bg-ethix-red/20 px-2.5 py-1 rounded">
                      {p.category}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F1012] dark:text-[#F4F4F6] leading-snug group-hover:text-ethix-red transition-colors">
                    {p.title}
                  </h2>

                  <div className="space-y-2.5 text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                    <p>
                      <strong className="text-ethix-charcoal-900 dark:text-white">Challenge:</strong> {p.problem}
                    </p>
                    <p>
                      <strong className="text-ethix-charcoal-900 dark:text-white">Solution:</strong> {p.solution}
                    </p>
                    <p>
                      <strong className="text-ethix-charcoal-900 dark:text-white">Verified Outcome:</strong>{' '}
                      <span className="text-[#0F1012] dark:text-white font-medium">{p.verifiedOutcome}</span>
                    </p>
                  </div>

                  {/* Metrics Strip */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-ethix-charcoal-200/70 dark:border-white/10">
                    {p.metrics.map((m, idx) => (
                      <div key={idx}>
                        <span className="text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block mb-0.5">
                          {m.label}
                        </span>
                        <span className="text-lg font-mono font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Transferable Lesson Insight Box */}
                  <div className="p-3.5 rounded-xl bg-ethix-ivory-50 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10 text-xs text-ethix-charcoal-700 dark:text-ethix-charcoal-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-ethix-brass shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0F1012] dark:text-white">Transferable Insight:</strong>{' '}
                      {p.indiaTransferableInsight}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {p.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-ethix-ivory-50 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10 text-ethix-charcoal-700 dark:text-ethix-charcoal-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-ethix-charcoal-100 dark:border-white/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(p)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-ethix-red hover:text-ethix-red-hover transition-colors"
                  >
                    <span>Read Full Architecture Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ethix-charcoal-700 dark:text-ethix-charcoal-300 hover:text-ethix-red transition-colors"
                  >
                    <span>Inquire for Similar Project →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY DETAIL DRAWER / MODAL */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 rounded-3xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-300 dark:border-white/20 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white dark:bg-white/10 text-ethix-charcoal-600 dark:text-ethix-charcoal-300 hover:text-ethix-charcoal-900 dark:hover:text-white border border-ethix-charcoal-200 dark:border-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-ethix-red bg-ethix-red/10 px-2.5 py-1 rounded">
                  {selectedProject.category}
                </span>
                <span className="text-xs font-mono text-ethix-charcoal-500">
                  {selectedProject.industry}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] leading-tight">
                {selectedProject.title}
              </h2>

              <p className="text-sm font-semibold text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
                Client: {selectedProject.client}
              </p>
            </div>

            {/* Verified Metrics Row */}
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 mb-8">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx}>
                  <span className="text-xs text-ethix-charcoal-500 block mb-1">{m.label}</span>
                  <span className="text-2xl font-mono font-bold text-ethix-red">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Narrative Sections */}
            <div className="space-y-6 text-sm leading-relaxed mb-8">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-ethix-charcoal-400 mb-2">
                  The Problem & Challenge
                </h3>
                <p className="text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
                  {selectedProject.problem}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-ethix-charcoal-400 mb-2">
                  The Engineered Solution
                </h3>
                <p className="text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
                  {selectedProject.solution}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-ethix-charcoal-400 mb-2">
                  Complete Scope Deliverables
                </h3>
                <ul className="space-y-2">
                  {selectedProject.scopeDeliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-ethix-brass mb-2">
                  Transferable Application for Growing Indian Enterprises
                </h3>
                <p className="text-xs text-ethix-charcoal-700 dark:text-ethix-charcoal-300 p-4 rounded-xl bg-ethix-brass/5 border border-ethix-brass/20">
                  {selectedProject.indiaTransferableInsight}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-6 border-t border-ethix-charcoal-200/70 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="text-xs font-bold text-ethix-charcoal-600 dark:text-ethix-charcoal-400 hover:text-ethix-charcoal-900"
              >
                Close Case Study
              </button>

              <Link
                to="/contact"
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ethix-red hover:bg-ethix-red-hover text-white px-6 py-3 rounded-full font-bold text-xs tracking-wide shadow-subtle transition-all duration-150"
              >
                <span>Request Scope Evaluation for Your Company</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Transferable Operating Philosophy Note */}
      <section className="py-20 border-t border-ethix-charcoal-200/70 dark:border-white/10 bg-white dark:bg-[#101114]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
            Integrity in Presentation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6]">
            Factual engineering evidence, zero fabricated claims.
          </h2>
          <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
            Every metric above reflects actual client system performance. We do not manufacture fictitious client names, artificial revenue claims, or stock-photo testimonials. When you work with Ethixweb, your scope is engineered with the same precision and commercial accountability.
          </p>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};
