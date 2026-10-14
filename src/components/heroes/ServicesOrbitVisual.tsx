import React, { useState, useEffect } from 'react';
import {
  Globe,
  Bot,
  TrendingUp,
  BarChart3,
  Headphones,
  CheckCircle2,
  Workflow,
  Sparkles,
} from 'lucide-react';

interface ServiceNode {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  icon: React.ReactNode;
  coords: { x: number; y: number }; // percentage coordinates within the square canvas
  metric: string;
}

export const ServicesOrbitVisual: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const nodes: ServiceNode[] = [
    {
      id: 'support',
      name: 'Continuous 24/7 Operations SLA',
      shortLabel: '24/7 Operations',
      category: 'Reliability',
      icon: <Headphones className="w-3.5 h-3.5 text-rose-500" />,
      coords: { x: 50, y: 12 },
      metric: '<1hr Emergency SLA Response',
    },
    {
      id: 'ai',
      name: 'AI Voice & Dispatch Copilots',
      shortLabel: 'AI Automation',
      category: 'Smart Systems',
      icon: <Bot className="w-3.5 h-3.5 text-ethix-brass" />,
      coords: { x: 77, y: 32 },
      metric: '24/7 Inbound Autonomous Triage',
    },
    {
      id: 'crm',
      name: 'CRM & WhatsApp Pipelines',
      shortLabel: 'CRM Pipelines',
      category: 'Integration',
      icon: <Workflow className="w-3.5 h-3.5 text-emerald-500" />,
      coords: { x: 77, y: 68 },
      metric: 'Zero Lead Leakage SLA',
    },
    {
      id: 'seo',
      name: 'SEO & Google Local Services (LSA)',
      shortLabel: 'SEO Acquisition',
      category: 'Organic Growth',
      icon: <TrendingUp className="w-3.5 h-3.5 text-blue-500" />,
      coords: { x: 50, y: 88 },
      metric: '#1 Google Map Rankings',
    },
    {
      id: 'analytics',
      name: 'Commercial Revenue Analytics',
      shortLabel: 'Revenue Analytics',
      category: 'Intelligence',
      icon: <BarChart3 className="w-3.5 h-3.5 text-purple-500" />,
      coords: { x: 23, y: 68 },
      metric: 'Real-Time ROI Attribution',
    },
    {
      id: 'websites',
      name: 'Headless Web & Next.js Architecture',
      shortLabel: 'Headless Web',
      category: 'Architecture',
      icon: <Globe className="w-3.5 h-3.5 text-ethix-red" />,
      coords: { x: 23, y: 32 },
      metric: '<120ms Edge TTFB Render',
    },
  ];

  // Automatically cycle through circular nodes every 3.2 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % nodes.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isHovered, nodes.length]);

  const currentNode = nodes[activeIndex];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[480px] mx-auto p-4 sm:p-5 rounded-3xl bg-[#FAF8F5] dark:bg-[#14161B] border-2 border-[#0F1012] dark:border-white/20 shadow-premium flex flex-col justify-between select-none overflow-hidden transition-all duration-300"
    >
      {/* 1. Header Bar: System Telemetry Status & Progress Dots */}
      <div className="flex items-center justify-between pb-3 border-b border-[#0F1012]/15 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-ethix-red animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0F1012] dark:text-white">
            Digital Operations Orbit
          </span>
        </div>

        {/* Orbit Step Dots */}
        <div className="flex items-center gap-1.5">
          {nodes.map((node, idx) => (
            <button
              key={node.id}
              type="button"
              aria-label={`Switch to ${node.shortLabel}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-5 bg-ethix-red shadow-sm'
                  : 'w-2 bg-[#0F1012]/30 dark:bg-white/30 hover:bg-[#0F1012] dark:hover:bg-white'
              }`}
            />
          ))}
          <span className="ml-1.5 flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>Auto-Sync</span>
          </span>
        </div>
      </div>

      {/* 2. Kinetic Orbital Canvas: STRICT ASPECT-SQUARE (420px max) */}
      <div className="relative w-full aspect-square max-w-[420px] mx-auto my-2 overflow-hidden">
        {/* Dark Black Orbits SVG: Rotating and pulsing */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Radial Crosshairs in Dark Black */}
          <line
            x1="50%"
            y1="6%"
            x2="50%"
            y2="94%"
            stroke="#0F1012"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="dark:stroke-white/30"
            opacity="0.25"
          />
          <line
            x1="6%"
            y1="50%"
            x2="94%"
            y2="50%"
            stroke="#0F1012"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="dark:stroke-white/30"
            opacity="0.25"
          />

          {/* Outer Dark Black Orbit Ring (Moves with spinSlow) */}
          <circle
            cx="50%"
            cy="50%"
            r="38%"
            fill="none"
            stroke="#0F1012"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="dark:stroke-white/80 animate-spin-slow origin-center"
          />

          {/* Middle Dark Black Orbit Ring (Moves in reverse with spinSlowReverse) */}
          <circle
            cx="50%"
            cy="50%"
            r="25%"
            fill="none"
            stroke="#0F1012"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="dark:stroke-white/60 animate-spin-reverse origin-center"
          />

          {/* Inner Dark Black Core Orbit Ring */}
          <circle
            cx="50%"
            cy="50%"
            r="15%"
            fill="none"
            stroke="#0F1012"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            className="dark:stroke-white/40"
          />

          {/* Rotating Dark Black Radar Sweep Line with Pulsing Red Beacon */}
          <g className="animate-orbit-radar" style={{ transformOrigin: '50% 50%' }}>
            <line
              x1="50%"
              y1="50%"
              x2="50%"
              y2="12%"
              stroke="#0F1012"
              strokeWidth="1.8"
              strokeDasharray="3 3"
              className="dark:stroke-white/70"
              opacity="0.5"
            />
            <circle
              cx="50%"
              cy="12%"
              r="3.5"
              fill="#DC2626"
              className="animate-pulse"
            />
          </g>

          {/* Dynamic Laser Connector Beam from Center Hub to Currently Active Node */}
          <line
            x1="50%"
            y1="50%"
            x2={`${currentNode.coords.x}%`}
            y2={`${currentNode.coords.y}%`}
            stroke="#DC2626"
            strokeWidth="2.5"
            className="transition-all duration-500"
          />
          <circle
            cx={`${currentNode.coords.x}%`}
            cy={`${currentNode.coords.y}%`}
            r="4"
            fill="#DC2626"
            className="animate-pulse"
          />
        </svg>

        {/* Central Ethixweb Operations Hub: Dark Black & Red Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-[#101114] border-2 border-[#0F1012] dark:border-white shadow-elevated cursor-pointer transition-transform duration-300 hover:scale-105">
          <div className="w-6 h-6 rounded-full bg-[#0F1012] dark:bg-white text-white dark:text-[#0F1012] flex items-center justify-center font-bold text-xs shadow-sm mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-ethix-red" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#0F1012] dark:text-white uppercase leading-none">
            Ethixweb
          </span>
          <span className="text-[7.5px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400 mt-0.5 leading-none">
            Operations
          </span>
        </div>

        {/* 6 Circular Service Nodes: Compact Pill Badges (Zero overlap, 100% inside container) */}
        {nodes.map((node, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-left transition-all duration-300 ${
                isActive
                  ? 'bg-white dark:bg-[#1E2026] border-2 border-ethix-red text-ethix-red font-bold shadow-elevated scale-105 ring-4 ring-ethix-red/20'
                  : 'bg-white/95 dark:bg-[#14161B]/95 border-2 border-[#0F1012]/30 dark:border-white/20 text-[#0F1012] dark:text-white hover:border-[#0F1012] dark:hover:border-white hover:scale-105 shadow-sm'
              }`}
            >
              <span className="shrink-0">{node.icon}</span>
              <span className="text-[11px] font-bold whitespace-nowrap leading-none">
                {node.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Dedicated Docked Telemetry Panel: Generous layout that NEVER breaks text */}
      <div className="mt-2 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#101114] border-2 border-[#0F1012]/15 dark:border-white/10 shadow-sm space-y-2 transition-all duration-300">
        {/* Top Header Line */}
        <div className="flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-bold text-ethix-red uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-ethix-red animate-pulse" />
              Active Discipline
            </span>
            <span className="px-2 py-0.5 rounded bg-ethix-charcoal-100 dark:bg-white/10 text-ethix-charcoal-800 dark:text-ethix-charcoal-200 font-semibold text-[10px]">
              {currentNode.category}
            </span>
          </div>
          <span className="text-[10px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
            Phase {activeIndex + 1} of {nodes.length}
          </span>
        </div>

        {/* Bottom Content Line: Full width title & SLA benchmark */}
        <div className="flex items-center justify-between gap-4 pt-1.5 border-t border-ethix-charcoal-100 dark:border-white/5">
          <div className="text-xs sm:text-sm font-bold text-[#0F1012] dark:text-white truncate">
            {currentNode.name}
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
              {currentNode.metric}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
