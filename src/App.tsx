import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

// Code-split route components for performance optimization (PageSpeed 90+)
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Industries = lazy(() => import('./pages/Industries').then((m) => ({ default: m.Industries })));
const OurWork = lazy(() => import('./pages/OurWork').then((m) => ({ default: m.OurWork })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Blog = lazy(() => import('./pages/Blog').then((m) => ({ default: m.Blog })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const AdminLogin = lazy(() => import('./pages/AdminLogin').then((m) => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Route transition suspense fallback
const PageLoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
    <Loader2 className="w-7 h-7 animate-spin text-ethix-red" />
    <span className="text-xs font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
      Loading page module...
    </span>
  </div>
);

// Protected route gate for admin pages
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] dark:bg-[#0C0D10] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-ethix-red" />
        <span className="text-xs font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
          Verifying session credentials...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0C0D10] text-[#0F1012] dark:text-[#F4F4F6] font-sans selection:bg-ethix-red selection:text-white transition-colors duration-200">
      <ScrollToTop />
      {/* Hide public navbar on full admin dashboard */}
      {!isAdminDashboard && <Navbar />}

      <div className="flex-1">
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      {/* Hide public footer on full admin dashboard */}
      {!isAdminDashboard && <Footer />}
    </div>
  );
};
