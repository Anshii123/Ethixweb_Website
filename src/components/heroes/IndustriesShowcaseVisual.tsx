import React, { useState } from 'react';
import {
  Wrench,
  Compass,
  ShoppingBag,
  Stethoscope,
  Briefcase,
  Shield,
} from 'lucide-react';

interface SectorItem {
  id: string;
  name: string;
  type: 'verified' | 'strategic';
  tag: string;
  clientRef?: string;
  metric: string;
  icon: React.ReactNode;
  description: string;
}

export const IndustriesShowcaseVisual: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('hvac');

  const sectors: SectorItem[] = [
    {
      id: 'hvac',
      name: 'HVAC, Trenchless & Plumbing Trades',
      type: 'verified',
      tag: 'Verified Client Sector',
      clientRef: 'All Phase Plumbing & Gary’s Pipelining',
      metric: '+140% Qualified Inbound Calls',
      icon: <Wrench className="w-4 h-4 text-ethix-red" />,
      description: 'Emergency booking dispatch, Google LSA Guaranteed badge, and sub-second mobile load.',
    },
    {
      id: 'charter',
      name: 'Charter Marine & Experiential Services',
      type: 'verified',
      tag: 'Verified Client Sector',
      clientRef: 'Catching Chrome Guide Service',
      metric: '0 Double Bookings & Automated Deposits',
      icon: <Compass className="w-4 h-4 text-ethix-brass" />,
      description: 'Direct calendar synchronization, Stripe deposit collection, and weather-aware booking policies.',
    },
    {
      id: 'd2c',
      name: 'Direct-to-Consumer & Modern E-Commerce',
      type: 'strategic',
      tag: 'Strategic Framework · India & Global',
      metric: '<1.2s Edge Checkout Flow',
      icon: <ShoppingBag className="w-4 h-4 text-emerald-500" />,
      description: 'Headless Shopify/Next.js stores built for extreme 4G/5G mobile conversions and zero cart drop-offs.',
    },
    {
      id: 'health',
      name: 'Specialty Healthcare & Diagnostic Clinics',
      type: 'strategic',
      tag: 'Strategic Framework · High Trust',
      metric: '100% HIPAA/Privacy Compliance',
      icon: <Stethoscope className="w-4 h-4 text-blue-500" />,
      description: 'Doctor profiles, accessible online consultation intake, and seamless patient triage.',
    },
    {
      id: 'b2b',
      name: 'B2B Professional Services & SaaS',
      type: 'strategic',
      tag: 'Strategic Framework · Enterprise',
      metric: '3.2x Demo Request Velocity',
      icon: <Briefcase className="w-4 h-4 text-purple-500" />,
      description: 'High-converting interactive ROI calculators, case studies, and bi-directional CRM routing.',
    },
  ];

  const current = sectors.find((s) => s.id === selectedId) || sectors[0];

  return (
    <div className="relative w-full max-w-[500px] mx-auto p-5 sm:p-7 rounded-3xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-premium overflow-hidden space-y-5 select-none">
      {/* Header bar of visual stage */}
      <div className="flex items-center justify-between pb-3 border-b border-ethix-charcoal-200/60 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-ethix-red animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
            Sector Matrix
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
            Verified Proof
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
            Frameworks
          </span>
        </div>
      </div>

      {/* Interactive Sector Selector Stack */}
      <div className="space-y-2">
        {sectors.map((s) => {
          const isSelected = selectedId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedId(s.id)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-white dark:bg-[#1E2026] border-ethix-red shadow-md scale-[1.02]'
                  : 'bg-white/70 dark:bg-white/[0.03] border-ethix-charcoal-200/60 dark:border-white/10 hover:border-ethix-charcoal-300 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`p-1.5 rounded-xl shrink-0 ${
                    isSelected ? 'bg-ethix-red/10' : 'bg-ethix-charcoal-100 dark:bg-white/5'
                  }`}
                >
                  {s.icon}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-[#0F1012] dark:text-white truncate">
                    {s.name}
                  </div>
                  <div className="text-[10px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                    {s.tag}
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right pl-2">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    s.type === 'verified'
                      ? 'bg-ethix-red/10 text-ethix-red'
                      : 'bg-ethix-brass/10 text-ethix-brass'
                  }`}
                >
                  {s.type === 'verified' ? 'Verified Client' : 'Framework'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Deep-Dive Feature Card for Selected Sector */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle space-y-2 animate-fade-in">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-ethix-brass font-bold flex items-center gap-1">
            <Shield className="w-3 h-3" />
            {current.clientRef ? `Documented: ${current.clientRef}` : 'Operational Strategy'}
          </span>
          <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {current.metric}
          </span>
        </div>
        <p className="text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
          {current.description}
        </p>
      </div>
    </div>
  );
};
