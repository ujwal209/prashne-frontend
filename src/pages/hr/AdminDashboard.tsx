import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LeaderboardWidget from '../../components/LeaderboardWidget';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Sparkles, TrendingUp, Users, FileText, CheckCircle } from 'lucide-react';
import api from '../../lib/api';

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalResumes: 0,
        totalJobs: 0,
        teamSize: 0
    });
    
    // Formatting name
    const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Admin";

    useEffect(() => {
        // Fetch simple stats (mocked or real if endpoints exist)
        // For now we can assume zero or fetch from existing list endpoints if light, 
        // but let's just use the leaderboard data or similar for a "Team Pulse"
        const fetchStats = async () => {
             // We could add a /analytics/summary endpoint, but for now let's just show placeholders 
             // or derived data to keep it fast and "Analytics" focused.
             try {
                // Quick fetch of counts (optional, or just static for MVP)
                const res = await api.get('/resumes/stats'); // My stats
                setStats(prev => ({...prev, totalResumes: res.data.total_parsed}));
             } catch {}
        };
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-[1600px] mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-100">
                                 Admin View
                             </span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Analytics Overview
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg">
                            Track team performance and recruitment metrics.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button 
                             onClick={() => navigate('/hr/upload')}
                             className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <UploadCloud className="w-4 h-4" />
                            Upload Resume
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">My Processed Resumes</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.totalResumes}</h3>
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Candidates Hired</p>
                            <h3 className="text-2xl font-bold text-gray-900">--</h3>
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Team Active</p>
                            <h3 className="text-2xl font-bold text-gray-900">--</h3>
                        </div>
                    </div>
                </div>

                {/* Main Content Areas - Analytics Only */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
                    
                    {/* Leaderboard - Taking more space now as requested for "Analytics" */}
                    <div className="flex flex-col gap-6">
                         <div className="flex items-center gap-3 px-2">
                           <TrendingUp className="w-6 h-6 text-gray-400" />
                           <h2 className="text-xl font-bold text-gray-900">Team Leaderboard</h2>
                        </div>
                        <LeaderboardWidget />
                    </div>

                    {/* Future Analytics / Charts Placeholder */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 px-2">
                           <Sparkles className="w-6 h-6 text-gray-400" />
                           <h2 className="text-xl font-bold text-gray-900">Performance Insights</h2>
                        </div>
                        <div className="flex-1 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <TrendingUp className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">More analytics coming soon</h3>
                            <p className="text-gray-500 max-w-xs mx-auto mt-2">
                                We are gathering more data to show recruitment velocity and match success rates.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
