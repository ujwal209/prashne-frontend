import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import api from '../lib/api';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Mail, 
  Briefcase 
} from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        // 1. Call Backend Proxy
        console.log('Authenticating via Backend...');
        const response = await api.post('/auth/login', {
            email,
            password
        });

        const { access_token, refresh_token, user } = response.data;
        console.log('Login Success. Role:', user.role);

        // 2. Sync Client-Side Session (Critical for RLS & Persistent State)
        const { error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token
        });

        if (sessionError) {
            throw new Error("Failed to sync session: " + sessionError.message);
        }

        // 3. Redirect based on verified role from backend
        // 3. Redirect based on verified role from backend
        const role = user.role;
        if (role === 'super_admin') {
            navigate('/admin');
        } else if (role === 'hr_admin') {
            navigate('/hr/admin');
        } else if (role === 'hr_user' || role === 'hr_staff') {
            navigate('/hr/dashboard');
        } else {
             // Fallback for unknown or legacy roles
            navigate('/hr/dashboard');
        }

    } catch (err: any) {
        console.error("Login Failed:", err);
        const serverError = err.response?.data?.detail;
        
        if (serverError) {
             setError(serverError);
        } else if (err.message) {
             setError(err.message);
        } else {
             setError("An unexpected error occurred.");
        }
        await supabase.auth.signOut(); // Clean up if partial state
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans bg-gray-50">
      
      {/* LEFT SIDE: Brand & Visuals (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-emerald-950 flex-col justify-between p-12 text-white">
        
        {/* Background Pattern - Subtle Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/50 to-emerald-950/90" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
            <Briefcase className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-xl font-bold tracking-wide text-white">PRASHNE</span>
        </div>

        {/* Main Visual Content */}
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
            Recruitment <br/>
            <span className="text-emerald-400">Intelligence Refined.</span>
          </h1>
          <p className="text-emerald-100/80 text-lg leading-relaxed max-w-md">
            Empower your HR team with data-driven insights and secure candidate management pipelines.
          </p>
          
          <div className="flex flex-col gap-4 mt-8">
            {['Enterprise-grade security', 'Real-time analytics', 'Automated workflows'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-emerald-50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer/Copyright */}
        <div className="relative z-10 text-xs text-emerald-400/60 font-medium">
          © 2025 Prashne Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-20 bg-white relative">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Briefcase className="w-5 h-5 text-emerald-700" />
          </div>
          <span className="font-bold text-gray-900 tracking-wide">PRASHNE</span>
        </div>

        <div className="w-full max-w-[400px] space-y-8">
          
          {/* Header */}
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="text-gray-500">
              Enter your credentials to access your workspace.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex gap-3 items-start animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800">Login Failed</h3>
                <p className="text-sm text-red-600 mt-1 leading-tight">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            
            <div className="space-y-5">
              {/* Email Input */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50/50 placeholder:text-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none sm:text-sm"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="flex items-center justify-between mb-1.5 ml-1">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50/50 placeholder:text-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-900 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>

            {/* Footer Text */}
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <a href="#" className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">
                Contact Admin
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;