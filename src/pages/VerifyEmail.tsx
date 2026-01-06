import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
    Loader2,
    CheckCircle2,
    ShieldCheck,
    Mail
} from 'lucide-react';

const VerifyEmail: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const emailParam = searchParams.get('email');

    const [email, setEmail] = useState(emailParam || '');
    const [token, setToken] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (emailParam) setEmail(emailParam);
    }, [emailParam]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: verifyError } = await supabase.auth.verifyOtp({
                email,
                token,
                type: 'signup'
            });

            if (verifyError) throw verifyError;

            setSuccess(true);
            // Optional: Redirect after delay
            setTimeout(() => {
                navigate('/auth/login');
            }, 2000);

        } catch (err: any) {
            console.error("Verification Failed:", err);
            setError(err.message || "Invalid code or expired.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center border border-slate-100 animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Verified!</h2>
                    <p className="text-slate-500 text-sm mb-6">Your account is active. Redirecting to login...</p>
                    <Link to="/auth/login" className="text-indigo-600 text-sm font-bold hover:underline">Go to Login Now</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-4">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Verify Account</h1>
                    <p className="text-slate-500 text-sm mt-2">Enter the 6-digit code sent to your email.</p>
                </div>

                {error && (
                    <div className="p-3 mb-6 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleVerify} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium text-sm"
                                placeholder="Confirm email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Verification Code</label>
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-center text-2xl tracking-[0.5em] font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:tracking-normal placeholder:font-normal placeholder:text-sm"
                            placeholder="123456"
                            maxLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Verify Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400">Didn't receive a code? <button className="text-indigo-600 font-bold hover:underline">Resend</button></p>
                </div>

            </div>
        </div>
    );
};

export default VerifyEmail;
