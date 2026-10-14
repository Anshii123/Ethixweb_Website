import React from 'react';
import { ArrowUpRight, Wrench, Shield, Compass, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudy {
  id: string;
  badge: string;
  title: string;
  client: string;
  industry: string;
  icon: React.ReactNode;
  problem: string;
  solution: string;
  verifiedOutcome: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

export const FeaturedWork: React.FC = () => {
  const caseStudies: CaseStudy[] = [
    {
      id: 'all-phase-plumbing',
      badge: 'Full Digital Operations',
      title: 'All Phase Plumbing — Complete Web & Lead Engine Overhaul',
      client: 'All Phase Plumbing',
      industry: 'HVAC & Plumbing Contractors',
      icon: <Wrench className="w-5 h-5 text-ethix-red" />,
      problem:
        'A legacy website with sluggish mobile speeds, zero inbound booking automation, and high reliance on expensive third-party lead brokers.',
      solution:
        'Engineered a custom high-performance web application, localized programmatic SEO service pages, direct customer booking integration, and automated CRM pipeline routing.',
      verifiedOutcome:
        'Established dominant local search rankings and automated emergency dispatch inquiries directly to field technicians.',
      metrics: [
        { label: 'Inbound Organic Leads', value: '+140% Increase' },
        { label: 'Core Web Vitals', value: '98/100 Performance' },
      ],
      tags: ['Website Redesign', 'Technical SEO', 'CRM Integration', 'Local Services Ads'],
    },
    {
      id: 'garys-pipelining',
      badge: 'High-Ticket Acquisition',
      title: "Gary's Pipelining — Commercial Pipeline Expansion",
      client: "Gary's Pipelining",
      industry: 'Trenchless Infrastructure & Utilities',
      icon: <Shield className="w-5 h-5 text-ethix-brass" />,
      problem:
        'High-ticket municipal and residential pipe restoration services required building immense trust and educating prospects before booking consultations.',
      solution:
        'Created conversion-focused landing experiences, case study galleries demonstrating pipe diagnostics, Google LSA verification, and automated customer qualification funnels.',
      verifiedOutcome:
        'Scaled high-margin commercial project inquiries and eliminated non-qualified residential consultation requests.',
      metrics: [
        { label: 'Qualified Pipeline Growth', value: '3.2x in 90 Days' },
        { label: 'Cost Per Inbound Lead', value: '-42% Reduced' },
      ],
      tags: ['Landing Pages', 'Google Ads & LSA', 'Analytics Dashboard', 'Lead Qualification'],
    },
    {
      id: 'mto-cabinets',
      badge: 'Portfolio Architecture',
      title: 'MTO Cabinets — Architectural Millwork Portfolio & Inquiries',
      client: 'MTO Cabinets',
      industry: 'Custom Cabinetry & Millwork',
      icon: <Hammer className="w-5 h-5 text-emerald-500" />,
      problem:
        'Master-level artisan craftsmanship was hindered by slow-loading photo galleries and poor mobile ergonomics that caused prospective interior designers to bounce.',
      solution:
        'Designed an editorial, visual-first portfolio with responsive responsive image pipelines, sub-second zoom rendering, and an intuitive project estimation inquiry flow.',
      verifiedOutcome:
        'Elevated brand prestige and captured high-value residential remodel inquiries across prime regional markets.',
      metrics: [
        { label: 'Mobile Bounce Rate', value: '-65% Reduction' },
        { label: 'Consultation Requests', value: '2.4x Increase' },
      ],
      tags: ['UX Design', 'Headless CMS', 'Responsive Ergonomics', 'Conversion Optimization'],
    },
    {
      id: 'catch-zone',
      badge: 'Automated Booking Flow',
      title: 'Catch Zone & Bimini Buddie — Marine & Outfitter Ecosystem',
      client: 'Catch Zone / Bimini Buddie',
      industry: 'Sportfishing & Marine Products',
      icon: <Compass className="w-5 h-5 text-blue-500" />,
      problem:
        'Seasonal sportfishing charters and marine outfitter sales were burdened by manual phone booking logs, double bookings, and clunky checkout barriers.',
      solution:
        'Built a real-time charter booking schedule, automated customer SMS confirmations, weather notification webhooks, and streamlined direct-to-consumer marine merchandise sales.',
      verifiedOutcome:
        'Eliminated double bookings completely while unlocking direct booking revenue without third-party charter directory commissions.',
      metrics: [
        { label: 'Direct Booking Lift', value: '+40% Direct Sales' },
        { label: 'Scheduling Errors', value: '0 Double Bookings' },
      ],
      tags: ['Web Applications', 'SMS Automation', 'E-commerce Funnel', 'Payment Integration'],
    },
  ];

  return (
    <section id="work" className="py-24 bg-[#FAF8F5] dark:bg-[#0C0D10] border-b border-ethix-charcoal-200/70 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
              Verified Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight leading-tight">
              Real business systems. Measurable commercial outcomes.
            </h2>
            <p className="text-base text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
              Explore how our senior-led engineering team replaces fragile legacy websites with robust, automated digital operations engines.
            </p>
          </div>

          <Link
            to="/our-work"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-ethix-charcoal-900 dark:text-white hover:text-ethix-red dark:hover:text-ethix-red transition-colors group self-start md:self-auto"
          >
            <span>View All Client Work</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 rounded-xl bg-ethix-ivory-100 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10">
                      {cs.icon}
                    </div>
                    <span className="text-xs font-mono font-semibold uppercase text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                      {cs.industry}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ethix-red bg-ethix-red/10 dark:bg-ethix-red/20 px-2.5 py-1 rounded">
                    {cs.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#0F1012] dark:text-[#F4F4F6] leading-snug">
                  {cs.title}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                  <p>
                    <strong className="text-ethix-charcoal-900 dark:text-white">Challenge:</strong> {cs.problem}
                  </p>
                  <p>
                    <strong className="text-ethix-charcoal-900 dark:text-white">Solution:</strong> {cs.solution}
                  </p>
                </div>

                {/* Verified Metrics Strip */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-ethix-charcoal-200/70 dark:border-white/10">
                  {cs.metrics.map((m, i) => (
                    <div key={i}>
                      <span className="text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400 block mb-0.5">
                        {m.label}
                      </span>
                      <span className="text-lg font-mono font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {cs.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-ethix-ivory-50 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10 text-ethix-charcoal-700 dark:text-ethix-charcoal-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-ethix-charcoal-100 dark:border-white/10">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-ethix-charcoal-900 dark:text-white hover:text-ethix-red dark:hover:text-ethix-red transition-colors"
                >
                  <span>Inquire for Similar Scope</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
