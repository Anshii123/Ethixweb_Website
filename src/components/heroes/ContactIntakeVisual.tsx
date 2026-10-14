import React from 'react';
import { Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const ContactIntakeVisual: React.FC = () => {
  const roadmapSteps = [
    {
      step: '01',
      title: 'Architectural Audit',
      time: 'Within 24 Hours',
      desc: 'Technical review of current bottlenecks, tech stack, and milestone scope.',
      status: 'Active',
    },
    {
      step: '02',
      title: 'Senior Engineer Call',
      time: '30-Min Strategy',
      desc: 'Direct consultation with the systems architect who will build your project.',
      status: 'Ready',
    },
    {
      step: '03',
      title: 'Fixed Milestone Scope',
      time: 'Zero Hidden Fees',
      desc: 'Transparent pricing, sprint schedule, and guaranteed response SLAs.',
      status: 'Ready',
    },
    {
      step: '04',
      title: 'Live Sprint Execution',
      time: '2-4 Week Delivery',
      desc: 'Private Git repository, continuous preview links, and 24/7 dual-hub velocity.',
      status: 'Ready',
    },
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none space-y-4">
      <div className="p-6 rounded-3xl bg-[#0F1012] border border-ethix-charcoal-800 dark:border-white/10 shadow-elevated text-white space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ethix-red font-bold">
              Engineering Intake Desk
            </span>
            <div className="text-sm font-bold text-white">Project Onboarding Flow</div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            &lt; 1hr Response SLA
          </span>
        </div>

        {/* 4 Connected Milestone Roadmap Steps */}
        <div className="space-y-3">
          {roadmapSteps.map((s, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex flex-col items-center shrink-0">
                <span className="w-6 h-6 rounded-full bg-ethix-red/20 text-ethix-red border border-ethix-red/40 flex items-center justify-center font-mono text-xs font-bold">
                  {s.step}
                </span>
                {idx < roadmapSteps.length - 1 && (
                  <div className="w-0.5 h-6 bg-white/10 mt-1" />
                )}
              </div>

              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate">{s.title}</h4>
                  <span className="text-[10px] font-mono text-ethix-brass shrink-0">{s.time}</span>
                </div>
                <p className="text-[11px] text-ethix-charcoal-300 leading-snug">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Direct Line Badge */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-ethix-charcoal-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px]">Strict NDA & Confidentiality</span>
          </div>
          <a
            href="mailto:info@ethixweb.com"
            className="text-[11px] font-mono font-bold text-white hover:text-ethix-red transition-colors flex items-center gap-1"
          >
            <span>info@ethixweb.com</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
