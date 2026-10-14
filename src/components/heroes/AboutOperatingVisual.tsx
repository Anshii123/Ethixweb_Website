import React from 'react';
import { Globe2, Users, Cpu, ShieldCheck, Zap } from 'lucide-react';

export const AboutOperatingVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none">
      {/* Background Frame with Subtle Perspective */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0F1012] border border-ethix-charcoal-800 dark:border-white/10 shadow-elevated">
        {/* Real Engineering Studio Imagery */}
        <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
          <img
            src="/images/studio-team.webp"
            alt="Ethixweb senior technical architects collaborating on digital operations"
            width={500}
            height={320}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1012] via-[#0F1012]/30 to-transparent" />
        </div>

        {/* Floating Strategic Pillars Overlay */}
        <div className="p-5 sm:p-6 bg-[#0F1012] text-white space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-ethix-brass" />
              <span className="text-xs font-mono font-bold tracking-wide uppercase">
                Ethixweb LLC Operating System
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Dual-Hub Active
            </span>
          </div>

          {/* 4 Connected Operational Pillars */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Users className="w-3.5 h-3.5 text-ethix-red" />
                <span>Senior Led</span>
              </div>
              <p className="text-[11px] text-ethix-charcoal-400 leading-tight">
                Zero account-manager telephone games
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Zap className="w-3.5 h-3.5 text-ethix-brass" />
                <span>Velocity</span>
              </div>
              <p className="text-[11px] text-ethix-charcoal-400 leading-tight">
                2 to 4 week milestone sprint delivery
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Commercial ROI</span>
              </div>
              <p className="text-[11px] text-ethix-charcoal-400 leading-tight">
                Engineered for qualified revenue pipeline
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open Standards</span>
              </div>
              <p className="text-[11px] text-ethix-charcoal-400 leading-tight">
                Strict TypeScript, Vite & WCAG AA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
