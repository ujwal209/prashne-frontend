import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    CheckCircle2,
    Cpu,
    Globe,
    Sparkles,
    Play,
    ShieldCheck,
    Terminal,
    Users,
    Menu,
    X,
    Code2,
    TrendingUp,
    Search,
    Zap,
    BarChart3
} from 'lucide-react';

const Landing: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: Cpu,
            title: "Autonomous AI Interviewers",
            desc: "Deploy AI agents that conduct technical depth interviews, follow-up on logic, and grade responses in real-time."
        },
        {
            icon: Terminal,
            title: "Collaborative Code Sandbox",
            desc: "Full-featured IDE supporting 30+ languages with multiplayer cursors, integrated debugging, and test suites."
        },
        {
            icon: ShieldCheck,
            title: "Advanced Proctoring",
            desc: "Ensure integrity with browser lockdown, tab-switch monitoring, and AI-based behavior analysis."
        },
        {
            icon: BarChart3,
            title: "Talent Intelligence",
            desc: "Uncover hidden potential with deep skill graphs and benchmarking against millions of data points."
        }
    ];

    return (
        <div className="min-h-screen bg-[#0B0F19] font-sans selection:bg-indigo-500/30 selection:text-indigo-200 text-slate-300 overflow-x-hidden">

            {/* --- HERO BACKGROUND EFFECTS --- */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"></div>
            </div>

            {/* --- NAVBAR --- */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B0F19]/80 backdrop-blur-xl border-b border-indigo-500/10 py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative z-10 p-1">
                                <img src="/logo.webp" alt="Prashne Logo" className="w-8 h-8 object-contain brightness-0 invert" />
                            </div>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white font-heading">Prashne</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Platform</a>
                        <a href="#solutions" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Solutions</a>
                        <a href="#enterprise" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Enterprise</a>
                        <a href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</a>

                        <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                            <Link to="/auth/login" className="text-sm font-bold text-white hover:text-indigo-400 transition">Sign In</Link>
                            <Link to="/auth/register" className="group relative px-5 py-2.5 bg-white text-[#0B0F19] text-sm font-bold rounded-lg hover:bg-slate-200 transition overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-[#0B0F19] border-b border-white/10 p-4 md:hidden flex flex-col gap-4 shadow-2xl">
                        <Link to="/auth/login" className="text-sm font-bold text-slate-300">Sign In</Link>
                        <Link to="/auth/register" className="px-4 py-3 bg-indigo-600 text-white text-center font-bold rounded-lg">Get Started</Link>
                    </div>
                )}
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="max-w-7xl mx-auto relative z-10 text-center">

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        Reimagining Technical Recruitment
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-[1.1] font-heading font-heading">
                        The AI-First <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                            Hiring Architecture.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium mb-12 leading-relaxed">
                        Source, screen, and interview the top 1% of engineering talent automatically.
                        Zero bias. Zero fatigue. 100% precision.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24">
                        <Link to="/auth/register" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-base font-bold rounded-xl transition shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-10px_rgba(79,70,229,0.6)] flex items-center justify-center gap-2">
                            Start Hiring Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-4 bg-[#131926] text-slate-300 border border-white/10 text-base font-bold rounded-xl hover:bg-white/5 hover:text-white transition flex items-center justify-center gap-2 group">
                            <Play className="w-4 h-4 fill-slate-300 group-hover:fill-white transition-colors" />
                            Live Demo
                        </button>
                    </div>

                    {/* --- DASHBOARD MOCKUP (Glassmorphism & Detail) --- */}
                    <div className="relative mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">

                        {/* Glow Under Mockup */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20" />

                        <div className="relative bg-[#0F1420] rounded-2xl border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5">
                            {/* Mock Browser/App Header */}
                            <div className="h-10 bg-[#131926] border-b border-white/5 flex items-center px-4 gap-2">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                                </div>
                                <div className="ml-4 px-3 py-1 rounded bg-[#0B0F19] border border-white/5 text-[10px] text-slate-500 font-mono w-64 flex items-center justify-between">
                                    <span>prashne.ai/dashboard</span>
                                    <span className="text-emerald-500">🔒 Secure</span>
                                </div>
                            </div>

                            {/* Dashboard UI */}
                            <div className="flex h-[600px] text-left">
                                {/* Sidebar */}
                                <div className="hidden md:flex w-64 flex-col bg-[#0F1420] border-r border-white/5 pt-6">
                                    <div className="px-6 mb-8">
                                        <div className="flex items-center gap-2 text-white font-bold font-heading">
                                            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                                                <Code2 className="w-3 h-3 text-white" />
                                            </div>
                                            Analytics
                                        </div>
                                    </div>
                                    <div className="px-2 space-y-1">
                                        {['Overview', 'Candidates', 'Positions', 'Interviews', 'Assessments'].map((item, i) => (
                                            <div key={item} className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer flex items-center gap-3 ${i === 0 ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}>
                                                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-indigo-400' : 'bg-slate-700'}`} />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main View */}
                                <div className="flex-1 bg-[#0B0F19] p-8 overflow-hidden relative">
                                    {/* Top Bar included in main view for mockup simplification */}
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white font-heading">Overview</h2>
                                            <div className="text-slate-500 text-xs mt-1">Updated just now</div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                                <Search className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-xs ring-2 ring-[#0B0F19]">
                                                HR
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {[
                                            { k: 'Total Candidates', v: '2,845', d: '+12%', c: 'text-white' },
                                            { k: 'Interviews Active', v: '24', d: '+4', c: 'text-indigo-400' },
                                            { k: 'Avg Score', v: '8.4', d: '+0.2', c: 'text-emerald-400' },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-[#131926] p-5 rounded-xl border border-white/5 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                    <TrendingUp className="w-12 h-12 text-white transform rotate-12" />
                                                </div>
                                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{stat.k}</p>
                                                <p className={`text-2xl font-bold font-heading mt-2 ${stat.c}`}>{stat.v}</p>
                                                <div className="mt-2 text-[10px] font-mono text-slate-600 flex items-center gap-1">
                                                    <span className="text-emerald-500">{stat.d}</span> vs last week
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mock Chart Area */}
                                    <div className="grid grid-cols-3 gap-6 h-[250px]">
                                        <div className="col-span-2 bg-[#131926] rounded-xl border border-white/5 p-5 flex flex-col">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-sm font-bold text-slate-200">Hiring Pipeline</h3>
                                                <div className="flex gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-700"></div>
                                                </div>
                                            </div>
                                            {/* CSS Chart */}
                                            <div className="flex-1 flex items-end justify-between gap-2 px-2">
                                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                                    <div key={i} className="w-full bg-indigo-500/10 rounded-t-sm relative group cursor-pointer hover:bg-indigo-500/20 transition-colors" style={{ height: `${h}%` }}>
                                                        <div className="absolute bottom-0 left-0 right-0 bg-indigo-500 opacity-80" style={{ height: `${h / 3}%` }}></div>
                                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-[#0B0F19] text-[10px] font-bold px-2 py-1 rounded">
                                                            {h}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="col-span-1 bg-[#131926] rounded-xl border border-white/5 p-5">
                                            <h3 className="text-sm font-bold text-slate-200 mb-4">Activity Feed</h3>
                                            <div className="space-y-4">
                                                {[1, 2, 3].map((_, i) => (
                                                    <div key={i} className="flex gap-3 items-start">
                                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                            <Users className="w-3 h-3 text-slate-400" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-slate-300 font-medium">New match found</div>
                                                            <div className="text-[10px] text-slate-500 mt-0.5">Role: Senior Engineer</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- FEATURE CARDS (Dark Cards) --- */}
            <section id="features" className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 font-heading">Intelligence at Scale</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Our platform replaces the friction of manual screening with the precision of machine learning.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="bg-[#131926] p-8 rounded-2xl border border-white/5 hover:border-indigo-500/50 hover:bg-[#1A2235] transition-all duration-300 group shadow-lg">
                                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-600 flex items-center justify-center mb-6 text-indigo-400 group-hover:text-white transition-colors">
                                    <f.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 font-heading">{f.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- DUAL CTA (Dark/Gradient) --- */}
            <section id="solutions" className="py-24 relative overflow-hidden">
                {/* Background Gradient Slash */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] to-[#0F1420] skew-y-3 transform origin-bottom-left -z-10" />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Recruiter CTA */}
                    <div className="relative rounded-3xl p-10 overflow-hidden border border-white/5 bg-[#131926] group hover:border-indigo-500/30 transition-all">
                        <div className="absolute top-0 right-0 bg-gradient-to-br from-indigo-600/20 to-transparent w-64 h-64 blur-3xl rounded-full -mr-12 -mt-12" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">For Employers</span>
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">Upgrade your hiring stack.</h3>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Cut time-to-hire by 60% and identify top performers before your competitors do.
                            </p>
                            <Link to="/auth/register" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B0F19] font-bold rounded-xl hover:bg-slate-200 transition">
                                Start Free Trial <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Candidate CTA */}
                    <div className="relative rounded-3xl p-10 overflow-hidden border border-white/5 bg-gradient-to-br from-indigo-900/20 to-[#131926] group hover:border-indigo-400/30 transition-all">
                        <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-indigo-500/10 to-transparent w-full h-full" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <Terminal className="w-5 h-5 text-indigo-300" />
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">For Developers</span>
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">Prove your skills.</h3>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Practice with AI, track your growth, and showcase your verified abilities to top companies.
                            </p>
                            <Link to="/auth/register" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-900/50">
                                Create Candidate Account <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                </div>
            </section>



            {/* --- ENTERPRISE SECTION --- */}
            <section id="enterprise" className="py-24 bg-[#0F1420] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                                Enterprise Ready
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white font-heading leading-tight">
                                Security and control <br /> at every scale.
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                From SSO to role-based access control, Prashne is built to meet the rigorous demands of global organizations.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                {['SSO & SAML', 'Audit Logs', 'GDPR Compliant', 'Dedicated Support', 'Custom SLR', 'VPC Peering'].map(item => (
                                    <div key={item} className="flex items-center gap-3 text-white font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl" />
                            <div className="relative bg-[#131926] border border-white/10 rounded-2xl p-8 shadow-2xl">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-6 border-b border-white/5">
                                        <span className="text-sm font-bold text-slate-400">Security Compliance</span>
                                        <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">Passing</span>
                                    </div>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[#0B0F19] flex items-center justify-center border border-white/5">
                                                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                            </div>
                                            <div>
                                                <div className="h-2 w-24 bg-slate-700 rounded mb-2" />
                                                <div className="h-1.5 w-16 bg-slate-800 rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRICING SECTION --- */}
            <section id="pricing" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 font-heading">Simple, Transparent Pricing</h2>
                        <p className="text-slate-400 text-lg">Start for free, scale as you grow.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Free Tier */}
                        <div className="bg-[#131926] p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                            <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                            <p className="text-slate-400 text-sm mb-8">Perfect for individuals and small startups.</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> 5 Interviews/mo</li>
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Community Support</li>
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Basic Analytics</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white hover:text-[#0B0F19] transition">Get Started</button>
                        </div>

                        {/* Pro Tier */}
                        <div className="bg-[#131926] p-8 rounded-2xl border border-indigo-500 relative shadow-2xl shadow-indigo-900/20">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">Most Popular</div>
                            <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
                            <div className="text-4xl font-bold text-white mb-6">$49<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                            <p className="text-slate-400 text-sm mb-8">For growing teams hiring regularly.</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 50 Interviews/mo</li>
                                <li className="flex gap-3 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Priority Support</li>
                                <li className="flex gap-3 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Advanced Proctoring</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/25">Start Free Trial</button>
                        </div>

                        {/* Enterprise Tier */}
                        <div className="bg-[#131926] p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-2">Scale</h3>
                            <div className="text-4xl font-bold text-white mb-6">Custom</div>
                            <p className="text-slate-400 text-sm mb-8">For large organizations with specific needs.</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Unlimited Interviews</li>
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Dedicated Success Manager</li>
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Custom Integrations</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white hover:text-[#0B0F19] transition">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-12 border-t border-white/5 bg-[#080B12] text-sm">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="relative p-1">
                            <img src="/logo.webp" alt="Prashne Logo" className="w-8 h-8 object-contain brightness-0 invert" />
                        </div>
                        <span className="font-bold text-white text-lg font-heading">Prashne</span>
                    </div>
                    <div className="flex gap-8 text-slate-500">
                        <a href="#" className="hover:text-white transition">Privacy</a>
                        <a href="#" className="hover:text-white transition">Terms</a>
                        <a href="#" className="hover:text-white transition">Security</a>
                        <a href="#" className="hover:text-white transition">Contact</a>
                    </div>
                    <div className="text-slate-600">
                        © 2025 Prashne Intelligence.
                    </div>
                </div>
            </footer>

        </div >
    );
};

export default Landing;
