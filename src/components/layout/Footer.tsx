import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe2, ArrowUpRight, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0B0D] text-ethix-charcoal-300 border-t border-white/10 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/ethixweb-emblem.webp"
                alt="Ethixweb 3D emblem"
                width={36}
                height={36}
                className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <img
                src="/images/ethixweb-logo.webp"
                alt="Ethixweb Logo"
                width={120}
                height={26}
                className="h-6 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-ethix-charcoal-400 max-w-sm leading-relaxed">
              We run the tech. You run the business. High-performance digital operations, web applications, and AI automations built for operators who value technical stability and measurable growth.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-ethix-charcoal-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-ethix-red shrink-0" />
                <span>Kent, WA 98031, USA</span>
              </span>
              <span className="hidden sm:inline text-ethix-charcoal-600">·</span>
              <span className="flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-ethix-brass shrink-0" />
                <span>Global Ops Hub: India</span>
              </span>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Core Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Websites & Headless CMS
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Custom Web Applications
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  AI Receptionists & Copilots
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  CRM & WhatsApp Pipelines
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Technical SEO & Growth
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  24/7 Operations & SLA
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Company & Work
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  22 Services
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-white transition-colors">
                  Case Studies & Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About & Operating Model
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Field Notes & Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:info@ethixweb.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-ethix-red shrink-0" />
                  <span>info@ethixweb.com</span>
                </a>
              </li>
              <li className="text-xs text-ethix-charcoal-400 pt-1 leading-relaxed">
                Direct consultation with senior engineering leads. 24-hour response SLA on all project inquiries.
              </li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-xs font-bold text-ethix-red hover:text-red-400 transition-colors"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ethix-charcoal-400">
          <p>© {new Date().getFullYear()} Ethixweb LLC. All rights reserved. US Registration & Global Operations.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono text-ethix-charcoal-400">
            <span>React + Vite</span>
            <span>·</span>
            <span>Serverless Edge</span>
            <span>·</span>
            <span>WCAG 2.1 AA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
