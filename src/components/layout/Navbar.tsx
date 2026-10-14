import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Scroll state for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Live IST / Global Hub time with continuous real-time ticking
  useEffect(() => {
    const updateClock = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setCurrentTime(timeStr);
      } catch {
        setCurrentTime('');
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'Our Work', href: '/our-work' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'glass-header border-b border-ethix-charcoal-200/60 dark:border-white/10 shadow-subtle py-3'
          : 'bg-[#FAF8F5]/90 dark:bg-[#0C0D10]/90 border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with official 3D emblem and wordmark asset */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ethix-red rounded-lg py-1"
            aria-label="Ethixweb Home"
          >
            <img
              src="/images/ethixweb-emblem.webp"
              alt=""
              width={30}
              height={30}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <img
                src="/images/ethixweb-logo.webp"
                alt="Ethixweb"
                width={130}
                height={20}
                className="h-4 sm:h-[18px] w-auto object-contain logo-wordmark"
              />
              <span className="text-[9px] uppercase tracking-widest font-semibold text-ethix-charcoal-500 dark:text-ethix-charcoal-400 -mt-0.5 hidden xs:block">
                Digital Operations
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ethix-red ${
                    active
                      ? 'text-ethix-red dark:text-ethix-red font-semibold bg-ethix-red/5 dark:bg-ethix-red/10'
                      : 'text-ethix-charcoal-700 dark:text-ethix-charcoal-300 hover:text-ethix-charcoal-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Operations Timezone Badge */}
            {currentTime && (
              <div
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border border-ethix-charcoal-200/80 dark:border-white/10 text-ethix-charcoal-600 dark:text-ethix-charcoal-300 bg-ethix-ivory-100/80 dark:bg-white/5"
                title="Ethixweb Global Network — India Technical Operations Hub"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-[10px] text-ethix-charcoal-800 dark:text-white">IN</span>
                <span className="tabular-nums">{currentTime}</span>
              </div>
            )}

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full text-ethix-charcoal-600 dark:text-ethix-charcoal-300 hover:text-ethix-charcoal-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ethix-red"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-ethix-charcoal-700" />
              )}
            </button>

            {/* Primary Action Button */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-ethix-red hover:bg-ethix-red-hover text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-subtle hover:shadow-glow-red transition-all duration-150 group active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ethix-red focus-visible:ring-offset-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-ethix-charcoal-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ethix-red"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[68px] bottom-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF8F5] dark:bg-[#121316] border-b border-ethix-charcoal-200 dark:border-white/10 p-5 shadow-elevated max-h-[calc(100vh-68px)] overflow-y-auto"
            >
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        active
                          ? 'bg-ethix-red/10 text-ethix-red font-bold dark:bg-ethix-red/20'
                          : 'text-ethix-charcoal-800 dark:text-ethix-charcoal-200 hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <div className="pt-4 mt-3 border-t border-ethix-charcoal-200 dark:border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between px-2 text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                    <span>Operations Hub: India (IST)</span>
                    <span className="font-mono">{currentTime || 'Online'}</span>
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3.5 rounded-xl bg-ethix-red text-white font-bold text-sm shadow-subtle flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
