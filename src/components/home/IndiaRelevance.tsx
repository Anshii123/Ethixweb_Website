import React from 'react';
import { Smartphone, IndianRupee, MessageCircle, ShieldCheck } from 'lucide-react';

export const IndiaRelevance: React.FC = () => {
  const points = [
    {
      icon: <IndianRupee className="w-5 h-5 text-ethix-brass" />,
      title: 'INR-Denominated Project Tiers',
      description:
        'Clear, upfront budget classifications from ₹50,000 to ₹8,00,000+ so founders, SMEs, and growth directors can align scope without foreign currency exchange friction.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-ethix-red" />,
      title: 'Mobile-First for Indian Bandwidth',
      description:
        'With 85%+ of Indian web visits originating on mobile devices over cellular networks, our client code is heavily optimized for fast rendering, minimal JavaScript payloads, and zero layout shift.',
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-emerald-600" />,
      title: 'WhatsApp & Indian Phone Support',
      description:
        'Enquiry forms natively support 10-digit Indian mobile formats with +91 validation, ensuring inquiries can seamlessly transition to WhatsApp or phone calls.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: 'Real Engineering, Zero Gimmicks',
      description:
        'No generic page builder templates or overseas subcontracting. We deploy clean TypeScript applications with real database persistence on MongoDB Atlas and Vercel.',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-ethix-charcoal-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ethix-charcoal-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-ethix-red/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-12 space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
              Designed for the Indian Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why an India-tailored digital experience makes a commercial difference.
            </h2>
            <p className="text-sm sm:text-base text-ethix-charcoal-300 leading-relaxed">
              From quick commerce in Gurgaon to SaaS startups in Indiranagar, Indian businesses demand fast turnaround, mobile reliability, and transparent commercials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {points.map((p, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-ethix-charcoal-800/70 border border-ethix-charcoal-700/80 space-y-2.5"
              >
                <div className="p-2.5 w-fit rounded-lg bg-ethix-charcoal-700/80">{p.icon}</div>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs sm:text-sm text-ethix-charcoal-300 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
