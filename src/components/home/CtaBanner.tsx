import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#101114] relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#0F1012] dark:bg-[#16181E] text-white p-6 sm:p-12 md:p-16 border border-ethix-charcoal-700/80 dark:border-white/10 shadow-elevated overflow-hidden">
          {/* Decorative ambient gradients */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-ethix-red/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-ethix-brass/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
              Start Your Project
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to upgrade your tech stack with an accountable team?
            </h2>

            <p className="text-sm sm:text-base text-ethix-charcoal-300 leading-relaxed max-w-xl">
              Tell us about your digital operation, website, or AI automation goals. An Ethixweb senior engineer will review your project and provide a technical roadmap within 24 business hours.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ethix-red hover:bg-ethix-red-hover text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-subtle hover:shadow-glow-red transition-all duration-200 group active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-ethix-charcoal-600 hover:border-white text-white px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200"
              >
                <span>Browse All 22 Services</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-ethix-charcoal-800 flex flex-wrap items-center gap-6 text-xs text-ethix-charcoal-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NDA & Confidentiality Protected</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Guaranteed 24-Hour Technical Response</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Direct Senior Engineering Review</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
