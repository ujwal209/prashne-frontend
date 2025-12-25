import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { 
  Loader2, 
  History, 
  Briefcase, 
  User, 
  Search, 
  Filter, 
  Calendar,
  Sparkles,
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const MatchHistory: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobFilter, setJobFilter] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/jobs/matches');
        setMatches(res.data);
      } catch (e) {
        console.error("Failed to load matches", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Extract unique jobs for filter
  const uniqueJobs = Array.from(new Set(matches.map(m => m.job?.title).filter(Boolean)));

  const filteredMatches = matches.filter(m => {
    const matchesSearch = 
      (m.resume?.candidate_name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (m.job?.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesJob = jobFilter ? m.job?.title === jobFilter : true;
    
    return matchesSearch && matchesJob;
  });

  const getScoreTheme = (score: number) => {
    if (score >= 80) return {
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        icon: CheckCircle2,
        label: 'High Match'
    };
    if (score >= 50) return {
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: AlertCircle,
        label: 'Potential'
    };
    return {
        color: 'text-rose-700',
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        icon: XCircle,
        label: 'Low Match'
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                   <div className="p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
                      <History className="w-6 h-6 text-indigo-600" />
                   </div>
                   Match History
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                  Timeline of AI candidate evaluations.
                </p>
             </div>
        </div>

        {/* Filters Toolbar */}
        <div className="sticky top-4 z-30 bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col sm:flex-row gap-2">
            {/* Search */}
            <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search by name or job role..." 
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border-transparent bg-transparent text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-100 transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="w-px h-8 bg-gray-200 my-auto hidden sm:block"></div>

            {/* Filter */}
            <div className="relative min-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                </div>
                <select 
                  className="block w-full pl-9 pr-8 py-2.5 rounded-xl border-transparent bg-transparent text-gray-700 font-medium focus:bg-white focus:ring-2 focus:ring-indigo-100 appearance-none cursor-pointer outline-none hover:bg-gray-50 transition-colors"
                  value={jobFilter}
                  onChange={(e) => setJobFilter(e.target.value)}
                >
                    <option value="">All Job Profiles</option>
                    {uniqueJobs.map((j: any) => (
                        <option key={j} value={j}>{j}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
            </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
            {loading ? (
                <div className="py-24 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                    <p className="text-gray-400 font-medium">Retrieving match data...</p>
                </div>
            ) : filteredMatches.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">No evaluations found</h3>
                    <p className="text-gray-500 max-w-sm">
                        Try adjusting your search filters or run a new Smart Match analysis.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredMatches.map((m) => {
                        const theme = getScoreTheme(m.match_score);
                        const ThemeIcon = theme.icon;

                        return (
                            <div 
                                key={m.id} 
                                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Decorative Gradient on Hover */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                                <div className="flex flex-col md:flex-row gap-6">
                                    
                                    {/* Left: Info & Context */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold border border-white shadow-sm">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 leading-none">
                                                        {m.resume?.candidate_name || 'Unknown Candidate'}
                                                    </h3>
                                                    <span className="text-xs text-gray-400 font-mono mt-1 block">
                                                        ID: {m.id.substring(0,8)}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* Mobile Score View */}
                                            <div className={`md:hidden px-3 py-1 rounded-full text-xs font-bold border ${theme.bg} ${theme.color} ${theme.border}`}>
                                                {m.match_score}%
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {m.job ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200">
                                                    <Briefcase className="w-3.5 h-3.5" />
                                                    {m.job.title}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-gray-50 text-gray-400 border border-gray-200 border-dashed">
                                                    <Sparkles className="w-3.5 h-3.5" />
                                                    Ad-hoc Analysis
                                                </span>
                                            )}
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-gray-400">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(m.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Middle: The AI Reason (The most important part) */}
                                    <div className="flex-[2] bg-gray-50 rounded-xl p-4 border border-gray-100 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-4 h-4 text-indigo-500" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">AI Insight</span>
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {m.match_reason}
                                        </p>
                                    </div>

                                    {/* Right: Score (Desktop) */}
                                    <div className="hidden md:flex flex-col items-center justify-center w-32 shrink-0 border-l border-gray-100 pl-6">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${theme.bg} ${theme.border} ${theme.color}`}>
                                            <span className="text-xl font-bold">{m.match_score}</span>
                                        </div>
                                        <div className={`mt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${theme.color}`}>
                                            <ThemeIcon className="w-3.5 h-3.5" />
                                            {theme.label}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        
        {/* Footer Stats */}
        {!loading && filteredMatches.length > 0 && (
             <div className="flex justify-center">
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-xs font-medium text-gray-500">
                    <span>Total Evaluations:</span>
                    <span className="text-gray-900 font-bold">{filteredMatches.length}</span>
                 </div>
             </div>
        )}
      </div>
    </div>
  );
};

export default MatchHistory;