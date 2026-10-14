import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  servicesUsed: string[];
  rating: number;
}

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote:
        'Ethixweb transformed our digital operations. Our bookings run automatically, our site is lightning fast, and we never have to stress about technical issues or downtime.',
      author: 'Ryan Taylor',
      role: 'Business Owner',
      company: 'All Phase Plumbing',
      servicesUsed: ['Website Redesign', 'Local SEO', 'Booking Automation'],
      rating: 5,
    },
    {
      quote:
        'Direct communication with senior engineers who understand commercial priorities. No middle management fluff. They delivered our project on time and the ROI was immediate.',
      author: 'Clinton Mcculloch',
      role: 'Operations Director',
      company: "Gary's Pipelining",
      servicesUsed: ['Custom Landing Pages', 'Google LSA', 'CRM Routing'],
      rating: 5,
    },
    {
      quote:
        'From website redesign to our CRM integration, Ethixweb runs the tech so our team can focus 100% on serving clients and closing projects.',
      author: 'Leslie Whitehurst-Manners',
      role: 'Managing Director',
      company: 'MTO Cabinets',
      servicesUsed: ['UX Design', 'Portfolio Engine', 'Inquiry Pipeline'],
      rating: 5,
    },
    {
      quote:
        'The best technology partner we have worked with. Professional, proactive, and genuinely invested in our company’s continuous growth and stability.',
      author: 'Kayla Kjl',
      role: 'Marketing Lead',
      company: 'Catch Zone Charters',
      servicesUsed: ['Booking Flow', 'Mobile Ergonomics', 'Email Automation'],
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#101114] border-b border-ethix-charcoal-200/70 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
                Verified Client Proof
              </span>
              <span className="text-ethix-charcoal-300 dark:text-ethix-charcoal-700">·</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Reviews</span>
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight leading-tight">
              Trusted by operators who value engineering accountability.
            </h2>
            <p className="text-base text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
              Real feedback from businesses that rely on Ethixweb to keep their web applications, lead funnels, and digital infrastructure performing every day.
            </p>
          </div>

          {/* Trustpilot-Style Rating Badge */}
          <div className="p-4 rounded-2xl bg-ethix-ivory-50 dark:bg-white/5 border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle self-start md:self-auto flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-ethix-charcoal-900 dark:text-white">
                4.0 / 5.0 Star Rating
              </span>
              <span className="text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                Verified on Trustpilot & Google
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-ethix-charcoal-300 dark:text-white/20" />
                </div>

                <p className="text-base sm:text-lg text-ethix-charcoal-800 dark:text-ethix-charcoal-200 font-medium leading-relaxed mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-ethix-charcoal-200/70 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-[#0F1012] dark:text-[#F4F4F6]">
                    {t.author}
                  </h3>
                  <p className="text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                    {t.role}, <span className="font-semibold text-ethix-charcoal-700 dark:text-ethix-charcoal-300">{t.company}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {t.servicesUsed.map((svc, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-white/10 border border-ethix-charcoal-200/60 dark:border-white/10 text-ethix-charcoal-600 dark:text-ethix-charcoal-300"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
