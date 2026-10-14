import React from 'react';
import { Globe, Bot, GitBranch, LineChart } from 'lucide-react';

interface SculptureFallbackProps {
  showBadges?: boolean;
  className?: string;
}

// --- DYNAMIC SVG/CSS SCULPTURAL FALLBACK ---
// Renders smoothly with continuous hardware-accelerated animations and mobile-responsive text badges
export const SculptureFallback: React.FC<SculptureFallbackProps> = ({
  showBadges = true,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none overflow-visible touch-pan-y ${className}`}
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] max-h-[420px] opacity-90 dark:opacity-85 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="fallbackCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#DC2626" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ringBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" />
            <stop offset="50%" stopColor="#E6C875" />
            <stop offset="100%" stopColor="#997733" />
          </linearGradient>
          <linearGradient id="glassFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ambient Glow with gentle breathing */}
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="url(#fallbackCoreGlow)"
          className="animate-pulse-glow"
          style={{ transformOrigin: '200px 200px' }}
        />

        {/* Orbital Titanium Ring - Smooth Continuous Clockwise Rotation */}
        <g
          className="animate-spin-slow"
          style={{ transformOrigin: '200px 200px' }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="150"
            ry="65"
            stroke="currentColor"
            className="text-ethix-charcoal-400 dark:text-white/30"
            strokeWidth="1.5"
            transform="rotate(-28 200 200)"
          />
        </g>

        {/* Orbital Champagne Brass Ring - Smooth Continuous Counter-Rotation */}
        <g
          className="animate-spin-reverse"
          style={{ transformOrigin: '200px 200px' }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="165"
            ry="75"
            stroke="url(#ringBrass)"
            strokeWidth="2"
            transform="rotate(42 200 200)"
          />
        </g>

        {/* Connecting Spline Paths with Active Energy Flow */}
        <path
          d="M 60 120 Q 140 160 200 200"
          stroke="#DC2626"
          strokeWidth="1.5"
          className="animate-stroke-pulse"
          strokeOpacity="0.75"
        />
        <path
          d="M 330 110 Q 260 150 200 200"
          stroke="#C5A059"
          strokeWidth="1.5"
          className="animate-stroke-pulse"
          strokeOpacity="0.75"
        />
        <path
          d="M 80 290 Q 150 250 200 200"
          stroke="#10B981"
          strokeWidth="1.5"
          className="animate-stroke-pulse"
          strokeOpacity="0.65"
        />
        <path
          d="M 320 280 Q 250 240 200 200"
          stroke="#3B82F6"
          strokeWidth="1.5"
          className="animate-stroke-pulse"
          strokeOpacity="0.65"
        />

        {/* Central Crystalline Polyhedron Core - Floating & Breathing */}
        <g
          className="animate-float-slow"
          style={{ transformOrigin: '200px 200px' }}
        >
          {/* Outer Glass Faceted Diamond */}
          <polygon
            points="200,110 260,165 240,245 160,245 140,165"
            fill="url(#glassFacet)"
            stroke="currentColor"
            className="text-ethix-charcoal-400/60 dark:text-white/40"
            strokeWidth="1.5"
          />
          <line
            x1="200"
            y1="110"
            x2="200"
            y2="290"
            stroke="currentColor"
            className="text-white/50"
            strokeWidth="1"
          />
          <line
            x1="140"
            y1="165"
            x2="260"
            y2="165"
            stroke="currentColor"
            className="text-white/50"
            strokeWidth="1"
          />
          <line
            x1="160"
            y1="245"
            x2="240"
            y2="245"
            stroke="currentColor"
            className="text-white/50"
            strokeWidth="1"
          />

          {/* Inner Metallic Octahedron */}
          <polygon
            points="200,150 235,185 200,250 165,185"
            fill="url(#ringBrass)"
            opacity="0.9"
          />
        </g>

        {/* Center Glowing Seed - Continuous Pulse */}
        <g
          className="animate-pulse"
          style={{ transformOrigin: '200px 200px' }}
        >
          <circle cx="200" cy="200" r="14" fill="#DC2626" />
          <circle cx="200" cy="200" r="6" fill="#FFFFFF" />
        </g>

        {/* Satellite Nodes with micro-pulse */}
        <g className="animate-pulse" style={{ animationDuration: '3s' }}>
          <circle cx="60" cy="120" r="9" fill="#DC2626" />
          <circle cx="330" cy="110" r="9" fill="#C5A059" />
          <circle cx="80" cy="290" r="8" fill="#10B981" />
          <circle cx="320" cy="280" r="8" fill="#3B82F6" />
        </g>
      </svg>

      {/* Responsive Architectural Service Text Badges (Staggered vertically on mobile to eliminate overlap) */}
      {showBadges && (
        <>
          {/* Top-Left: Website Architecture */}
          <div className="absolute top-1 sm:top-2 left-1 sm:-left-3 z-20 pointer-events-none flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#14161C]/95 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-1 max-w-[170px] xs:max-w-none">
            <Globe className="w-3.5 h-3.5 text-ethix-red shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6] truncate">
              Website Architecture
            </span>
            <span className="hidden xs:inline-block text-[8px] sm:text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
              98 Score
            </span>
          </div>

          {/* Top-Right: AI Booking Agents */}
          <div className="absolute top-12 sm:top-4 right-1 sm:-right-3 z-20 pointer-events-none flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#14161C]/95 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-2 max-w-[170px] xs:max-w-none">
            <Bot className="w-3.5 h-3.5 text-ethix-brass shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6] truncate">
              AI Booking Agents
            </span>
            <span className="hidden xs:inline-block text-[8px] sm:text-[9px] font-mono text-ethix-brass font-semibold bg-ethix-brass/10 px-1.5 py-0.5 rounded shrink-0">
              24/7 Active
            </span>
          </div>

          {/* Bottom-Left: CRM Pipelines */}
          <div className="absolute bottom-12 sm:bottom-4 left-1 sm:left-4 z-20 pointer-events-none flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#14161C]/95 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-3 max-w-[170px] xs:max-w-none">
            <GitBranch className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6] truncate">
              CRM Pipelines
            </span>
            <span className="hidden xs:inline-block text-[8px] sm:text-[9px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded shrink-0">
              Zero Leakage
            </span>
          </div>

          {/* Bottom-Right: Live Telemetry */}
          <div className="absolute bottom-1 sm:bottom-6 right-1 sm:right-4 z-20 pointer-events-none flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#14161C]/95 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-4 max-w-[170px] xs:max-w-none">
            <LineChart className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6] truncate">
              Live Telemetry
            </span>
            <span className="hidden xs:inline-block text-[8px] sm:text-[9px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded shrink-0">
              Real-Time
            </span>
          </div>
        </>
      )}
    </div>
  );
};
