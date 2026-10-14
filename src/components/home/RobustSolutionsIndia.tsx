import React from 'react';
import {
  Bot,
  BrainCircuit,
  Globe,
  Code2,
  Cable,
  Search,
  LifeBuoy,
  Workflow,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SolutionCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
  link: string;
}

export const RobustSolutionsIndia: React.FC = () => {
  const solutions: SolutionCard[] = [
    {
      id: 'ai-receptionists',
      icon: <Bot className="w-6 h-6 text-ethix-red" />,
      title: 'AI Receptionists',
      badge: '24/7 Voice & Chat',
      description:
        'Voice and chat agents that answer, qualify, route, and book leads across WhatsApp, web, and phone while your team stays focused.',
      link: '/services#ai',
    },
    {
      id: 'ai-automation',
      icon: <BrainCircuit className="w-6 h-6 text-ethix-red" />,
      title: 'AI Automation',
      badge: 'Autonomous Workflows',
      description:
        'Workflow automation, internal copilots, WhatsApp Business API data syncs, and operational systems built for real teams in India and globally.',
      link: '/services#ai',
    },
    {
      id: 'websites',
      icon: <Globe className="w-6 h-6 text-ethix-red" />,
      title: 'Websites',
      badge: 'Sub-Second Speeds',
      description:
        'Fast, premium websites with sharp positioning, conversion paths, live analytics, and SEO foundations engineered for real-world mobile bandwidth.',
      link: '/services#website',
    },
    {
      id: 'web-applications',
      icon: <Code2 className="w-6 h-6 text-ethix-red" />,
      title: 'Web Applications',
      badge: 'React & Cloud Stack',
      description:
        'Custom portals, dashboards, quotation flows, Razorpay/UPI/Stripe checkout funnels, and software tools engineered for daily operations.',
      link: '/services#website',
    },
    {
      id: 'crm-integrations',
      icon: <Cable className="w-6 h-6 text-ethix-red" />,
      title: 'CRM Integrations',
      badge: 'Unified Pipelines',
      description:
        'HubSpot, Zoho CRM, GoHighLevel, WhatsApp, forms, calls, calendars, and sales pipelines unified into one reliable lead engine.',
      link: '/services#growth',
    },
    {
      id: 'seo',
      icon: <Search className="w-6 h-6 text-ethix-red" />,
      title: 'SEO & Search Authority',
      badge: 'Durable Inbound',
      description:
        'Technical SEO, Google Business Profiles, localized regional search, and schema architectures that compound into durable commercial demand.',
      link: '/services#growth',
    },
    {
      id: 'maintenance-support',
      icon: <LifeBuoy className="w-6 h-6 text-ethix-red" />,
      title: 'Maintenance & Support',
      badge: 'Guaranteed SLA',
      description:
        'Fast fixes, uptime care, site updates, monthly reporting, and a responsive senior engineering desk based in our India operations hub.',
      link: '/services#support',
    },
    {
      id: 'digital-operations',
      icon: <Workflow className="w-6 h-6 text-ethix-red" />,
      title: 'Digital Operations',
      badge: 'End-to-End Tech',
      description:
        'A dedicated senior tech team for your digital stack, from architecture and sprint delivery through 24/7 support and revenue optimization.',
      link: '/services',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0C0D10] border-b border-ethix-charcoal-200/70 dark:border-white/10 transition-colors duration-200 relative overflow-hidden">
      {/* Ambient gradient glow in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full h-96 w-96 bg-ethix-red/10 -left-20 top-1/4 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethix-red/10 border border-ethix-red/20 text-xs font-mono font-semibold text-ethix-red">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ROBUST SOLUTIONS · SENIOR DIGITAL OPERATIONS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight leading-tight">
              Senior operators for the systems that grow the{' '}
              <span className="text-ethix-red">business.</span>
            </h2>

            <p className="text-base sm:text-lg text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
              We manage and engineer your complete digital stack—from intelligent AI agents and CRM integrations to high-performance web applications and ongoing technical support.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-ethix-charcoal-900 dark:bg-white dark:text-ethix-charcoal-900 px-5 py-3 rounded-full hover:bg-ethix-red dark:hover:bg-ethix-red dark:hover:text-white transition-all group self-start md:self-auto shrink-0 shadow-subtle"
          >
            <span>Explore Full 22 Services</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 8-Card Grid matching Screenshot 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group relative p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle top-right red glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-ethix-red/0 group-hover:bg-ethix-red/10 rounded-full blur-2xl transition-all duration-300 pointer-events-none" />

              <div>
                {/* Icon & Badge Header */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-ethix-ivory-100 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10 group-hover:scale-105 group-hover:border-ethix-red/30 transition-all duration-200">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400 bg-ethix-ivory-50 dark:bg-white/5 px-2.5 py-1 rounded-md border border-ethix-charcoal-200/50 dark:border-white/5">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0F1012] dark:text-[#F4F4F6] mb-3 group-hover:text-ethix-red transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action arrow */}
              <div className="pt-6 mt-6 border-t border-ethix-charcoal-100 dark:border-white/10 flex items-center justify-between text-xs font-bold text-ethix-charcoal-800 dark:text-ethix-charcoal-200 group-hover:text-ethix-red transition-colors">
                <span>Deploy capability</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
