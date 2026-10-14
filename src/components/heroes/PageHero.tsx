import React from 'react';

interface PageHeroProps {
  badge: string;
  badgeIcon?: React.ReactNode;
  title: string | React.ReactNode;
  description: string;
  actions?: React.ReactNode;
  visual: React.ReactNode;
  metaInfo?: React.ReactNode;
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  badgeIcon,
  title,
  description,
  actions,
  visual,
  metaInfo,
  className = '',
}) => {
  return (
    <section
      className={`relative overflow-hidden border-b border-ethix-charcoal-200/70 dark:border-white/10 bg-white dark:bg-[#101114] py-16 sm:py-20 lg:py-24 transition-colors duration-200 ${className}`}
    >
      {/* Background Subtle Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[500px] h-[500px] bg-ethix-red/5 dark:bg-ethix-red/10 rounded-full blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 w-[350px] h-[350px] bg-ethix-brass/5 dark:bg-ethix-brass/10 rounded-full blur-[100px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Subtitle & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ethix-red/10 dark:bg-ethix-red/20 border border-ethix-red/20 text-ethix-red text-xs font-mono font-bold tracking-wide">
              {badgeIcon ? badgeIcon : <span className="w-1.5 h-1.5 rounded-full bg-ethix-red animate-pulse" />}
              <span>{badge}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F1012] dark:text-[#F4F4F6] leading-[1.12]">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed max-w-xl">
                {description}
              </p>
            </div>

            {actions && <div className="flex flex-wrap items-center gap-4 pt-2">{actions}</div>}

            {metaInfo && (
              <div className="pt-4 border-t border-ethix-charcoal-100 dark:border-white/10 text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                {metaInfo}
              </div>
            )}
          </div>

          {/* Right Column: Dedicated Visual Stage */}
          <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-xl lg:max-w-none">{visual}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
