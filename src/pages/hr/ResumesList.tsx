import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../lib/api';
import ResumeCard from '../../components/ResumeCard';
import { 
  Search, 
  Loader2, 
  Users, 
  Filter, 
  RefreshCw,
  FolderOpen 
} from 'lucide-react';
import ResumeDetailModal from '../../components/ResumeDetailModal';

const ResumesList: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';

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

  const handleDelete = async (id: string) => {
      if(!window.confirm("Are you sure you want to delete this resume? This action cannot be undone.")) return;
      try {
          await api.delete(`/resumes/${id}`);
          setCandidates(prev => prev.filter(c => c.id !== id));
      } catch (err) {
          console.error("Delete failed", err);
          alert("Failed to delete resume");
          fetchCandidates(); // Re-sync on error
      }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter(c => 
      (c.candidate_name && c.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.raw_ai_response?.email && c.raw_ai_response.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.raw_ai_response?.skills && c.raw_ai_response.skills.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans relative">
       {/* Modal Layer */}
       {selectedCandidate && (
           <ResumeDetailModal 
              candidate={selectedCandidate} 
              onClose={() => setSelectedCandidate(null)} 
           />
       )}

       <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                      <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                          <Users className="w-6 h-6 text-white" />
                      </div>
                      Talent Pool
                  </h1>
                  <p className="text-gray-500 mt-2 text-lg ml-1">
                      Manage and analyze your processed candidate profiles.
                  </p>
              </div>
              
              <div className="flex items-center gap-3">
                  <button 
                    onClick={fetchCandidates}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white bg-gray-100 rounded-lg transition-all border border-transparent hover:border-gray-200 shadow-sm"
                    title="Refresh List"
                  >
                      <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <div className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-500" />
                      {filteredCandidates.length} <span className="text-gray-400 font-normal">Candidates</span>
                  </div>
              </div>
          </div>

          {/* Search Context Bar (Only visible if searching) */}
          {searchTerm && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 flex items-center gap-3 text-indigo-800 animate-fade-in">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">
                      Showing results for: <span className="font-bold">"{searchTerm}"</span>
                  </span>
                  <button 
                    onClick={() => window.history.back()} // Or specific clear logic
                    className="ml-auto text-xs font-semibold hover:underline"
                  >
                      Clear Search
                  </button>
              </div>
          )}

          {/* Main Content */}
          {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                 <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                 <p className="text-gray-400 font-medium">Loading talent pool...</p>
              </div>
          ) : filteredCandidates.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 border-dashed p-16 flex flex-col items-center justify-center text-center shadow-sm">
                 <div className="p-4 bg-gray-50 rounded-full mb-4">
                    {searchTerm ? <Search className="w-10 h-10 text-gray-300" /> : <FolderOpen className="w-10 h-10 text-gray-300" />}
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {searchTerm ? 'No matches found' : 'Talent pool is empty'}
                 </h3>
                 <p className="text-gray-500 max-w-sm mx-auto">
                   {searchTerm 
                      ? `We couldn't find any candidates matching "${searchTerm}". Try different keywords.` 
                      : "Upload resumes to the system to start building your talent pool."}
                 </p>
              </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates.map(candidate => (
                   <div key={candidate.id} className="h-full">
                      <ResumeCard 
                          candidate={candidate} 
                          onDelete={handleDelete}
                          onView={(c) => setSelectedCandidate(c)}
                      />
                   </div>
                ))}
             </div>
          )}
       </div>
    </div>
  );
};

export default ResumesList;