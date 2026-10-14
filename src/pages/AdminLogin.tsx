import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, AlertTriangle, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AdminLogin: React.FC = () => {
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    document.title = 'Admin Portal Login | Ethixweb';
    if (!authLoading && isAuthenticated) {
      const destination = (location.state as any)?.from?.pathname || '/admin';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login({ email, password });
      if (res.success) {
        toast.success('Authenticated', 'Welcome back to the Ethixweb admin console.');
        navigate('/admin', { replace: true });
      } else {
        setErrorMessage(res.error || 'Invalid credentials or login rate limit exceeded.');
        toast.error('Authentication Failed', res.error);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred during login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] dark:bg-[#0C0D10] transition-colors duration-200">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#101114] p-8 sm:p-10 rounded-3xl border border-ethix-charcoal-200/80 dark:border-white/10 shadow-premium">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-ethix-charcoal-900 dark:bg-white text-white dark:text-ethix-charcoal-900 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6 text-ethix-red" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F1012] dark:text-[#F4F4F6] tracking-tight">
            Ethixweb Admin Portal
          </h1>
          <p className="text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
            Sign in to access inbound project leads, status management, and client records.
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <Input
            label="Admin Email"
            type="email"
            required
            autoComplete="email"
            placeholder="admin@ethixweb.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftElement={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftElement={<Lock className="w-4 h-4" />}
          />

          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In to Dashboard
          </Button>
        </form>

        {/* Security Notice */}
        <div className="pt-4 border-t border-ethix-charcoal-100 dark:border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Protected by bcrypt hashing & atomic rate limiting</span>
        </div>
      </div>
    </div>
  );
};
