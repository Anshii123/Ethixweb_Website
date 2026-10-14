import React, { useState } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

export const BlogEditorialVisual: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<'headless' | 'ai' | 'seo'>('headless');

  const topicData = {
    headless: {
      title: 'Headless Next/Vite vs Monolithic WordPress',
      tag: 'Engineering Benchmark',
      readTime: '6 min read',
      codeSnippet: `// Edge Pre-rendered HTML Benchmark:
TTFB: 94ms | FCP: 420ms | DOM Nodes: 412
Payload: 312KB (vs 4.8MB on traditional CMS)
Result: Zero database queries on public hit`,
      takeaway: 'Instant load across low-bandwidth 4G/5G mobile connections with zero plugin attack surface.',
    },
    ai: {
      title: '24/7 AI Voice Receptionists for Contractors',
      tag: 'AI Systems',
      readTime: '7 min read',
      codeSnippet: `// Conversational Inbound Dispatch Webhook:
Caller Latency: <220ms speech-to-text
Intent: Emergency Trenchless Sewer Collapse
Action: Route to on-call technician & SMS CRM`,
      takeaway: 'Captures 38% after-hours high-ticket emergency calls without dispatcher burnout.',
    },
    seo: {
      title: 'Google Local Services Ads (LSA) vs Search',
      tag: 'Growth Mechanics',
      readTime: '5 min read',
      codeSnippet: `// Acquisition Economics:
Standard Search CPC: $68.00 / click (blind)
LSA Verified Lead: $84.00 / 30s+ phone call
Booking Rate: 44% with Google Guaranteed badge`,
      takeaway: 'Pay-on-lead acquisition with verified trust badges drastically cuts customer acquisition cost.',
    },
  };

  const current = topicData[selectedTopic];

  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none space-y-4">
      <div className="rounded-3xl overflow-hidden bg-[#0F1012] border border-ethix-charcoal-800 dark:border-white/10 shadow-elevated p-6 text-white space-y-4">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] font-mono text-ethix-charcoal-400 pl-2">
              field-notes.ts · Senior Engineering
            </span>
          </div>
          <span className="text-[10px] font-mono text-ethix-brass uppercase font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {current.readTime}
          </span>
        </div>

        {/* Topic Pills */}
        <div className="flex items-center gap-2">
          {(['headless', 'ai', 'seo'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedTopic(key)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                selectedTopic === key
                  ? 'bg-ethix-red text-white shadow-sm'
                  : 'bg-white/5 text-ethix-charcoal-400 hover:text-white'
              }`}
            >
              {key === 'headless' ? 'Headless' : key === 'ai' ? 'AI Voice' : 'LSA Ads'}
            </button>
          ))}
        </div>

        {/* Active Title */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-ethix-red uppercase font-semibold">
            {current.tag}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            {current.title}
          </h3>
        </div>

        {/* Code Snippet Box */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
          {current.codeSnippet}
        </div>

        {/* Takeaway Box */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-ethix-charcoal-300 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{current.takeaway}</p>
        </div>
      </div>
    </div>
  );
};
