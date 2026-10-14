import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found (404) | Ethixweb';
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] dark:bg-[#0C0D10] transition-colors duration-200">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-[#101114] p-10 rounded-3xl border border-ethix-charcoal-200/80 dark:border-white/10 shadow-premium">
        <div className="inline-block px-3 py-1 rounded-full bg-ethix-red/10 text-ethix-red font-mono text-xs font-bold">
          HTTP Error 404
        </div>

        <h1 className="text-4xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight">
          Page Not Located
        </h1>

        <p className="text-sm text-ethix-charcoal-600 dark:text-ethix-charcoal-300 leading-relaxed">
          The requested route does not exist or has been relocated within the Ethixweb architecture.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button variant="secondary" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>

          <Link to="/services">
            <Button variant="outline" leftIcon={<Compass className="w-4 h-4" />}>
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
