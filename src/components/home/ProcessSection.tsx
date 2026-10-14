import React from 'react';
import { Search, Compass, Cpu, RefreshCw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProcessStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export const ProcessSection: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      id: 'audit',
      icon: <Search className="w-5 h-5 text-ethix-red" />,
      title: 'Audit',
      subtitle: 'Diagnostics & Systems Mapping',
      description:
        'We dissect your current tech stack, Core Web Vitals, CRM data flows, search rankings, and conversion drop-offs to pinpoint exact points of failure and growth opportunities.',
      deliverables: ['Full Technical Stack Audit', 'Conversion Friction Report', 'SEO & Speed Benchmark'],
    },
    {
      id: 'plan',
      icon: <Compass className="w-5 h-5 text-ethix-brass" />,
      title: 'Plan',
      subtitle: 'Architecture & UX Blueprints',
      description:
        'We design user journeys, mobile-first wireframes, API contracts, database schema, and automated workflows before writing a single line of production code.',
      deliverables: ['Interactive Prototypes', 'API & Database Schemas', 'Sprint Milestone Roadmap'],
    },
    {
      id: 'build',
      icon: <Cpu className="w-5 h-5 text-emerald-500" />,
      title: 'Build',
      subtitle: 'Senior Full-Stack Engineering',
      description:
        'High-velocity development using React, TypeScript, and modern headless systems. Combined with atomic rate limits, Zod validation, and complete WCAG AA accessibility.',
      deliverables: ['Production-Grade Frontend', 'Serverless APIs & MongoDB', 'Automated QA & Security'],
    },
    {
      id: 'optimize',
      icon: <RefreshCw className="w-5 h-5 text-blue-500" />,
      title: 'Optimize',
      subtitle: 'Continuous Operations & Growth',
      description:
        'Post-launch 24/7 uptime monitoring, live analytics telemetry, AI prompt updates, security patches, and monthly SLA maintenance so your systems compound value over time.',
      deliverables: ['24/7 Telemetry & Health Checks', 'Monthly Performance Audits', 'Continuous Feature Sprints'],
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#101114] border-b border-ethix-charcoal-200/70 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
            Operating Rhythm
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight leading-tight md:whitespace-nowrap">
            How Ethixweb delivers: Audit → Plan → Build → Optimize.
          </h2>
          <p className="text-base text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed max-w-2xl mx-auto">
            A battle-tested four-phase execution pipeline built for speed, transparency, and dependable operational stability.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.id}
              className="p-8 rounded-3xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-ethix-red bg-ethix-red/10 dark:bg-ethix-red/20 px-2.5 py-1 rounded">
                    Phase: {s.title}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10">
                    {s.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#0F1012] dark:text-[#F4F4F6] mb-1">
                  {s.title}
                </h3>
                <h4 className="text-xs font-semibold text-ethix-charcoal-500 dark:text-ethix-charcoal-400 uppercase tracking-wider mb-4">
                  {s.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed mb-6">
                  {s.description}
                </p>
              </div>

              <div className="pt-4 border-t border-ethix-charcoal-200/70 dark:border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-bold text-ethix-charcoal-500 dark:text-ethix-charcoal-300 block">
                  Key Deliverables
                </span>
                <ul className="space-y-1.5">
                  {s.deliverables.map((item, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs text-ethix-charcoal-700 dark:text-ethix-charcoal-300 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-ethix-red shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Operating Model Note */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-ethix-ivory-50 dark:bg-white/5 border border-ethix-charcoal-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-[#0F1012] dark:text-[#F4F4F6]">
              Need a clear diagnosis before starting?
            </h4>
            <p className="text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              We provide a no-obligation technical stack and SEO audit to help you uncover bottlenecks.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ethix-red hover:text-ethix-red-hover dark:text-red-400 transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>Request a Technical Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
