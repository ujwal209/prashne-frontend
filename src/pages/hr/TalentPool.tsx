import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import ResumeCard from '../../components/ResumeCard';
import ResumeUpload from './ResumeUpload'; 
import { 
  Search, 
  Loader2, 
  Users, 
  Sparkles, 
  RefreshCw, 
  Plus,
  Layout,
  ArrowDown
} from 'lucide-react';

const TalentPool: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(true); // Toggle for upload section

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await api.get('/resumes');
      setCandidates(res.data);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleUploadSuccess = (newCandidate: any) => {
    fetchCandidates();
    // Optional: Scroll to list or auto-collapse upload
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-200">
                        <Layout className="w-6 h-6 text-white" />
                    </div>
                    Talent Pipeline
                </h1>
                <p className="text-gray-500 mt-2 text-lg ml-1">
                    Centralized hub for resume ingestion and candidate management.
                </p>
            </div>
            
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowUpload(!showUpload)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all shadow-sm
                    ${showUpload 
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                    }
                  `}
                >
                    {showUpload ? <ArrowDown className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showUpload ? 'Hide Upload' : 'Add Talent'}
                </button>
            </div>
        </div>

        {/* Upload Section (Collapsible) */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showUpload ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Add New Talent</h2>
                    </div>
                    {/* Embedding the ResumeUpload Component */}
                    <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-2 sm:p-4">
                        <ResumeUpload onUploadSuccess={handleUploadSuccess} />
                    </div>
                </div>
            </div>
        </div>

        {/* List Section */}
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">Recent Applicants</h2>
                    <span className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {candidates.length} Total
                    </span>
                </div>
                <button 
                    onClick={fetchCandidates}
                    className="p-2 text-gray-400 hover:text-indigo-600 bg-white hover:bg-indigo-50 rounded-lg transition-all border border-gray-200 shadow-sm"
                    title="Refresh List"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                    <p className="text-gray-400 font-medium">Syncing pipeline...</p>
                </div>
            ) : candidates.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-200 border-dashed p-16 flex flex-col items-center justify-center text-center">
                    <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <Users className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">The pipeline is empty</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        Use the upload section above to add resumes and start building your talent pool.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {candidates.map(candidate => (
                        <div key={candidate.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ResumeCard candidate={candidate} />
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default TalentPool;