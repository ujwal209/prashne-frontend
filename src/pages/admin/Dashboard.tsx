import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { supabase } from '../../lib/supabase';
import { 
  Building2, 
  Users, 
  FileText, 
  TrendingUp,
  Activity,
  ArrowUpRight
} from 'lucide-react';

interface GlobalStats {
  total_companies: number;
  total_resumes_parsed: number;
  total_users: number;
}

const StatCard = ({ title, value, icon: Icon, trend, color, bg }: any) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md hover:ring-gray-900/10">
    <div className="flex items-start justify-between">
      <div className="relative z-10">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight">{value}</h3>
      </div>
      <div className={`relative z-10 rounded-xl p-3 ${bg} ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
    
    <div className="mt-6 flex items-center gap-2 text-sm">
      <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 font-medium text-green-700">
        <ArrowUpRight className="h-3 w-3" />
        {trend}
      </div>
      <span className="text-gray-400">vs last month</span>
    </div>

    {/* Decorative BG Blob */}
    <div className={`absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-10 blur-3xl ${color.replace('text-', 'bg-')}`} />
  </div>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("No active session found");
      }
      
      const { data } = await api.get('/admin/stats', {
         headers: { Authorization: `Bearer ${session.access_token}` }
      });
      setStats(data);
    } catch (error: any) {
      console.error("Failed to fetch stats", error);
      setError(error.response?.data?.detail || "Could not load stats. Auth token may be invalid.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
       {[1,2,3].map(i => <div key={i} className="h-40 bg-gray-200 rounded-2xl"></div>)}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Global Overview</h1>
          <p className="mt-2 text-gray-500">Real-time metrics from all tenant organizations.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Download Report</button>
           <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">Refresh Data</button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard 
          title="Active Tenants" 
          value={stats?.total_companies || 0} 
          icon={Building2} 
          trend="+12%"
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard 
          title="Total Resumes Processed" 
          value={stats?.total_resumes_parsed || 0} 
          icon={FileText} 
          trend="+450"
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <StatCard 
          title="HR Admins" 
          value={stats?.total_users || 0} 
          icon={Users} 
          trend="+5%"
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
      </div>

      {/* Chart Visual Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-gray-900">System Growth</h2>
            <div className="flex gap-2">
               <span className="h-3 w-3 rounded-full bg-blue-500"></span>
               <span className="text-xs text-gray-500">Tenants</span>
            </div>
          </div>
          <div className="h-80 w-full rounded-xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 group">
             <Activity className="w-12 h-12 mb-3 opacity-20 group-hover:opacity-40 transition-opacity" />
             <p>Chart Visualization Area</p>
             <p className="text-xs mt-1">Integrate Recharts or Chart.js here</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
           <h2 className="text-lg font-bold text-gray-900 mb-6">Plan Distribution</h2>
           <div className="h-64 flex items-center justify-center relative">
              <div className="w-40 h-40 rounded-full border-8 border-indigo-100 border-t-indigo-500 animate-spin-slow"></div>
              <div className="absolute font-bold text-2xl text-indigo-900">85%</div>
           </div>
           <div className="text-center mt-4">
              <p className="text-sm text-gray-500">Pro Plan Usage</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
