import React from 'react';
import {
    Play,
    Clock,
    CheckCircle,
    TrendingUp,
    Award,
    Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockActivity = [
    { day: 'Mon', score: 40 },
    { day: 'Tue', score: 60 },
    { day: 'Wed', score: 55 },
    { day: 'Thu', score: 80 },
    { day: 'Fri', score: 70 },
    { day: 'Sat', score: 90 },
    { day: 'Sun', score: 85 },
];

const CandidateDashboard: React.FC = () => {
    return (
        <div className="space-y-8 text-left">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Dashboard</h1>
                    <p className="text-slate-500 mt-2">Track your progress and prepare for your next big interview.</p>
                </div>
                <Link to="/candidate/practice" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition flex items-center gap-2">
                    <Play className="w-4 h-4 fill-current" /> Start Practice
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Problems Solved</p>
                        <h3 className="text-4xl font-extrabold text-slate-900 mt-2">24</h3>
                        <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 font-bold">
                            <TrendingUp className="w-4 h-4" /> +4 this week
                        </div>
                    </div>
                    <CheckCircle className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-200/50 transform -rotate-12" />
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Interview Score</p>
                        <h3 className="text-4xl font-extrabold text-slate-900 mt-2">8.5<span className="text-lg text-slate-400">/10</span></h3>
                        <div className="mt-4 flex items-center gap-2 text-sm text-indigo-600 font-bold">
                            Top 15% of candidates
                        </div>
                    </div>
                    <Award className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-200/50 transform -rotate-12" />
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Practice Streak</p>
                        <h3 className="text-4xl font-extrabold text-slate-900 mt-2">5 <span className="text-lg text-slate-400">Days</span></h3>
                        <div className="mt-4 flex items-center gap-2 text-sm text-amber-600 font-bold">
                            Keep it up! 🔥
                        </div>
                    </div>
                    <Clock className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-200/50 transform -rotate-12" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 mb-6">Performance Activity</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockActivity}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Upcoming */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 mb-4">Upcoming Interviews</h3>
                    <div className="space-y-4">
                        {[1, 2].map(i => (
                            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="px-2 py-1 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-500 uppercase">Mock Interview</span>
                                    <span className="text-xs font-semibold text-slate-400">Dec 2{i}</span>
                                </div>
                                <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition">System Design - Scalability</h4>
                                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                                    <Calendar className="w-3 h-3" /> 10:00 AM - 11:00 AM
                                </div>
                                <button className="mt-3 w-full py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition">
                                    Join Room
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;
