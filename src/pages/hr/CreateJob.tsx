import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/api';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Plus, 
  Loader2, 
  Save, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';

const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: ''
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      setLoading(true);
      api.get('/jobs').then(res => {
         const job = res.data.find((j: any) => j.id === id);
         if (job) {
             setFormData({
                 title: job.title,
                 description: job.description,
                 requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
                 location: job.location || '',
                 salary: job.salary || ''
             });
         }
      }).catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleGenerate = async () => {
      if(!aiPrompt.trim()) return;
      setGenerating(true);
      try {
          const res = await api.post('/jobs/generate', { prompt: aiPrompt });
          const data = res.data;
          
          setFormData({
              title: data.title || '',
              description: data.description || '',
              requirements: Array.isArray(data.requirements) ? data.requirements.join('\n') : (data.requirements || ''),
              location: data.location || '',
              salary: data.salary || ''
          });
      } catch (err) {
          console.error("AI Gen Failed", err);
          alert("Failed to generate job description");
      } finally {
          setGenerating(false);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
          ...formData,
          requirements: formData.requirements.split('\n').filter(line => line.trim() !== '')
      };
      
      if (isEditing && id) {
          await api.put(`/jobs/${id}`, payload);
      } else {
          await api.post('/jobs', payload);
      }
      navigate('/hr/jobs');
    } catch (error) {
      console.error("Failed to save job", error);
      alert("Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading && isEditing && !formData.title) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 animate-spin text-violet-600" />
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button 
              onClick={() => navigate('/hr/jobs')} 
              className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition mb-2 group"
            >
              <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to Jobs
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {isEditing ? 'Edit Job Posting' : 'Create New Opportunity'}
            </h1>
            <p className="text-gray-500 mt-1 text-lg">
              {isEditing ? 'Refine the details below.' : 'Find your next star employee.'}
            </p>
          </div>
        </div>

        {/* AI Generator Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 rounded-3xl p-1 shadow-xl shadow-indigo-200/50">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-pink-500 opacity-20 rounded-full blur-3xl"></div>
            
            <div className="relative bg-white/10 backdrop-blur-md rounded-[20px] p-6 sm:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="p-4 bg-white/20 rounded-2xl shadow-inner backdrop-blur-sm shrink-0">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-bold text-white">AI Assistant</h3>
                        <p className="text-indigo-100/90 text-sm leading-relaxed max-w-xl">
                           Don't want to type? Just describe the role (e.g., "Senior React Dev, $140k, Remote") and let our AI draft the entire listing for you.
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <input 
                       type="text" 
                       placeholder="Describe the role here..." 
                       className="flex-1 px-5 py-3.5 rounded-xl bg-white/95 border-0 text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-white/30 focus:outline-none shadow-lg transition-all"
                       value={aiPrompt}
                       onChange={(e) => setAiPrompt(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button 
                      type="button"
                      onClick={handleGenerate} 
                      disabled={generating || !aiPrompt}
                      className="px-8 py-3.5 bg-indigo-900 text-white font-semibold rounded-xl hover:bg-indigo-950 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                    >
                        {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Generate</>}
                    </button>
                </div>
            </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
          
          <div className="p-8 sm:p-10 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Job Title */}
                  <div className="md:col-span-2 group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Job Title</label>
                    <div className="relative transition-all duration-300 focus-within:-translate-y-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                        </div>
                        <input 
                          type="text" 
                          name="title" 
                          required
                          placeholder="e.g. Senior Backend Engineer"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-violet-100 focus:border-violet-500 focus:bg-white outline-none transition-all font-medium"
                          value={formData.title}
                          onChange={handleChange}
                        />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Location</label>
                    <div className="relative transition-all duration-300 focus-within:-translate-y-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                        </div>
                        <input 
                          type="text" 
                          name="location" 
                          placeholder="e.g. Remote / New York"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-violet-100 focus:border-violet-500 focus:bg-white outline-none transition-all"
                          value={formData.location}
                          onChange={handleChange}
                        />
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Salary Range</label>
                    <div className="relative transition-all duration-300 focus-within:-translate-y-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <DollarSign className="h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                        </div>
                        <input 
                          type="text" 
                          name="salary" 
                          placeholder="e.g. $120k - $150k"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-violet-100 focus:border-violet-500 focus:bg-white outline-none transition-all"
                          value={formData.salary}
                          onChange={handleChange}
                        />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Job Description</label>
                    <textarea 
                      name="description" 
                      required
                      rows={5}
                      placeholder="Describe the role responsibilities, company culture, and perks..."
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-violet-100 focus:border-violet-500 focus:bg-white outline-none transition-all resize-y leading-relaxed"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Requirements */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Requirements <span className="text-gray-400 font-normal">(One per line)</span></label>
                    <div className="relative">
                        <textarea 
                          name="requirements" 
                          rows={5}
                          placeholder={'5+ years React experience\nKnowledge of TypeScript\nStrong communication skills'}
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-violet-100 focus:border-violet-500 focus:bg-white outline-none transition-all resize-y font-mono text-sm leading-relaxed"
                          value={formData.requirements}
                          onChange={handleChange}
                        />
                         <div className="absolute top-3 right-3 pointer-events-none">
                            <div className="px-2 py-1 bg-white border border-gray-100 rounded-md shadow-sm text-xs text-gray-400">Markdown supported</div>
                         </div>
                    </div>
                  </div>
             </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-4">
              <button 
                type="button" 
                onClick={() => navigate('/hr/jobs')}
                className="px-6 py-2.5 rounded-xl text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                  Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 active:bg-violet-800 transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isEditing ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {isEditing ? 'Save Changes' : 'Post Job'}
              </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateJob;