import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Clock,
  Search,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Terminal,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CtaBanner } from '../components/home/CtaBanner';
import { Button } from '../components/ui/Button';
import { PageHero } from '../components/heroes/PageHero';
import { BlogEditorialVisual } from '../components/heroes/BlogEditorialVisual';

interface ArticleSection {
  heading: string;
  id: string;
  paragraphs: string[];
  codeBlock?: {
    language: string;
    code: string;
  };
  highlightBox?: {
    title: string;
    content: string;
  };
}

interface Article {
  slug: string;
  title: string;
  category: 'Engineering' | 'Growth' | 'AI & Automation' | 'SEO' | 'Operations' | 'Accessibility';
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  featured?: boolean;
  tableOfContents: { title: string; id: string }[];
  sections: ArticleSection[];
  indiaContext: {
    heading: string;
    details: string;
  };
  relatedServices: { name: string; link: string }[];
}

export const Blog: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      slug: 'why-headless-architecture-outperforms-wordpress',
      category: 'Engineering',
      title: 'Why Headless Architecture Outperforms Monolithic WordPress for Trade & Commercial Services',
      excerpt:
        'Monolithic page builders introduce database bloat, plugin conflicts, and sluggish TTFB. How modern decoupled frontends deliver sub-second loads and zero security vulnerability surface.',
      readTime: '6 min read',
      date: 'Published · Senior Engineering Desk',
      author: 'Ethixweb Technical Architecture Group',
      featured: true,
      tableOfContents: [
        { title: 'The Problem with Monolithic CMS Stacks', id: 'monolithic-cms-breakdown' },
        { title: 'Decoupled Frontends & Edge Rendering', id: 'decoupled-frontends' },
        { title: 'Database Security & Zero Plugin Bloat', id: 'database-security' },
        { title: 'Transferable Insight for Indian Enterprises', id: 'india-market-context' },
      ],
      sections: [
        {
          id: 'monolithic-cms-breakdown',
          heading: 'The Problem with Monolithic CMS Stacks',
          paragraphs: [
            'For over a decade, WordPress was the default scaffolding for service businesses. However, as trade contractors and commercial enterprises scale, the traditional LAMP stack becomes an operational liability. Heavy visual page builders (Elementor, Divi) output thousands of nested DOM nodes, render-blocking stylesheets, and unoptimized JavaScript bundles.',
            'Every additional plugin added for basic functionality—caching, form submissions, security firewalls, SEO tags—introduces database queries on every page request, driving Time to First Byte (TTFB) well past Google’s 800ms threshold.',
          ],
          codeBlock: {
            language: 'bash',
            code: `# Typical Monolithic Load Waterfall:
DNS (120ms) -> SSL (180ms) -> Apache Server Wait (850ms) -> DB Queries [45 queries] (620ms) -> TTFB: ~1.77s
# Modern Decoupled Edge Delivery:
DNS (40ms) -> Edge CDN Static Pre-rendered HTML (80ms) -> TTFB: <120ms (93% faster)`,
          },
        },
        {
          id: 'decoupled-frontends',
          heading: 'Decoupled Frontends & Edge Rendering',
          paragraphs: [
            'By decoupling the presentation layer (React / Vite / Next.js) from content management and backend storage, the browser receives pre-compiled, highly optimized static HTML, CSS, and minimal JS. The frontend is distributed across global Edge CDN nodes.',
            'When an emergency plumbing, HVAC, or B2B enterprise prospect visits the website from a mobile device, the page renders instantaneously without waiting for a distant origin database to execute dynamic PHP loops.',
          ],
          highlightBox: {
            title: 'Commercial Conversion Correlation',
            content:
              'A 1-second reduction in page load speed directly correlates to a 17% increase in mobile form submissions for high-intent emergency service enquiries.',
          },
        },
        {
          id: 'database-security',
          heading: 'Database Security & Zero Plugin Bloat',
          paragraphs: [
            'In a headless setup, your database (such as MongoDB Atlas or a headless CMS) is never directly exposed to the public internet through a vulnerable wp-admin login gate. Serverless API functions handle form submissions through strict Zod schema validation and atomic rate-limiting.',
            'There are no third-party PHP plugins waiting to be compromised by automated brute-force botnets.',
          ],
        },
      ],
      indiaContext: {
        heading: 'Relevance for Indian & Emerging Market Enterprises',
        details:
          'In tier-1 and tier-2 Indian commercial hubs where users frequently access websites on varying mobile networks (4G/5G mobile data), monolithic WordPress sites frequently stall. Headless React architectures minimize payload sizes from 4.5MB down to under 350KB, ensuring zero drop-offs on Indian mobile browsers.',
      },
      relatedServices: [
        { name: 'Custom Website Design & Development', link: '/services' },
        { name: 'Web Applications & Headless APIs', link: '/services' },
      ],
    },
    {
      slug: 'local-services-ads-vs-google-search-for-contractors',
      category: 'Growth',
      title: 'Google Local Services Ads (LSA) vs. Standard Search Ads: What High-Ticket Trades Need to Know',
      excerpt:
        'Comparing pay-per-click versus pay-per-qualified-call. Why the Google Guaranteed badge transforms inbound call conversion for plumbers, HVAC operators, and roofers.',
      readTime: '5 min read',
      date: 'Published · Growth & Acquisition Desk',
      author: 'Ethixweb Performance Marketing Lead',
      tableOfContents: [
        { title: 'The Cost-Per-Click vs. Cost-Per-Lead Shift', id: 'cpc-vs-cpl' },
        { title: 'Google Guaranteed Verification & Trust Moat', id: 'google-guaranteed-trust' },
        { title: 'Managing Dispute Windows & Call Tracking', id: 'dispute-management' },
        { title: 'Transferable Insight for Indian Businesses', id: 'india-market-context' },
      ],
      sections: [
        {
          id: 'cpc-vs-cpl',
          heading: 'The Cost-Per-Click vs. Cost-Per-Lead Shift',
          paragraphs: [
            'Traditional Google Search ads charge businesses every time a prospect clicks your link—regardless of whether they bounce immediately, are job seekers, or clicked accidentally. In high-intent trade categories like commercial trenchless repair or HVAC changeouts, keyword CPCs can climb to $45–$110 per click.',
            'Google Local Services Ads (LSA) operate on a fundamentally different financial model: pay-per-qualified-call. You only incur costs when a customer in your verified zip code dials your business and connects for longer than 30 seconds.',
          ],
        },
        {
          id: 'google-guaranteed-trust',
          heading: 'Google Guaranteed Verification & Trust Moat',
          paragraphs: [
            'Securing the green Google Guaranteed badge requires passing stringent license verification, insurance confirmation, and background checks. This badge appears at the very top of Google mobile search results, above traditional search ads and organic map packs.',
            'Because Google backs the contractor with up to $2,000 in consumer claims, residential and commercial customers exhibit significantly higher booking confidence.',
          ],
        },
      ],
      indiaContext: {
        heading: 'Relevance for Indian Service Businesses',
        details:
          'While Google Guaranteed LSA is active primarily in North American and European jurisdictions, the core lesson holds true for Indian B2B service firms: verified trust badges, transparent licensing proofs, and pay-on-lead acquisition funnels drastically outperform blind pay-per-click budgets.',
      },
      relatedServices: [
        { name: 'SEO & Google Ads Acquisition', link: '/services' },
        { name: 'CRM & Pipeline Lead Management', link: '/services' },
      ],
    },
    {
      slug: 'ai-receptionists-voice-csr-dispatch-automation',
      category: 'AI & Automation',
      title: 'Deploying AI Voice Receptionists for 24/7 Emergency Dispatch and Inbound Triage',
      excerpt:
        'How modern conversational voice agents accurately qualify emergency inquiries, capture addresses, and route field technicians after business hours without human dispatch fatigue.',
      readTime: '7 min read',
      date: 'Published · AI Systems Group',
      author: 'Ethixweb Applied AI Engineering',
      tableOfContents: [
        { title: 'The After-Hours Revenue Leakage Problem', id: 'after-hours-leakage' },
        { title: 'Natural Voice Synthesis & Contextual Intent', id: 'natural-voice-synthesis' },
        { title: 'Real-Time Dispatch Webhooks & Field CRMs', id: 'real-time-dispatch' },
        { title: 'Indian Customer Journey Considerations', id: 'india-market-context' },
      ],
      sections: [
        {
          id: 'after-hours-leakage',
          heading: 'The After-Hours Revenue Leakage Problem',
          paragraphs: [
            'Studies across residential and commercial service operators reveal that over 38% of high-value emergency inquiries occur between 6:00 PM and 7:30 AM. Traditional solutions—such as forwarding calls to exhausted owners or hiring offshore third-party call centers—result in high error rates, unlogged calls, and lost contracts.',
            'Modern conversational AI agents pick up within two rings, maintain calm conversational cadence, verify the customer’s service address, and determine whether the issue warrants immediate emergency dispatch or next-day booking.',
          ],
        },
        {
          id: 'natural-voice-synthesis',
          heading: 'Natural Voice Synthesis & Contextual Intent',
          paragraphs: [
            'Using sub-250ms latency speech-to-text, large language models fine-tuned on industry domain dictionaries, and neural voice synthesis, AI receptionists handle complex interruptions, customer accents, and clarify ambiguous addresses seamlessly.',
          ],
        },
      ],
      indiaContext: {
        heading: 'Relevance for Indian Operational Workflows',
        details:
          'Indian enterprises and growing diagnostic/service chains handle immense daily inquiry volumes. Deploying multi-channel conversational agents that communicate fluidly across English, Hindi, and regional dialects transforms customer retention while eliminating manual front-desk bottlenecks.',
      },
      relatedServices: [
        { name: 'AI Solutions & Conversational Agents', link: '/services' },
        { name: 'Custom Web Applications & Portals', link: '/services' },
      ],
    },
    {
      slug: 'core-web-vitals-seo-ranking-factor',
      category: 'SEO',
      title: 'The Real Commercial Impact of Core Web Vitals on High-Intent Local Search Rankings',
      excerpt:
        'Google measures INP, LCP, and CLS as critical user experience signals. How sub-second performance lifts conversion rates and cuts paid media bounce penalties.',
      readTime: '4 min read',
      date: 'Published · Search Mechanics Desk',
      author: 'Ethixweb Technical SEO Architect',
      tableOfContents: [
        { title: 'Interaction to Next Paint (INP) Demystified', id: 'inp-demystified' },
        { title: 'Largest Contentful Paint & Mobile Hydration', id: 'lcp-hydration' },
        { title: 'Cumulative Layout Shift (CLS) Prevention', id: 'cls-prevention' },
        { title: 'Indian Mobile Ecosystem Realities', id: 'india-market-context' },
      ],
      sections: [
        {
          id: 'inp-demystified',
          heading: 'Interaction to Next Paint (INP) Demystified',
          paragraphs: [
            'In March 2024, Google officially replaced First Input Delay (FID) with Interaction to Next Paint (INP). While FID only measured the delay of the first interaction, INP tracks the latency of every click, tap, and keypress across the user session.',
            'Websites loaded with unoptimized tracking scripts and heavy React re-renders freeze the main UI thread, resulting in poor INP scores that directly hurt Google mobile search rankings.',
          ],
        },
      ],
      indiaContext: {
        heading: 'Relevance for Indian Mobile Users',
        details:
          'Mid-tier smartphones common in the Indian market have slower CPU cores. Heavy client-side JavaScript execution triggers severe frame drops and sluggish response times. Optimizing bundle sizes ensures instant interactions across all device tiers.',
      },
      relatedServices: [
        { name: 'SEO & Search Engine Infrastructure', link: '/services' },
        { name: 'Custom Website Design & Development', link: '/services' },
      ],
    },
    {
      slug: 'crm-pipeline-synchronization-field-services',
      category: 'Operations',
      title: 'Eliminating Lead Leakage: Synchronizing Inbound Web Forms to Field CRMs and WhatsApp',
      excerpt:
        'When an inquiry takes 4 hours to receive a response, conversion likelihood drops by 80%. Architecting bi-directional webhooks between web forms, WhatsApp APIs, and field dispatch software.',
      readTime: '5 min read',
      date: 'Published · Digital Operations Team',
      author: 'Ethixweb Systems Integration Group',
      tableOfContents: [
        { title: 'The Five-Minute Lead Decay Curve', id: 'five-minute-decay' },
        { title: 'Serverless Webhooks & Instant Triage', id: 'serverless-webhooks' },
        { title: 'WhatsApp Business API Integration', id: 'whatsapp-integration' },
        { title: 'Operational Blueprint for Indian Enterprises', id: 'india-market-context' },
      ],
      sections: [
        {
          id: 'five-minute-decay',
          heading: 'The Five-Minute Lead Decay Curve',
          paragraphs: [
            'Lead response studies consistently show that businesses reaching out to a web lead within five minutes are 21 times more likely to qualify the opportunity compared to those waiting thirty minutes. Traditional email notification systems often get buried in junk folders or delayed by email server queues.',
          ],
        },
        {
          id: 'serverless-webhooks',
          heading: 'Serverless Webhooks & Instant Triage',
          paragraphs: [
            'When an inquiry is submitted, our architecture simultaneously writes the encrypted record to MongoDB Atlas and triggers serverless webhooks directly into your CRM (HubSpot, Salesforce, ServiceTitan, or custom internal dashboards).',
          ],
        },
      ],
      indiaContext: {
        heading: 'WhatsApp as the Dominant Indian Communication Channel',
        details:
          'In the Indian business ecosystem, WhatsApp is not a secondary channel—it is the primary channel. Automated WhatsApp confirmations, direct instant messaging triggers, and verified WhatsApp Business API sync eliminate 90% of lead leakage for Indian businesses.',
      },
      relatedServices: [
        { name: 'CRM & Workflow Integration', link: '/services' },
        { name: 'Maintenance & Dedicated Operations SLA', link: '/services' },
      ],
    },
    {
      slug: 'wcag-aa-compliance-for-commercial-websites',
      category: 'Accessibility',
      title: 'WCAG 2.1 AA Compliance: Legal Protection and Accessibility Engineering',
      excerpt:
        'Why accessibility overlay widgets fail basic compliance audits, and how semantic HTML, keyboard focus management, and color contrast tokens provide durable legal defense.',
      readTime: '6 min read',
      date: 'Published · Accessibility Engineering',
      author: 'Ethixweb Compliance & Accessibility Team',
      tableOfContents: [
        { title: 'The Fallacy of Quick-Fix Accessibility Overlays', id: 'overlay-fallacy' },
        { title: 'Core Principles of WCAG 2.1 AA', id: 'wcag-core-principles' },
        { title: 'Engineering Native Keyboard Focus & ARIA', id: 'keyboard-focus-aria' },
        { title: 'Global and Indian Accessibility Regulations', id: 'india-market-context' },
      ],
      sections: [
        {
          id: 'overlay-fallacy',
          heading: 'The Fallacy of Quick-Fix Accessibility Overlays',
          paragraphs: [
            'Many businesses attempt to solve accessibility compliance by pasting a one-line JavaScript overlay widget into their website. Over 600 federal lawsuits have cited websites using these exact overlay widgets.',
            'True accessibility cannot be injected retroactively. It must be engineered directly into the HTML semantic tags, tab indices, visible focus indicators, and screen-reader ARIA live regions.',
          ],
        },
      ],
      indiaContext: {
        heading: 'Relevance for Indian Digital Initiatives',
        details:
          'India’s Rights of Persons with Disabilities (RPwD) guidelines increasingly require public and commercial portals to comply with WCAG 2.1 standards. Native accessibility engineering ensures compliance and expands reach to millions of assisted-tech users across India.',
      },
      relatedServices: [
        { name: 'Accessibility & WCAG Compliance Audits', link: '/services' },
        { name: 'Custom Website Design & Development', link: '/services' },
      ],
    },
  ];

  // Route slug detection: If URL contains a slug, set active article
  useEffect(() => {
    if (slug) {
      const found = articles.find((a) => a.slug === slug);
      if (found) {
        setActiveArticle(found);
        document.title = `${found.title} | Ethixweb Field Notes`;
      } else {
        setActiveArticle(null);
      }
    } else {
      setActiveArticle(null);
      document.title = 'Field Notes & Engineering Blog | Ethixweb';
    }
  }, [slug]);

  const categories = ['All', 'Engineering', 'Growth', 'AI & Automation', 'SEO', 'Operations', 'Accessibility'];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const handleOpenArticle = (art: Article) => {
    setActiveArticle(art);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    if (slug) {
      navigate('/blog');
    }
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0D10] text-[#0F1012] dark:text-[#F4F4F6] transition-colors duration-200 min-h-screen">
      {/* View 1: Single Article Reading Experience */}
      {activeArticle ? (
        <article className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Back Navigation Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-ethix-charcoal-200/70 dark:border-white/10">
              <button
                type="button"
                onClick={handleCloseArticle}
                className="inline-flex items-center gap-2 text-xs font-bold text-ethix-charcoal-600 dark:text-ethix-charcoal-300 hover:text-ethix-red dark:hover:text-ethix-red transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Field Notes</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-ethix-charcoal-400">
                <span className="px-2.5 py-1 rounded bg-ethix-red/10 text-ethix-red font-bold">
                  {activeArticle.category}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeArticle.readTime}
                </span>
              </div>
            </div>

            {/* Article Headline Header */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-ethix-brass font-bold">
                Ethixweb Engineering Field Note
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight leading-tight">
                {activeArticle.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400 font-mono">
                <span>By {activeArticle.author}</span>
                <span>·</span>
                <span>{activeArticle.date}</span>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14161B] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-ethix-charcoal-900 dark:text-white">
                <Bookmark className="w-4 h-4 text-ethix-red" />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-2 text-xs">
                {activeArticle.tableOfContents.map((toc, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${toc.id}`}
                      className="text-ethix-charcoal-600 dark:text-ethix-charcoal-300 hover:text-ethix-red dark:hover:text-ethix-red transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-3 h-3 text-ethix-brass shrink-0" />
                      <span>{toc.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Article Content Body */}
            <div className="space-y-12 text-sm sm:text-base text-ethix-charcoal-700 dark:text-ethix-charcoal-300 leading-relaxed">
              {activeArticle.sections.map((sec, idx) => (
                <section key={idx} id={sec.id} className="space-y-4 pt-4">
                  <h2 className="text-2xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight">
                    {sec.heading}
                  </h2>

                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}

                  {sec.codeBlock && (
                    <div className="p-4 rounded-2xl bg-[#0F1012] text-white font-mono text-xs overflow-x-auto border border-white/10 space-y-2">
                      <div className="flex items-center gap-1.5 text-ethix-charcoal-400 text-[10px] pb-2 border-b border-white/10">
                        <Terminal className="w-3.5 h-3.5 text-ethix-red" />
                        <span>Architectural Benchmark</span>
                      </div>
                      <pre className="text-emerald-400 whitespace-pre leading-relaxed">
                        {sec.codeBlock.code}
                      </pre>
                    </div>
                  )}

                  {sec.highlightBox && (
                    <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-950 dark:text-amber-200/90 space-y-1">
                      <div className="font-bold">{sec.highlightBox.title}</div>
                      <p>{sec.highlightBox.content}</p>
                    </div>
                  )}
                </section>
              ))}

              {/* India-Specific Enterprise Context */}
              <section id="india-market-context" className="p-8 rounded-3xl bg-white dark:bg-[#14161B] border border-ethix-brass/40 shadow-premium space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-ethix-brass bg-ethix-brass/10 px-2.5 py-1 rounded">
                    Market Operational Context
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                  {activeArticle.indiaContext.heading}
                </h3>
                <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                  {activeArticle.indiaContext.details}
                </p>
              </section>
            </div>

            {/* Related Services & In-Article CTA */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-premium space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-ethix-red font-bold">
                  Recommended Technical Solutions
                </span>
                <h3 className="text-xl font-bold text-[#0F1012] dark:text-[#F4F4F6]">
                  Ready to implement these architectures in your business?
                </h3>
                <p className="text-xs text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
                  Discuss how we can audit and rebuild your digital operations with guaranteed response SLAs.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {activeArticle.relatedServices.map((svc, idx) => (
                  <Link
                    key={idx}
                    to={svc.link}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-ethix-charcoal-200/80 dark:border-white/10 text-xs font-bold hover:border-ethix-red transition-colors"
                  >
                    <span>{svc.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-ethix-red" />
                  </Link>
                ))}
                <Link to="/contact">
                  <Button variant="primary" size="sm">
                    Start a Project Discussion
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      ) : (
        /* View 2: Editorial Index & Filtered Grid */
        <div>
          {/* Header Hero with Interactive Upper-Right Editorial Content Engine Visual */}
          <PageHero
            badge="FIELD NOTES & ENGINEERING JOURNAL"
            badgeIcon={<BookOpen className="w-3.5 h-3.5 text-ethix-red" />}
            title={
              <>
                Insights on digital operations,{' '}
                <span className="text-ethix-red">software architecture & growth.</span>
              </>
            }
            description="Rigorous, practical write-ups from our senior engineers covering headless architecture, search engine mechanics, AI workflow deployment, and commercial enterprise automation."
            actions={
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#articles-list"
                  className="inline-flex items-center gap-2 bg-ethix-red hover:bg-ethix-red-hover text-white px-6 py-3 rounded-full font-bold text-xs tracking-wide shadow-subtle transition-all duration-150"
                >
                  <span>Explore All Field Notes</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-ethix-charcoal-800 dark:text-ethix-charcoal-200 hover:text-ethix-red px-5 py-3 rounded-full border border-ethix-charcoal-200/80 dark:border-white/10 hover:border-ethix-red/40 transition-colors"
                >
                  <span>Discuss Engineering Scope</span>
                </Link>
              </div>
            }
            metaInfo={
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Real Architecture Benchmarks</span>
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-ethix-charcoal-600 dark:text-ethix-charcoal-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Sub-Second TTFB Guides</span>
                </span>
              </div>
            }
            visual={<BlogEditorialVisual />}
          />

          {/* Search Bar & Filter Navigation */}
          <section className="py-6 border-b border-ethix-charcoal-200/70 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm sticky top-16 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-ethix-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search field notes by keyword, architecture, or topic..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-ethix-charcoal-200/80 dark:border-white/10 text-xs text-ethix-charcoal-900 dark:text-white placeholder:text-ethix-charcoal-400 focus:outline-none focus:border-ethix-red transition-colors"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                  <Filter className="w-3.5 h-3.5 text-ethix-charcoal-400 shrink-0 mr-1 hidden sm:block" />
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? 'bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 shadow-sm'
                          : 'bg-[#FAF8F5] dark:bg-white/5 text-ethix-charcoal-600 dark:text-ethix-charcoal-300 hover:text-ethix-charcoal-900 dark:hover:text-white border border-ethix-charcoal-200/70 dark:border-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Featured Editorial Story */}
          {selectedCategory === 'All' && !searchTerm && featuredArticle && (
            <section className="py-12 border-b border-ethix-charcoal-200/70 dark:border-white/10 bg-white/40 dark:bg-white/[0.01]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-premium grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ethix-red bg-ethix-red/10 px-2.5 py-1 rounded">
                        Featured Note · {featuredArticle.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-ethix-charcoal-400">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight leading-snug">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed max-w-2xl">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="pt-2">
                      <Button
                        variant="primary"
                        onClick={() => handleOpenArticle(featuredArticle)}
                        rightIcon={<ArrowUpRight className="w-4 h-4" />}
                      >
                        Read Complete Field Note
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-4 p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#14161B] border border-ethix-charcoal-200/70 dark:border-white/10 space-y-3">
                    <div className="text-xs font-mono uppercase font-bold text-ethix-brass">
                      Key Takeaways
                    </div>
                    <ul className="space-y-2 text-xs text-ethix-charcoal-700 dark:text-ethix-charcoal-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Sub-150ms TTFB via Edge CDN deployment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Zero attack surface via decoupled serverless endpoints</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>High-bandwidth efficiency for Indian 4G/5G mobile readers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Articles Grid */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((art) => (
                  <article
                    key={art.slug}
                    className="p-8 rounded-3xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-semibold uppercase text-ethix-red bg-ethix-red/10 dark:bg-ethix-red/20 px-2.5 py-1 rounded">
                          {art.category}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-mono text-ethix-charcoal-400">
                          <Clock className="w-3 h-3" />
                          {art.readTime}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-[#0F1012] dark:text-[#F4F4F6] leading-snug group-hover:text-ethix-red transition-colors">
                        {art.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-ethix-charcoal-100 dark:border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                        {art.date}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenArticle(art)}
                        className="inline-flex items-center gap-1 font-bold text-ethix-charcoal-900 dark:text-white hover:text-ethix-red dark:hover:text-ethix-red transition-colors"
                      >
                        <span>Read Note</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-[#101114] border border-ethix-charcoal-200 dark:border-white/10">
                  <BookOpen className="w-8 h-8 text-ethix-charcoal-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-ethix-charcoal-900 dark:text-white mb-1">
                    No matching field notes found
                  </h3>
                  <p className="text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                    Try adjusting your search query or selecting a different category pill.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* Closing CTA */}
      <CtaBanner />
    </div>
  );
};
