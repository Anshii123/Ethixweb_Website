import React from 'react';

// --- PRECISE STATIC SVG/CSS SCULPTURAL FALLBACK ---
// Renders instantly to guarantee zero layout shifts before WebGL initializes
export const SculptureFallback: React.FC = () => {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full max-w-[420px] max-h-[420px] opacity-90 dark:opacity-80"
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

      {/* Ambient Glow */}
      <circle cx="200" cy="200" r="140" fill="url(#fallbackCoreGlow)" />

      {/* Orbital Titanium Ring */}
      <ellipse
        cx="200"
        cy="200"
        rx="150"
        ry="65"
        stroke="currentColor"
        className="text-ethix-charcoal-300 dark:text-white/20"
        strokeWidth="1.5"
        transform="rotate(-28 200 200)"
      />

      {/* Orbital Champagne Brass Ring */}
      <ellipse
        cx="200"
        cy="200"
        rx="165"
        ry="75"
        stroke="url(#ringBrass)"
        strokeWidth="2"
        transform="rotate(42 200 200)"
      />

      {/* Connecting Spline Paths */}
      <path
        d="M 60 120 Q 140 160 200 200"
        stroke="#DC2626"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeOpacity="0.5"
      />
      <path
        d="M 330 110 Q 260 150 200 200"
        stroke="#C5A059"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeOpacity="0.6"
      />
      <path
        d="M 80 290 Q 150 250 200 200"
        stroke="#10B981"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeOpacity="0.4"
      />
      <path
        d="M 320 280 Q 250 240 200 200"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeOpacity="0.4"
      />

      {/* Outer Glass Faceted Diamond */}
      <polygon
        points="200,110 260,165 240,245 160,245 140,165"
        fill="url(#glassFacet)"
        stroke="currentColor"
        className="text-ethix-charcoal-400/40 dark:text-white/30"
        strokeWidth="1.5"
      />
      <line x1="200" y1="110" x2="200" y2="290" stroke="currentColor" className="text-white/40" strokeWidth="1" />
      <line x1="140" y1="165" x2="260" y2="165" stroke="currentColor" className="text-white/40" strokeWidth="1" />
      <line x1="160" y1="245" x2="240" y2="245" stroke="currentColor" className="text-white/40" strokeWidth="1" />

      {/* Inner Metallic Octahedron */}
      <polygon
        points="200,150 235,185 200,250 165,185"
        fill="url(#ringBrass)"
        opacity="0.85"
      />

      {/* Center Glowing Seed */}
      <circle cx="200" cy="200" r="14" fill="#DC2626" />
      <circle cx="200" cy="200" r="6" fill="#FFFFFF" />

      {/* Satellite Nodes */}
      <circle cx="60" cy="120" r="9" fill="#DC2626" />
      <circle cx="330" cy="110" r="9" fill="#C5A059" />
      <circle cx="80" cy="290" r="8" fill="#10B981" />
      <circle cx="320" cy="280" r="8" fill="#3B82F6" />
    </svg>
  );
};
