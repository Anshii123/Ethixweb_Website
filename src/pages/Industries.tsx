import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Compass,
  Hammer,
  Shield,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  ShoppingBag,
  Stethoscope,
  Briefcase,
} from 'lucide-react';
import { CtaBanner } from '../components/home/CtaBanner';
import { PageHero } from '../components/heroes/PageHero';
import { IndustriesShowcaseVisual } from '../components/heroes/IndustriesShowcaseVisual';

interface IndustrySector {
  id: string;
  type: 'verified-client' | 'strategic-framework';
  badge: string;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  challenges: string[];
  solutions: string[];
  techStack: string[];
  caseStudyLink?: string;
  clientExample?: string;
  indiaRelevanceNote?: string;
}

export const Industries: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'india-framework'>('all');

  useEffect(() => {
    document.title = 'Industries We Serve | Ethixweb Digital Operations';
    window.scrollTo(0, 0);
  }, []);

  const sectors: IndustrySector[] = [
    {
      id: 'hvac-plumbing',
      type: 'verified-client',
      badge: 'Documented Case Study',
      icon: <Wrench className="w-6 h-6 text-ethix-red" />,
      title: 'HVAC & Plumbing Contractors',
      tagline: 'Dominating local service radius with automated emergency booking.',
      description:
        'In local trade contracting, response speed determines who wins the high-margin emergency job. We replace generic template websites with high-performance emergency dispatch engines, Google Local Services Ads (LSA), programmatic neighborhood SEO, and direct CRM routing.',
      challenges: [
        'High dependency on expensive third-party lead brokers that resell the same lead to 4 competitors',
        'Sluggish mobile sites that fail when a homeowner has a burst pipe or broken furnace',
        'Manual phone tag causing missed evening and weekend dispatch opportunities',
      ],
      solutions: [
        'Sub-second mobile emergency booking flow tied directly to field technician schedules',
        'Google Guaranteed & Local Services Ads management with automated review capture',
        'Programmatic geo-targeted landing pages for every city and township in your service zone',
      ],
      techStack: ['React', 'Google LSA API', 'Schema.org', 'Direct Webhooks'],
      caseStudyLink: '/our-work',
      clientExample: 'All Phase Plumbing · +140% Inbound Lead Growth',
      indiaRelevanceNote:
        'Transferable Framework: Applicable to multi-city field service franchises, pest control, and home renovation networks across Indian metros.',
    },
    {
      id: 'infrastructure-utilities',
      type: 'verified-client',
      badge: 'Documented Case Study',
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      title: 'Trenchless Infrastructure & Utilities',
      tagline: 'Educating commercial decision-makers and winning enterprise contracts.',
      description:
        'Specialized infrastructure contractors like trenchless pipelining and municipal utilities require educating engineers, property managers, and municipalities on complex technical advantages before quoting.',
      challenges: [
        'General public confusion between traditional excavation and non-invasive trenchless methods',
        'High customer acquisition cost for commercial and municipal projects',
        'Lack of technical case studies detailing pipe diameters, PSI ratings, and municipal approvals',
      ],
      solutions: [
        'Diagnostic landing pages featuring video pipe inspections and cost-benefit calculators',
        'Google Ads campaigns targeting high-intent commercial facility managers',
        'Automated lead qualification funnel separating small residential leaks from commercial rehabilitation',
      ],
      techStack: ['Video CDNs', 'Conversion Telemetry', 'B2B Intake Forms'],
      caseStudyLink: '/our-work',
      clientExample: "Gary's Pipelining · 3.2x Qualified Commercial Pipeline in 90 Days",
      indiaRelevanceNote:
        'Transferable Framework: Essential for B2B industrial suppliers, MEP contractors, and engineering procurement firms bidding on commercial projects.',
    },
    {
      id: 'millwork-cabinetry',
      type: 'verified-client',
      badge: 'Documented Case Study',
      icon: <Hammer className="w-6 h-6 text-ethix-brass" />,
      title: 'Architectural Millwork & Custom Cabinetry',
      tagline: 'Translating master artisan craftsmanship into premium design commissions.',
      description:
        'High-ticket residential and commercial woodworking relies on commanding visual presentation and seamless consultation flows. We engineer visual-first portfolio architectures with sub-second image loading, project estimators, and interactive finish selectors.',
      challenges: [
        'Photographic portfolios trapped in slow-loading, compressed image galleries',
        'Unqualified inquiries seeking cheap prefabricated mass-market solutions',
        'Lengthy design consultation cycles without structured client intake questionnaires',
      ],
      solutions: [
        'Ultra-fast headless portfolio gallery optimized for retina screens and mobile designers',
        'Interactive project scope and budget intake questionnaire to pre-qualify inquiries',
        'Commercial spec sheets and architect portal for commercial bidding projects',
      ],
      techStack: ['Headless CMS', 'Next.js Image Pipelines', 'Quotation Engine'],
      caseStudyLink: '/our-work',
      clientExample: 'MTO Cabinets · -65% Bounce Rate, 2.4x Consultation Lift',
      indiaRelevanceNote:
        'Transferable Framework: High-impact portfolio architecture for bespoke interior designers, architects, and luxury modular furniture brands in India.',
    },
    {
      id: 'fishing-charters',
      type: 'verified-client',
      badge: 'Documented Case Study',
      icon: <Compass className="w-6 h-6 text-blue-500" />,
      title: 'Fishing Charters & Marine Outfitters',
      tagline: 'Eliminating booking friction and capturing direct seasonal revenue.',
      description:
        'Marine outfitters and sportfishing captains operate on compressed seasons where every empty berth is lost revenue. We build real-time reservation schedules, weather notification webhooks, automated deposit collection, and customer SMS reminders.',
      challenges: [
        'Double bookings caused by overlapping inquiries across phone, email, and social media',
        'Hefty 20-30% commissions surrendered to online travel agencies and directory portals',
        'Last-minute customer cancellations without automated card authorization or deposit protection',
      ],
      solutions: [
        'Direct calendar booking engine with instant credit card deposits and trip confirmations',
        'Automated trip prep sequences (gear checklists, launch coordinates, weather advisories)',
        'Direct-to-consumer marine merchandise storefronts to monetize brand equity off-water',
      ],
      techStack: ['Stripe Elements', 'Calendar Sync Engine', 'SMS Webhooks'],
      caseStudyLink: '/our-work',
      clientExample: 'Catch Zone & Bimini Buddie · Zero Double Bookings, +40% Direct Sales',
      indiaRelevanceNote:
        'Transferable Framework: Direct reservation architectures for boutique resorts, experiential travel operators, and sports clubs avoiding OTA commissions.',
    },
    {
      id: 'd2c-ecommerce',
      type: 'strategic-framework',
      badge: 'India & Global Framework',
      icon: <ShoppingBag className="w-6 h-6 text-purple-500" />,
      title: 'D2C Brands & Specialized E-Commerce',
      tagline: 'Frictionless checkout, COD verification, and WhatsApp retention funnels.',
      description:
        'For high-growth e-commerce brands, conversion rate optimization and retention are paramount. We architect headless e-commerce frontends, automated WhatsApp order updates, and multi-gateway checkout integrations.',
      challenges: [
        'Slow page speeds on Shopify themes causing mobile cart abandonment',
        'High RTO (Return to Origin) on Cash on Delivery orders',
        'Customer re-engagement emails languishing with sub-10% open rates',
      ],
      solutions: [
        'Sub-second headless storefront with instant catalog search and filter caching',
        'Automated WhatsApp OTP verification for COD orders to cut RTO rates',
        'Personalized lifecycle drip notifications delivered directly via WhatsApp Business API',
      ],
      techStack: ['Shopify Storefront API', 'Razorpay', 'WhatsApp Cloud API', 'PostHog'],
      indiaRelevanceNote:
        'Market Specifics: Tailored specifically for Indian D2C operators tackling high mobile checkout friction and Tier-2 delivery logistics.',
    },
    {
      id: 'healthcare-clinics',
      type: 'strategic-framework',
      badge: 'India & Global Framework',
      icon: <Stethoscope className="w-6 h-6 text-cyan-500" />,
      title: 'Healthcare Clinics & Diagnostic Centers',
      tagline: 'Private, secure patient intake and 24/7 AI appointment scheduling.',
      description:
        'Multi-doctor clinics, dental practices, and diagnostic centers require rapid appointment booking, HIPAA/DISHA data confidentiality, and automated patient reminders to prevent costly no-shows.',
      challenges: [
        'Reception lines constantly busy, driving prospective patients to rival clinics',
        'High no-show rates for specialized diagnostic consultations and elective surgeries',
        'Patients struggling to find exact doctor schedules and pricing transparency',
      ],
      solutions: [
        'Bilingual conversational AI receptionists handling call and WhatsApp booking 24/7',
        'Automated pre-visit preparation checklists and Google Calendar integration',
        'Strictly encrypted, compliant patient intake forms saving directly to secure cloud databases',
      ],
      techStack: ['OpenAI Voice', 'Twilio / Exotel', 'MongoDB Atlas Encryption', 'Next.js'],
      indiaRelevanceNote:
        'Market Specifics: Essential for multi-specialty clinics in Bengaluru, Delhi NCR, Mumbai, and Hyderabad seeking streamlined patient intake.',
    },
    {
      id: 'b2b-professional',
      type: 'strategic-framework',
      badge: 'India & Global Framework',
      icon: <Briefcase className="w-6 h-6 text-amber-500" />,
      title: 'B2B Professional Services & SaaS MVPs',
      tagline: 'Commanding brand prestige, qualified inbound leads, and client portals.',
      description:
        'Consulting practices, corporate law firms, accounting practices, and tech startups need to communicate immense technical rigor and deliver seamless digital touchpoints to enterprise prospects.',
      challenges: [
        'Generic corporate websites that fail to articulate proprietary methodology or ROI',
        'Lengthy sales cycles with manual proposal drafting and contract back-and-forth',
        'Unsecured file exchanges and fragmented client communication across email threads',
      ],
      solutions: [
        'Editorial, publication-grade digital flagships with gated whitepapers and case studies',
        'Custom client portals with role-based access, document vaults, and live project trackers',
        'Automated inbound lead qualification routing directly to senior partners via Slack/WhatsApp',
      ],
      techStack: ['TypeScript', 'JWT Auth', 'MongoDB Atlas', 'TailwindCSS'],
      indiaRelevanceNote:
        'Market Specifics: Perfect for Indian IT service providers, legal-tech firms, and global advisory practices winning international contracts.',
    },
  ];

  const filteredSectors =
    activeTab === 'all'
      ? sectors
      : activeTab === 'verified'
        ? sectors.filter((s) => s.type === 'verified-client')
        : sectors.filter((s) => s.type === 'strategic-framework');

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0D10] text-[#0F1012] dark:text-[#F4F4F6] transition-colors duration-200">
      {/* Header Hero with Interactive Upper-Right Industry Showcase */}
      <PageHero
        badge="INDUSTRY SPECIALIZATIONS & OPERATING FRAMEWORKS"
        badgeIcon={<Building2 className="w-3.5 h-3.5 text-ethix-red" />}
        title={
          <>
            Tailored digital operations for specialized{' '}
            <span className="text-ethix-red">commercial sectors.</span>
          </>
        }
        description="We do not build generic one-size-fits-all websites. We examine the exact bottlenecks of your trade—whether emergency response speed, high-ticket qualification, or automated booking—and engineer systems that drive verifiable commercial outcomes."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-ethix-red hover:bg-ethix-red-hover text-white px-6 py-3 rounded-full font-bold text-xs tracking-wide shadow-subtle transition-all duration-150"
            >
              <span>Discuss Your Sector Scope</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="#sectors"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ethix-charcoal-800 dark:text-ethix-charcoal-200 hover:text-ethix-red px-5 py-3 rounded-full border border-ethix-charcoal-200/80 dark:border-white/10 hover:border-ethix-red/40 transition-colors"
            >
              <span>Explore Industry Breakdown</span>
            </a>
          </div>
        }
        metaInfo={
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verified Home Services & Utilities</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>D2C & B2B Scaling Frameworks</span>
            </span>
          </div>
        }
        visual={<IndustriesShowcaseVisual />}
      />

      {/* Filter Tabs */}
      <section className="py-8 border-b border-ethix-charcoal-200/70 dark:border-white/10 bg-ethix-ivory-50/60 dark:bg-white/[0.02] sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                Display:
              </span>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'all'
                    ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 shadow-subtle'
                    : 'bg-white dark:bg-white/5 text-ethix-charcoal-700 dark:text-ethix-charcoal-300 border border-ethix-charcoal-200/70 dark:border-white/10'
                  }`}
              >
                All Industries ({sectors.length})
              </button>
              <button
                onClick={() => setActiveTab('verified')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'verified'
                    ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 shadow-subtle'
                    : 'bg-white dark:bg-white/5 text-ethix-charcoal-700 dark:text-ethix-charcoal-300 border border-ethix-charcoal-200/70 dark:border-white/10'
                  }`}
              >
                Verified Case Studies (4)
              </button>
              <button
                onClick={() => setActiveTab('india-framework')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'india-framework'
                    ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 shadow-subtle'
                    : 'bg-white dark:bg-white/5 text-ethix-charcoal-700 dark:text-ethix-charcoal-300 border border-ethix-charcoal-200/70 dark:border-white/10'
                  }`}
              >
                India & Global Scaling (3)
              </button>
            </div>

            <div className="text-[11px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
              *Transparent distinction between verified client case studies and strategic frameworks
            </div>
          </div>
        </div>
      </section>

      {/* Main Industry Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredSectors.map((sector) => (
            <div
              key={sector.id}
              id={sector.id}
              className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-premium transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Sector Identity & Narrative */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-ethix-ivory-100 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10">
                      {sector.icon}
                    </div>
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${sector.type === 'verified-client'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                        }`}
                    >
                      {sector.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] leading-tight">
                    {sector.title}
                  </h2>

                  <p className="text-xs font-mono text-ethix-red font-semibold">
                    {sector.tagline}
                  </p>

                  <p className="text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                    {sector.description}
                  </p>

                  {/* Tech stack */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ethix-charcoal-400 block mb-2">
                      Key Technology Architecture:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sector.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-ethix-ivory-50 dark:bg-white/5 border border-ethix-charcoal-200/60 dark:border-white/10 text-ethix-charcoal-800 dark:text-ethix-charcoal-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verified Outcome or India Relevance Note */}
                  {sector.clientExample && (
                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold block">
                        Verified Benchmark Outcome:
                      </span>
                      <p className="text-xs font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                        {sector.clientExample}
                      </p>
                    </div>
                  )}

                  {sector.indiaRelevanceNote && (
                    <div className="p-4 rounded-2xl bg-ethix-brass/5 border border-ethix-brass/20 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ethix-brass font-bold block">
                        Indian Business Application:
                      </span>
                      <p className="text-xs text-ethix-charcoal-700 dark:text-ethix-charcoal-300 leading-relaxed">
                        {sector.indiaRelevanceNote}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 bg-ethix-red hover:bg-ethix-red-hover text-white px-5 py-2.5 rounded-full font-bold text-xs tracking-wide shadow-subtle transition-all duration-150"
                    >
                      <span>Inquire for {sector.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {sector.caseStudyLink && (
                      <Link
                        to={sector.caseStudyLink}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-ethix-charcoal-800 dark:text-ethix-charcoal-200 hover:text-ethix-red px-4 py-2.5 rounded-full border border-ethix-charcoal-200/80 dark:border-white/10 transition-colors"
                      >
                        <span>View Verified Case Studies</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right Column: Challenges vs Solutions Breakdown */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Industry Operational Challenges */}
                  <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 space-y-4">
                    <div className="flex items-center gap-2 text-ethix-red text-xs font-bold uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4" />
                      <span>Inherent Operational Friction</span>
                    </div>

                    <ul className="space-y-3">
                      {sector.challenges.map((c, cIdx) => (
                        <li
                          key={cIdx}
                          className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-ethix-red shrink-0 mt-1.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ethixweb Engineering Solutions */}
                  <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Engineered Resolution</span>
                    </div>

                    <ul className="space-y-3">
                      {sector.solutions.map((s, sIdx) => (
                        <li
                          key={sIdx}
                          className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-Industry Operating Guarantee */}
      <section className="py-20 border-t border-ethix-charcoal-200/70 dark:border-white/10 bg-white dark:bg-[#101114]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-ethix-red">
            Uncompromising Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight">
            Operating under senior engineering discipline across every sector.
          </h2>
          <p className="text-sm sm:text-base text-ethix-charcoal-600 dark:text-ethix-charcoal-300 max-w-3xl mx-auto leading-relaxed">
            Whether deploying emergency dispatch funnels for trade contractors in Seattle or automated WhatsApp CRM synchronization for growing companies in India, every project is built with role-based access, full code ownership, and sub-second performance.
          </p>

          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-ethix-red hover:bg-ethix-red-hover text-white px-8 py-3.5 rounded-full font-bold text-xs tracking-wide shadow-subtle transition-all duration-150"
            >
              <span>Discuss Your Industry Requirements</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};
