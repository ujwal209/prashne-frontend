import React, { useEffect, useState } from 'react';
import { 
  Users, 
  FileText, 
  Search, 
  TrendingUp, 
  Briefcase, 
  ArrowRight, 
  Activity 
} from 'lucide-react';
import api from '../../lib/api';

const HRDashboard: React.FC = () => {
    const [stats, setStats] = useState({ total_parsed: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/resumes/stats')
            .then(res => setStats(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                        <p className="text-gray-500 mt-2 text-lg">Welcome back, HR Admin. Here's what's happening today.</p>
                    </div>
                    <div className="text-sm font-medium text-violet-600 bg-violet-50 px-4 py-2 rounded-full border border-violet-100 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                        </span>
                        System Operational
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Total Candidates */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                <TrendingUp className="w-3 h-3 mr-1" /> +12%
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Candidates</p>
                            <h3 className="text-4xl font-bold text-gray-900 mt-1">
                                {loading ? '...' : stats.total_parsed}
                            </h3>
                        </div>
                    </div>

                    {/* Card 2: Resumes Parsed */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-violet-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-violet-50 text-violet-600 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                <TrendingUp className="w-3 h-3 mr-1" /> +5%
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Resumes Processed</p>
                            <h3 className="text-4xl font-bold text-gray-900 mt-1">
                                {loading ? '...' : stats.total_parsed}
                            </h3>
                        </div>
                    </div>

                    {/* Card 3: Active Jobs (Placeholder for visual balance) */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-pink-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-pink-50 text-pink-600 rounded-xl group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <span className="flex items-center text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                                Active
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Jobs</p>
                            <h3 className="text-4xl font-bold text-gray-900 mt-1">3</h3>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Recent Activity (Taking up 2/3 width) */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-gray-400" />
                                Recent Activity
                            </h3>
                            <button className="text-sm font-medium text-violet-600 hover:text-violet-700 hover:bg-violet-50 px-3 py-1 rounded-lg transition-colors">
                                View All
                            </button>
                        </div>
                        
                        {/* Empty State / Content */}
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gray-50/30">
                            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                <Search className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">No activity yet</h3>
                            <p className="text-gray-500 max-w-sm mt-2 mb-8 text-sm leading-relaxed">
                                It looks a bit quiet here. Start by uploading resumes to the Talent Pool or creating a new job posting to see analytics populate.
                            </p>
                            <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center gap-2">
                                Go to Talent Pool
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions / Tips */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
                            <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
                            <p className="text-indigo-100 text-sm mb-4 leading-relaxed">
                                You can now use AI to generate job descriptions instantly. Try it out when creating your next posting.
                            </p>
                            <button className="w-full py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition text-sm font-semibold">
                                Try AI Generator
                            </button>
                        </div>

                        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-between group">
                                    <span className="text-gray-700 font-medium group-hover:text-violet-700">Post a Job</span>
                                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-between group">
                                    <span className="text-gray-700 font-medium group-hover:text-violet-700">Upload Resumes</span>
                                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-between group">
                                    <span className="text-gray-700 font-medium group-hover:text-violet-700">Invite Team Member</span>
                                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HRDashboard;