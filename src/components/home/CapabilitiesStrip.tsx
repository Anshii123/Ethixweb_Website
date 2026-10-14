import React from 'react';
import { 
  Bot, 
  Code2, 
  Database, 
  Globe, 
  LineChart, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Workflow, 
  Zap 
} from 'lucide-react';

export const CapabilitiesStrip: React.FC = () => {
  const capabilities = [
    { label: 'AI Booking Agents', icon: <Bot className="w-3.5 h-3.5 text-ethix-red" /> },
    { label: 'Custom Web Applications', icon: <Code2 className="w-3.5 h-3.5 text-ethix-brass" /> },
    { label: 'Headless Architecture', icon: <Globe className="w-3.5 h-3.5 text-emerald-500" /> },
    { label: 'CRM & Pipeline Integrations', icon: <Workflow className="w-3.5 h-3.5 text-blue-500" /> },
    { label: 'Technical SEO & Programmatic Pages', icon: <TrendingUp className="w-3.5 h-3.5 text-purple-500" /> },
    { label: 'Google Ads & Meta Advertising', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> },
    { label: 'Live Analytics & Dashboards', icon: <LineChart className="w-3.5 h-3.5 text-cyan-500" /> },
    { label: '24/7 Operations & Maintenance', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> },
    { label: 'Sub-Second Page Performance', icon: <Zap className="w-3.5 h-3.5 text-ethix-red" /> },
    { label: 'MongoDB & API Engineering', icon: <Database className="w-3.5 h-3.5 text-indigo-500" /> },
  ];

  return (
    <div className="relative py-4 bg-white dark:bg-[#101114] border-b border-ethix-charcoal-200/70 dark:border-white/10 overflow-hidden select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-[#101114] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-[#101114] to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center gap-8 animate-marquee whitespace-nowrap will-change-transform hover:[animation-play-state:paused]"
        style={{
          width: 'max-content',
        }}
      >
        {/* Double array for seamless 50% translation infinite loop */}
        {[...capabilities, ...capabilities].map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ethix-ivory-50 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10 text-xs font-medium text-ethix-charcoal-800 dark:text-ethix-charcoal-200"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
