import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface HubLocation {
  name: string;
  country: string;
  lat: number;
  lng: number;
  color: string;
}

const HUBS: HubLocation[] = [
  { name: 'India Hub', country: 'India', lat: 12.9716, lng: 77.5946, color: '#DC2626' },
  { name: 'Seattle', country: 'USA', lat: 47.6062, lng: -122.3321, color: '#DC2626' },
  { name: 'Utah', country: 'USA', lat: 40.7608, lng: -111.891, color: '#C5A059' },
  { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.006, color: '#C5A059' },
  { name: 'Canada', country: 'Canada', lat: 43.6532, lng: -79.3832, color: '#3B82F6' },
  { name: 'London / UK', country: 'UK', lat: 51.5074, lng: -0.1278, color: '#10B981' },
];

const LIVE_ACTIVITIES = [
  { action: 'Code review', location: 'India' },
  { action: 'Vercel edge deployment', location: 'Kent, WA' },
  { action: 'API benchmark testing', location: 'Bengaluru' },
  { action: 'Client sprint sync', location: 'Seattle' },
  { action: 'Turnstile security check', location: 'New York' },
  { action: 'WhatsApp AI pipeline sync', location: 'India Hub' },
  { action: 'Automated QA suite', location: 'London' },
];

export const InteractiveGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [activeActivityIndex, setActiveActivityIndex] = useState(0);

  // Rotation angles
  const rotation = useRef({ x: 0.25, y: 1.4 });
  const velocity = useRef({ x: 0, y: 0.0035 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastInteractionTime = useRef(Date.now());

  // Cycle live network activities
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveActivityIndex((prev) => (prev + 1) % LIVE_ACTIVITIES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Pointer drag controls
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    lastInteractionTime.current = Date.now();
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMouse.current.x;
    const deltaY = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };

    rotation.current.y += deltaX * 0.007;
    rotation.current.x = Math.max(-0.9, Math.min(0.9, rotation.current.x + deltaY * 0.007));
    velocity.current = { x: deltaY * 0.002, y: deltaX * 0.002 };
    lastInteractionTime.current = Date.now();
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // Generate dotted sphere coordinates
    const DOTS: { x: number; y: number; z: number }[] = [];
    const numPoints = 850;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      DOTS.push({ x, y, z });
    }

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Auto-spin when idle
      if (!isDragging.current) {
        const timeSinceDrag = Date.now() - lastInteractionTime.current;
        if (timeSinceDrag > 600) {
          // Gently return to constant rotation velocity
          velocity.current.y = velocity.current.y * 0.95 + 0.0035 * 0.05;
          velocity.current.x = velocity.current.x * 0.95;
        }
        rotation.current.y += velocity.current.y;
        rotation.current.x += velocity.current.x;
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const globeRadius = Math.min(width, height) * (width < 640 ? 0.38 : 0.42);

      const cosY = Math.cos(rotation.current.y);
      const sinY = Math.sin(rotation.current.y);
      const cosX = Math.cos(rotation.current.x);
      const sinX = Math.sin(rotation.current.x);

      // Project 3D point with 2-axis rotation
      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const scale = 2.6 / (2.6 + z2 * 0.5);
        return {
          px: centerX + x1 * globeRadius * scale,
          py: centerY + y2 * globeRadius * scale,
          z: z2,
          scale,
        };
      };

      // Draw background ambient sphere glow
      const sphereGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        globeRadius * 0.2,
        centerX,
        centerY,
        globeRadius
      );
      if (theme === 'dark') {
        sphereGradient.addColorStop(0, 'rgba(220, 38, 38, 0.08)');
        sphereGradient.addColorStop(0.8, 'rgba(15, 16, 20, 0.95)');
        sphereGradient.addColorStop(1, 'rgba(20, 22, 28, 1)');
      } else {
        sphereGradient.addColorStop(0, 'rgba(220, 38, 38, 0.06)');
        sphereGradient.addColorStop(0.8, 'rgba(245, 243, 240, 0.95)');
        sphereGradient.addColorStop(1, 'rgba(235, 232, 226, 1)');
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      // Outer rim ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 16, 18, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw dots
      for (let i = 0; i < DOTS.length; i++) {
        const dot = DOTS[i];
        const p = project(dot.x, dot.y, dot.z);

        // Only draw front hemisphere and slight back bleed
        if (p.z > -0.2) {
          const alpha = Math.max(0.1, (p.z + 0.2) / 1.2);
          const isRed = (i % 7 === 0) || (i % 11 === 0);

          ctx.beginPath();
          ctx.arc(p.px, p.py, isRed ? 2.2 * p.scale : 1.3 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = isRed
            ? `rgba(220, 38, 38, ${alpha * 0.85})`
            : theme === 'dark'
            ? `rgba(220, 225, 235, ${alpha * 0.45})`
            : `rgba(25, 28, 32, ${alpha * 0.4})`;
          ctx.fill();
        }
      }

      // Project and draw Hub pins
      const projectedHubs: { hub: HubLocation; px: number; py: number; z: number }[] = [];

      HUBS.forEach((hub) => {
        const latRad = (hub.lat * Math.PI) / 180;
        const lngRad = (hub.lng * Math.PI) / 180;
        const x = Math.cos(latRad) * Math.sin(lngRad);
        const y = -Math.sin(latRad);
        const z = Math.cos(latRad) * Math.cos(lngRad);

        const p = project(x, y, z);
        if (p.z > -0.05) {
          projectedHubs.push({ hub, px: p.px, py: p.py, z: p.z });
        }
      });

      // Draw connecting red arcs between hubs
      for (let i = 0; i < projectedHubs.length; i++) {
        for (let j = i + 1; j < projectedHubs.length; j++) {
          const h1 = projectedHubs[i];
          const h2 = projectedHubs[j];

          if (h1.z > 0 && h2.z > 0) {
            ctx.beginPath();
            ctx.moveTo(h1.px, h1.py);
            // Quadratic curve bowing outward
            const midX = (h1.px + h2.px) / 2;
            const midY = (h1.py + h2.py) / 2 - 25;
            ctx.quadraticCurveTo(midX, midY, h2.px, h2.py);
            ctx.strokeStyle = 'rgba(220, 38, 38, 0.25)';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // 1. Draw all visible Hub Pins first
      projectedHubs.forEach(({ hub, px, py, z }) => {
        const pinAlpha = Math.max(0.2, (z + 0.1) / 1.1);

        // Ping wave
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${pinAlpha * 0.25})`;
        ctx.fill();

        // Pin core
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = hub.color;
        ctx.fill();

        // White center dot
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      // 2. Draw Hub Labels with multi-directional collision avoidance
      const isMobile = width < 640;
      const minZForLabel = isMobile ? 0.22 : 0.16;

      // Sort hubs facing front: India Hub first, then closest z to viewer
      const labelCandidates = projectedHubs
        .filter((h) => h.z > minZForLabel)
        .sort((a, b) => {
          if (a.hub.name === 'India Hub') return -1;
          if (b.hub.name === 'India Hub') return 1;
          return b.z - a.z;
        });

      const placedBoxes: { x1: number; y1: number; x2: number; y2: number }[] = [];
      const margin = isMobile ? 4 : 6;

      labelCandidates.forEach(({ hub, px, py }) => {
        ctx.font = isMobile ? 'bold 9px monospace' : 'bold 10px monospace';
        const label = hub.name;
        const textWidth = ctx.measureText(label).width;
        const pillW = isMobile ? Math.ceil(textWidth + 10) : Math.ceil(textWidth + 12);
        const pillH = isMobile ? 16 : 18;

        // Try diverse candidate placements around the pin
        const candidates = [
          { x: px + 7, y: py - pillH + 2 },             // Top-Right
          { x: px + 7, y: py + 4 },                     // Bottom-Right
          { x: px - pillW - 7, y: py - pillH + 2 },     // Top-Left
          { x: px - pillW - 7, y: py + 4 },             // Bottom-Left
          { x: Math.round(px - pillW / 2), y: py - pillH - 6 }, // Above Center
          { x: Math.round(px - pillW / 2), y: py + 8 },         // Below Center
          { x: px + 9, y: py - pillH - 6 },             // Staggered High Top-Right
          { x: px - pillW - 9, y: py - pillH - 6 },     // Staggered High Top-Left
          { x: px + 9, y: py + 8 },                     // Staggered Low Bottom-Right
          { x: px - pillW - 9, y: py + 8 },             // Staggered Low Bottom-Left
        ];

        // Find candidate that stays in canvas and doesn't collide with existing labels
        const chosen = candidates.find((cand) => {
          // Boundary check
          if (
            cand.x < 4 ||
            cand.y < 4 ||
            cand.x + pillW > width - 4 ||
            cand.y + pillH > height - 4
          ) {
            return false;
          }

          // Collision check against already placed labels
          const overlaps = placedBoxes.some((box) => {
            return !(
              cand.x + pillW + margin <= box.x1 ||
              cand.x - margin >= box.x2 ||
              cand.y + pillH + margin <= box.y1 ||
              cand.y - margin >= box.y2
            );
          });

          return !overlaps;
        });

        // Only draw if we found a non-colliding location
        if (chosen) {
          placedBoxes.push({
            x1: chosen.x,
            y1: chosen.y,
            x2: chosen.x + pillW,
            y2: chosen.y + pillH,
          });

          // Pill Background
          ctx.fillStyle =
            theme === 'dark' ? 'rgba(18, 20, 26, 0.92)' : 'rgba(255, 255, 255, 0.95)';
          ctx.strokeStyle =
            theme === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(15, 16, 18, 0.18)';
          ctx.lineWidth = 1;

          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(chosen.x, chosen.y, pillW, pillH, 5);
          } else {
            ctx.rect(chosen.x, chosen.y, pillW, pillH);
          }
          ctx.fill();
          ctx.stroke();

          // Pill Text
          ctx.fillStyle = theme === 'dark' ? '#F4F4F6' : '#0F1012';
          ctx.fillText(
            label,
            chosen.x + (isMobile ? 5 : 6),
            chosen.y + (isMobile ? 11.5 : 12.5)
          );
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [theme]);

  const currentActivity = LIVE_ACTIVITIES[activeActivityIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 sm:my-12 flex flex-col items-center">
      {/* Live Network Activity: On mobile, neatly positioned above the globe to never cover the sphere */}
      <div className="sm:hidden mb-3 w-full max-w-xs px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-[#14161B]/95 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle space-y-1">
        <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
          <span className="w-1.5 h-1.5 rounded-full bg-ethix-red animate-ping" />
          <span>LIVE NETWORK ACTIVITY</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="font-bold text-[#0F1012] dark:text-[#F4F4F6] truncate">
            {currentActivity.action}
          </span>
          <span className="font-mono font-semibold text-ethix-red text-[11px] shrink-0">
            {currentActivity.location}
          </span>
        </div>
      </div>

      {/* 3D Canvas Box */}
      <div
        className="relative w-full h-[320px] xs:h-[350px] sm:h-[460px] md:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Live Network Activity Floating Card (Desktop only, positioned in spacious top-right corner) */}
        <div className="hidden sm:block absolute top-4 right-4 sm:right-8 z-20 pointer-events-none">
          <div className="px-4 py-3 rounded-2xl bg-white/90 dark:bg-[#14161B]/90 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-premium min-w-[210px] space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
              <span className="w-2 h-2 rounded-full bg-ethix-red animate-ping" />
              <span>LIVE NETWORK ACTIVITY</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="font-bold text-[#0F1012] dark:text-[#F4F4F6] truncate">
                {currentActivity.action}
              </span>
              <span className="font-mono font-semibold text-ethix-red text-[11px] shrink-0">
                {currentActivity.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Drag to rotate caption (Screenshot 1) */}
      <div className="mt-2 text-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-ethix-charcoal-500 dark:text-ethix-charcoal-300">
          DRAG TO ROTATE · AUTO-SPINS WHEN IDLE
        </span>
      </div>

      {/* 4-Card Metric Strip (Screenshot 1 bottom) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-10">
        {/* Card 1 */}
        <div className="relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle overflow-hidden group">
          {/* Subtle radar/spiderweb grid watermark */}
          <div className="absolute right-0 bottom-0 w-28 h-28 pointer-events-none opacity-20 dark:opacity-10">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-ethix-red w-full h-full">
              <circle cx="100" cy="100" r="20" strokeWidth="1" />
              <circle cx="100" cy="100" r="45" strokeWidth="1" />
              <circle cx="100" cy="100" r="70" strokeWidth="1" />
              <circle cx="100" cy="100" r="95" strokeWidth="1" />
              <line x1="0" y1="100" x2="100" y2="100" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="100" strokeWidth="1" />
              <line x1="29" y1="29" x2="100" y2="100" strokeWidth="1" />
            </svg>
          </div>

          <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ethix-red tracking-tight mb-2">
            50+
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-ethix-charcoal-600 dark:text-ethix-charcoal-400 font-semibold">
            PROJECTS DELIVERED
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-28 h-28 pointer-events-none opacity-20 dark:opacity-10">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-ethix-brass w-full h-full">
              <circle cx="100" cy="100" r="20" strokeWidth="1" />
              <circle cx="100" cy="100" r="45" strokeWidth="1" />
              <circle cx="100" cy="100" r="70" strokeWidth="1" />
              <circle cx="100" cy="100" r="95" strokeWidth="1" />
              <line x1="0" y1="100" x2="100" y2="100" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="100" strokeWidth="1" />
              <line x1="29" y1="29" x2="100" y2="100" strokeWidth="1" />
            </svg>
          </div>

          <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight mb-2">
            &lt;1h
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-ethix-charcoal-600 dark:text-ethix-charcoal-400 font-semibold">
            AVG. RESPONSE TIME
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-28 h-28 pointer-events-none opacity-20 dark:opacity-10">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-emerald-500 w-full h-full">
              <circle cx="100" cy="100" r="20" strokeWidth="1" />
              <circle cx="100" cy="100" r="45" strokeWidth="1" />
              <circle cx="100" cy="100" r="70" strokeWidth="1" />
              <circle cx="100" cy="100" r="95" strokeWidth="1" />
              <line x1="0" y1="100" x2="100" y2="100" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="100" strokeWidth="1" />
              <line x1="29" y1="29" x2="100" y2="100" strokeWidth="1" />
            </svg>
          </div>

          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight mb-2 pt-1">
            US First
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-ethix-charcoal-600 dark:text-ethix-charcoal-400 font-semibold">
            OPERATIONS FOCUS
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-28 h-28 pointer-events-none opacity-20 dark:opacity-10">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-ethix-red w-full h-full">
              <circle cx="100" cy="100" r="20" strokeWidth="1" />
              <circle cx="100" cy="100" r="45" strokeWidth="1" />
              <circle cx="100" cy="100" r="70" strokeWidth="1" />
              <circle cx="100" cy="100" r="95" strokeWidth="1" />
              <line x1="0" y1="100" x2="100" y2="100" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="100" strokeWidth="1" />
              <line x1="29" y1="29" x2="100" y2="100" strokeWidth="1" />
            </svg>
          </div>

          <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ethix-red tracking-tight mb-2">
            24/7
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-ethix-charcoal-600 dark:text-ethix-charcoal-400 font-semibold">
            GLOBAL AVAILABILITY
          </div>
        </div>
      </div>
    </div>
  );
};
