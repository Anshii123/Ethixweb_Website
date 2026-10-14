import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, Zap, Laptop, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveGlobe } from './InteractiveGlobe';

interface HubTime {
  id: string;
  name: string;
  timeZone: string;
  time: string;
}

export const GlobalNetwork: React.FC = () => {
  // Live continuous real-time clocks for all global hubs
  const [hubTimes, setHubTimes] = useState<{ [key: string]: string }>({
    india: '',
    seattle: '',
    utah: '',
    newyork: '',
    canada: '',
    uk: '',
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const formatTime = (timeZone: string) => {
        try {
          return new Intl.DateTimeFormat('en-US', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }).format(now);
        } catch {
          return now.toLocaleTimeString('en-US');
        }
      };

      setHubTimes({
        india: formatTime('Asia/Kolkata'),
        seattle: formatTime('America/Los_Angeles'),
        utah: formatTime('America/Denver'),
        newyork: formatTime('America/New_York'),
        canada: formatTime('America/Toronto'),
        uk: formatTime('Europe/London'),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const liveTickerHubs: HubTime[] = [
    { id: 'india', name: 'India Hub', timeZone: 'Asia/Kolkata', time: hubTimes.india },
    { id: 'seattle', name: 'Seattle', timeZone: 'America/Los_Angeles', time: hubTimes.seattle },
    { id: 'utah', name: 'Utah', timeZone: 'America/Denver', time: hubTimes.utah },
    { id: 'newyork', name: 'New York', timeZone: 'America/New_York', time: hubTimes.newyork },
    { id: 'canada', name: 'Canada', timeZone: 'America/Toronto', time: hubTimes.canada },
    { id: 'uk', name: 'UK', timeZone: 'Europe/London', time: hubTimes.uk },
  ];

  const networkNodes = [
    {
      city: 'Kent & Seattle, WA',
      region: 'United States',
      role: 'Global Headquarters & Strategy',
      timezone: 'PST / PDT',
      time: hubTimes.seattle,
      status: 'Active Command',
    },
    {
      city: 'New York & Utah',
      region: 'United States',
      role: 'Client Success & Media Strategy',
      timezone: 'EST / MST',
      time: hubTimes.newyork,
      status: 'Active Operations',
    },
    {
      city: 'London & UK / Canada',
      region: 'International',
      role: 'Cross-Border Delivery',
      timezone: 'GMT / BST',
      time: hubTimes.uk,
      status: 'Active Operations',
    },
    {
      city: 'Bengaluru / NCR',
      region: 'India Operations',
      role: 'Core Engineering & Tech Operations',
      timezone: 'IST (UTC+5:30)',
      time: hubTimes.india,
      status: 'Live Continuous Hub',
      highlight: true,
    },
  ];

  const advantages = [
    {
      icon: <Clock className="w-5 h-5 text-ethix-red" />,
      title: '24/7 Continuous Technical Delivery',
      description:
        'With operational engineering teams in India working in concert with US headquarters, updates, bug patches, and sprint deliverables progress continuously across time zones.',
    },
    {
      icon: <Zap className="w-5 h-5 text-ethix-brass" />,
      title: 'Mobile-First for Real-World Bandwidth',
      description:
        'Engineered for extreme performance. Whether on 5G fiber in Seattle or variable cellular connections across India, our code delivers sub-second loads and zero layout shifts.',
    },
    {
      icon: <Laptop className="w-5 h-5 text-emerald-500" />,
      title: 'Direct Senior Engineering Access',
      description:
        'Clients communicate directly with the engineers and architects responsible for their codebase. No layers of non-technical project managers or outsourced telephone games.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
      title: 'US Enterprise Standards & Compliance',
      description:
        'Strict confidentiality, robust NDA frameworks, WCAG AA accessibility compliance, and secure data handling using modern cloud infrastructure and MongoDB Atlas.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] dark:bg-[#0C0D10] border-b border-ethix-charcoal-200/70 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
              Global Operations Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight leading-tight">
              Built for fast-moving teams across time zones.
            </h2>
            <p className="text-base text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
              Seattle, Utah, New York, Canada, the United Kingdom, and India stay connected through one responsive digital operations layer.
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-ethix-charcoal-900 dark:text-white hover:text-ethix-red dark:hover:text-ethix-red transition-colors group self-start md:self-auto"
          >
            <span>Learn About Our Operating Model</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Live Continuous Timezone Ticker Strip */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-12">
          {liveTickerHubs.map((hub) => (
            <div
              key={hub.id}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-200 text-xs font-mono shadow-subtle ${
                hub.id === 'india'
                  ? 'bg-ethix-red/5 dark:bg-ethix-red/10 border-ethix-red/30 text-ethix-charcoal-900 dark:text-white'
                  : 'bg-white dark:bg-[#14161B] border-ethix-charcoal-200/80 dark:border-white/10 text-ethix-charcoal-800 dark:text-ethix-charcoal-200'
              }`}
            >
              <span className="text-ethix-red font-bold animate-pulse">⚡</span>
              <span className="font-semibold text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
                {hub.name}
              </span>
              <span className="font-bold text-[#0F1012] dark:text-[#F4F4F6] tabular-nums tracking-tight">
                {hub.time || '--:--:--'}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive 3D Dotted Globe with Drag to Rotate & 4-Metric Strip */}
        <InteractiveGlobe />

        {/* Live Network Grid Cards with Real-Time Seconds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {networkNodes.map((node, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                node.highlight
                  ? 'bg-white dark:bg-[#14161B] border-ethix-red/40 dark:border-ethix-red/50 shadow-premium relative overflow-hidden'
                  : 'bg-white dark:bg-[#101114] border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle'
              }`}
            >
              {node.highlight && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-ethix-red/10 rounded-full blur-2xl pointer-events-none" />
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                    {node.region}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {node.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0F1012] dark:text-[#F4F4F6] mb-1">
                  {node.city}
                </h3>
                <p className="text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-400 mb-6">
                  {node.role}
                </p>
              </div>

              <div className="pt-4 border-t border-ethix-charcoal-200/60 dark:border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                  {node.timezone}
                </span>
                <span className="text-sm font-mono font-bold text-[#0F1012] dark:text-[#F4F4F6] tabular-nums">
                  {node.time || '--:--:--'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Operational Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-ethix-ivory-100 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10">
                {adv.icon}
              </div>
              <h3 className="text-base font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                {adv.title}
              </h3>
              <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
