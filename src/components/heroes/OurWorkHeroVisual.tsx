import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProjectSlide {
  id: string;
  client: string;
  category: string;
  tagline: string;
  metric: string;
  image: string;
  year: string;
}

export const OurWorkHeroVisual: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects: ProjectSlide[] = [
    {
      id: 'all-phase-plumbing',
      client: 'All Phase Plumbing',
      category: 'Web Design & SEO',
      tagline: 'From invisible online to fully booked in 90 days',
      metric: '+140% Qualified Inbound Calls',
      image: '/images/case-studies/all-phase-plumbing/after-screenshot.webp',
      year: '2026',
    },
    {
      id: 'preventive-home-solutions',
      client: 'Preventive Home Solutions',
      category: 'Brand & UX Design',
      tagline: 'High-trust inspection bookings across all device form-factors',
      metric: '-65% Mobile Bounce Rate',
      image: '/images/case-studies/preventive-home-solutions/after-screenshot.webp',
      year: '2026',
    },
    {
      id: 'garys-pipeline',
      client: "Gary's Pipelining & Drain",
      category: 'Paid Media & SEO',
      tagline: 'High-ticket trenchless search traffic converted into commercial contracts',
      metric: '3.2x Pipeline Value Lift',
      image: '/images/case-studies/garys-pipeline/after-screenshot.webp',
      year: '2026',
    },
    {
      id: 'catching-chrome',
      client: 'Catching Chrome Guide',
      category: 'Web & Booking System',
      tagline: 'Zero double bookings with automated real-time calendar reservations',
      metric: '0 Double Bookings',
      image: '/images/case-studies/catching-chrome/after-screenshot.webp',
      year: '2026',
    },
  ];

  // Auto cycle previews smoothly every 5 seconds if idle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const current = projects[activeIndex];

  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none">
      {/* Visual Container with Overlapping Depth Frame */}
      <div className="relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden bg-[linear-gradient(135deg,#1E080A_0%,#120405_100%)] border border-ethix-charcoal-800 dark:border-white/10 shadow-elevated group">
        {/* Layered Screenshots */}
        {projects.map((proj, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <div
              key={proj.id}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isCurrent ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
            >
              <img
                src={proj.image}
                alt={proj.client}
                className="w-full h-full object-cover object-top filter brightness-[0.92]"
              />
              {/* Gradient Vignette Overlays for Maximum Text Legibility */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>
          );
        })}

        {/* Top Floating Badge Bar */}
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-ethix-red animate-pulse" />
            <span>{current.category}</span>
          </div>

          <div className="flex items-center gap-1">
            {projects.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                aria-label={`Show ${projects[dotIdx].client}`}
                onClick={() => setActiveIndex(dotIdx)}
                className={`pointer-events-auto h-2 rounded-full transition-all duration-300 ${
                  dotIdx === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/35 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Interactive Project Detail Overlay Box */}
        <div className="absolute bottom-4 inset-x-4 z-20 p-4 sm:p-5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white space-y-2.5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-ethix-brass font-bold block">
                Verified Commercial Milestone
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {current.client}
              </h3>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                {current.metric}
              </span>
            </div>
          </div>

          <p className="text-xs text-white/80 line-clamp-1 leading-relaxed">
            {current.tagline}
          </p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-white/60">
              Discipline: {current.category}
            </span>
            <a
              href="#case-studies-grid"
              className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-ethix-red transition-colors"
            >
              <span>Explore Case Studies</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
