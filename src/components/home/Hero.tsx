import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Clock, Zap } from 'lucide-react';
import { DigitalSculpture } from './DigitalSculpture';

export const Hero: React.FC = () => {
  // Magnetic CTA state
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Detect fine pointer devices (desktop mouse)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFinePointer(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Magnetic CTA Handler
  const handleMagneticMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isFinePointer) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = Math.max(-4, Math.min(4, (e.clientX - centerX) * 0.15));
      const dy = Math.max(-4, Math.min(4, (e.clientY - centerY) * 0.15));
      setMagneticOffset({ x: dx, y: dy });
    },
    [isFinePointer]
  );

  const handleMagneticLeave = useCallback(() => {
    setMagneticOffset({ x: 0, y: 0 });
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-18 md:pt-16 md:pb-22 border-b border-ethix-charcoal-200/70 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0C0D10] transition-colors duration-200">
      {/* Subtle ambient lighting for depth */}
      <div className="absolute top-0 right-1/4 -mt-20 w-[30rem] h-[30rem] bg-ethix-red/5 dark:bg-ethix-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-24 w-96 h-96 bg-ethix-brass/5 dark:bg-ethix-brass/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: High-Impact Kinetic Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-ethix-charcoal-200/80 dark:border-white/10 text-xs font-semibold text-ethix-charcoal-800 dark:text-ethix-charcoal-200 shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-ethix-red animate-pulse" />
              <span>Senior Digital Operations Team</span>
              <span className="text-ethix-charcoal-400 dark:text-ethix-charcoal-600">|</span>
              <span className="text-ethix-charcoal-600 dark:text-ethix-charcoal-400 font-normal">Global Reach · India Hub</span>
            </div>

            {/* Kinetic Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F1012] dark:text-[#F4F4F6] leading-[1.08]">
              <span className="block overflow-hidden pb-1">
                <span className="inline-block animate-hero-line-1">
                  We run the tech.
                </span>
              </span>
              <span className="block overflow-hidden mt-1 sm:mt-2 pb-1">
                <span className="inline-block animate-hero-line-2 text-gradient-red font-extrabold">
                  You run the business.
                </span>
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="animate-hero-fade-1 text-base sm:text-lg text-ethix-charcoal-600 dark:text-ethix-charcoal-300 max-w-2xl leading-relaxed">
              We manage your complete digital operation — from AI booking agents and CRM integrations to high-velocity websites, SEO, advertising, and ongoing technical support.
            </p>

            {/* CTA Buttons */}
            <div className="animate-hero-fade-2 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/contact"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                style={{
                  transform: `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)`,
                  transition: magneticOffset.x === 0 ? 'transform 0.3s ease-out' : 'none',
                }}
                className="inline-flex items-center justify-center gap-2 bg-ethix-red hover:bg-ethix-red-hover text-white px-7 py-4 rounded-xl font-bold text-sm tracking-wide shadow-subtle hover:shadow-glow-red transition-colors duration-150 group active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ethix-red focus-visible:ring-offset-2 will-change-transform"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                to="/our-work"
                className="inline-flex items-center justify-center gap-2 border border-ethix-charcoal-300 dark:border-white/20 hover:border-ethix-charcoal-900 dark:hover:border-white bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-ethix-charcoal-900 dark:text-white px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ethix-red"
              >
                <span>See Our Work</span>
              </Link>
            </div>

            {/* Credibility checkpoints */}
            <div className="animate-hero-fade-3 pt-5 border-t border-ethix-charcoal-200/80 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium text-ethix-charcoal-800 dark:text-ethix-charcoal-200">Senior-Led Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium text-ethix-charcoal-800 dark:text-ethix-charcoal-200">2-4 Wks Typical Launch</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium text-ethix-charcoal-800 dark:text-ethix-charcoal-200">24/7 Global Availability</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature 3D Digital Sculpture Visual Stage */}
          <div className="lg:col-span-5 animate-hero-visual-reveal flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none flex items-center justify-center">
              {/* Soft ambient radial backdrop to highlight the 3D sculpture depth */}
              <div className="absolute inset-0 bg-radial-gradient from-ethix-red/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* The Interactive 3D WebGL Digital Sculpture */}
              <DigitalSculpture />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
