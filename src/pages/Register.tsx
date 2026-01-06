import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
    AlertCircle,
    Loader2,
    Lock,
    Mail,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
    Code2
} from 'lucide-react';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role: 'candidate'
                    }
                }
            });

            if (signUpError) throw signUpError;

            if (data.user) {
                setSuccess(true);
            }

        } catch (err: any) {
            console.error("Registration Failed:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Verification Sent!</h2>
                    <p className="text-slate-500 mb-8">
                        We've sent a verification link (or code) to <span className="font-bold text-slate-700">{email}</span>.
                        Please check your inbox to activate your account.
                    </p>
                    <Link to="/auth/login" className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition hidden">
                        Back to Login
                    </Link>
                    {/* Note: If user wants OTP input immediately, we'd switch to an OTP input form here. 
                    For now, standard email verification flow is safer unless OTP is strictly enforced.
                    Given the request for "code", let's assume they might need to enter it.
                */}
                    <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm mb-6">
                        <strong>Note:</strong> If you received a code, click below to verify.
                    </div>
                    <Link to={`/auth/verify?email=${encodeURIComponent(email)}`} className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition shadow-lg shadow-indigo-500/20">
                        Enter Verification Code
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full font-sans antialiased bg-white selection:bg-indigo-100 selection:text-indigo-900">

            {/* --- LEFT SIDE: Brand & Visuals --- */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-950 flex-col justify-between p-16 text-white border-r border-slate-900">

                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}>
                </div>

                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/30 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-2 rounded-xl shadow-sm">
                        <img src="/logo.webp" alt="Prashne Logo" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Prashne</span>
                </div>

                <div className="relative z-10 max-w-lg space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                        Master Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                            Technical Interview.
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                        Join thousands of developers practicing with our AI-driven interview simulator. Real-time feedback, LeetCode-style problems, and more.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        {['AI Mock Interviews', 'Live Coding', 'System Design', 'Realtime Feedback'].map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-semibold text-slate-300">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex justify-between items-center text-xs text-slate-600 font-bold uppercase tracking-widest">
                    <span>Candidate Portal</span>
                    <span>© 2025 Prashne</span>
                </div>
            </div>

            {/* --- RIGHT SIDE: Register Form --- */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 lg:px-24 bg-white">

                <div className="w-full max-w-[400px] space-y-8">

                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Create Account
                        </h2>
                        <p className="text-slate-500 text-sm font-medium">
                            Start your journey to your dream job.
                        </p>
                    </div>

                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex gap-3 items-start animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-red-800">Registration Failed</h3>
                                <p className="text-sm text-red-600 mt-1 leading-tight font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">

                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 bg-slate-50/50 
                           placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:bg-white
                           transition-all outline-none text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 bg-slate-50/50 
                           placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:bg-white
                           transition-all outline-none text-sm font-medium"
                                />
                            </div>
                            <p className="text-xs text-slate-400 ml-1">Must be at least 8 characters.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-white 
                       bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 
                       disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200 mt-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 font-medium">
                        Already have an account? <Link to="/auth/login" className="font-bold text-indigo-600 hover:text-indigo-700">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
