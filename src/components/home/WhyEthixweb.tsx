import React from 'react';
import { Check, X, ShieldCheck, Zap, Users, MessageSquareCode, Clock, RefreshCw } from 'lucide-react';

export const WhyEthixweb: React.FC = () => {
  const comparisonItems = [
    {
      feature: 'Team Structure',
      ethixweb: 'Senior engineers & architects do the actual work',
      typicalAgency: 'Sold by seniors, handed down to junior interns or offshore freelancers',
    },
    {
      feature: 'Communication',
      ethixweb: 'Direct Slack, WhatsApp & meeting line with engineers',
      typicalAgency: 'Account manager filter with days of telephone latency',
    },
    {
      feature: 'Technology Stack',
      ethixweb: 'High-performance React/Vite, TypeScript, Next.js, Headless CMS',
      typicalAgency: 'Bulky WordPress page builders or generic bloated templates',
    },
    {
      feature: 'Security & Validation',
      ethixweb: 'Independent Zod API schemas, rate limits, Turnstile, and MongoDB Atlas',
      typicalAgency: 'Basic contact forms prone to bot spam and database leaks',
    },
    {
      feature: 'Global Operations',
      ethixweb: '24/7 continuous coverage across US and India tech hub',
      typicalAgency: 'Standard 9-5 local hours; emergencies wait until Monday',
    },
    {
      feature: 'Long-Term Ownership',
      ethixweb: 'Full codebase ownership, no proprietary locks, clear SLAs',
      typicalAgency: 'Vendor lock-in, proprietary platforms, and hostage domains',
    },
  ];

  const pillars = [
    {
      icon: <Users className="w-5 h-5 text-ethix-red" />,
      title: 'Direct Senior Access',
      desc: 'You collaborate directly with engineers who design and write the code.',
    },
    {
      icon: <Zap className="w-5 h-5 text-ethix-brass" />,
      title: 'Sub-Second Speeds',
      desc: 'Targeting 90+ Lighthouse scores for maximum SEO rankings and mobile conversion.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: 'Enterprise Security',
      desc: 'Rigorous validation, role-based controls, and sanitized serverless endpoints.',
    },
    {
      icon: <MessageSquareCode className="w-5 h-5 text-blue-500" />,
      title: 'Plain-Language Updates',
      desc: 'Weekly sprint demos with zero jargon or obfuscation.',
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-500" />,
      title: 'Continuous Velocity',
      desc: 'US & India operational alignment enables continuous progress around the clock.',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-amber-500" />,
      title: 'Active Operations SLA',
      desc: 'Guaranteed uptime, bug fixes, AI prompt updates, and dependency maintenance.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] dark:bg-[#0C0D10] border-b border-ethix-charcoal-200/70 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
            The Ethixweb Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight leading-tight">
            Built like your dedicated internal technology division.
          </h2>
          <p className="text-base text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
            Why growing companies choose an accountable digital operations partner over generic creative agency factories.
          </p>
        </div>

        {/* Comparison Matrix */}
        <div className="mb-20 rounded-3xl overflow-hidden border border-ethix-charcoal-200/80 dark:border-white/10 bg-white dark:bg-[#101114] shadow-premium">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-ethix-charcoal-200/70 dark:border-white/10 bg-ethix-ivory-50 dark:bg-white/5 p-4 sm:p-6 text-xs sm:text-sm font-bold">
            <div className="md:col-span-4 text-ethix-charcoal-500 dark:text-ethix-charcoal-400 uppercase tracking-wider">
              Capability & Philosophy
            </div>
            <div className="md:col-span-4 text-ethix-red font-extrabold flex items-center gap-1.5 mt-2 md:mt-0">
              <span className="w-2 h-2 rounded-full bg-ethix-red" />
              <span>Ethixweb Digital Operations</span>
            </div>
            <div className="md:col-span-4 text-ethix-charcoal-600 dark:text-ethix-charcoal-400 mt-2 md:mt-0">
              Typical Creative Agency Factory
            </div>
          </div>

          <div className="divide-y divide-ethix-charcoal-100 dark:divide-white/5">
            {comparisonItems.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-3 sm:gap-4 items-center text-xs sm:text-sm hover:bg-ethix-ivory-50/50 dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="md:col-span-4 font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                  {item.feature}
                </div>
                <div className="md:col-span-4 flex items-start gap-2.5 text-ethix-charcoal-800 dark:text-ethix-charcoal-200 font-medium">
                  <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.ethixweb}</span>
                </div>
                <div className="md:col-span-4 flex items-start gap-2.5 text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                  <div className="p-1 rounded-full bg-red-100 dark:bg-red-950/50 text-red-500 dark:text-red-400 shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.typicalAgency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle hover:shadow-premium transition-all duration-300 space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-ethix-ivory-100 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10">
                {p.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
