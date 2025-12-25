import React, { useState, useEffect } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import api from '../../lib/api'; // Assumed import based on context
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Plus, 
  Loader2, 
  Trash2, 
  Edit2, 
  Search,
  ArrowRight,
  Filter
} from 'lucide-react';

const JobsList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Fetch Jobs
  useEffect(() => {
    setLoading(true);
    api.get('/jobs')
      .then(res => setJobs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Delete Handler
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) return;
    setIsDeleting(id);
    try {
      await api.delete(`/jobs/${id}`);
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch (error) {
      console.error("Failed to delete", error);
      alert("Failed to delete job");
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredJobs = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Active Listings</h1>
              <p className="text-gray-500 mt-2 text-lg">Manage your open roles and requirements.</p>
            </div>
            
            <NavLink 
              to="/hr/jobs/new" 
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> 
              <span>Create Job</span>
            </NavLink>
        </div>

        {/* Search Context Indicator (if searching) */}
        {searchTerm && (
          <div className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 w-fit">
            <Search className="w-4 h-4" />
            <span className="font-medium">Filtering results for: <span className="font-bold">"{searchTerm}"</span></span>
          </div>
        )}

        {/* Content Area */}
        {loading ? (
           <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
              <p className="text-gray-400 font-medium">Loading opportunities...</p>
           </div>
        ) : filteredJobs.length === 0 ? (
           <div className="bg-white rounded-3xl border border-gray-200 border-dashed p-16 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="p-4 bg-gray-50 rounded-full mb-4">
                 <Briefcase className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-6">
                {searchTerm ? `No matches found for "${searchTerm}". Try a different keyword.` : "You haven't posted any jobs yet. Create your first listing to start hiring."}
              </p>
              {!searchTerm && (
                <NavLink 
                  to="/hr/jobs/new"
                  className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1"
                >
                  Post a Job <ArrowRight className="w-4 h-4" />
                </NavLink>
              )}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
              >
                {/* Top Row: Icon & Actions */}
                <div className="flex justify-between items-start mb-5">
                    <div className="p-3 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl text-indigo-600 border border-indigo-100/50">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    
                    {/* Hover Actions */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                        <NavLink 
                          to={`/hr/jobs/edit/${job.id}`}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                            <Edit2 className="w-4 h-4" />
                        </NavLink>
                        <button 
                          onClick={() => handleDelete(job.id)}
                          disabled={isDeleting === job.id}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                            {isDeleting === job.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
                
                {/* Main Info */}
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-indigo-700 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {job.description || "No description provided."}
                  </p>
                </div>

                {/* Metadata Tags */}
                <div className="space-y-3 pt-4 border-t border-gray-50 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {job.location && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-md">
                             <MapPin className="w-3.5 h-3.5 text-gray-400" /> 
                             {job.location}
                          </div>
                      )}
                      {job.salary && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-md">
                             <DollarSign className="w-3.5 h-3.5 text-gray-400" /> 
                             {job.salary}
                          </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                           <Calendar className="w-3.5 h-3.5" /> 
                           Posted {new Date(job.created_at || Date.now()).toLocaleDateString()}
                        </div>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                           Active
                        </span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;