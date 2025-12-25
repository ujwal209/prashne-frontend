import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import CandidateMatchCard from '../../components/CandidateMatchCard';
import ResumeCard from '../../components/ResumeCard';
import { 
  Search, 
  Loader2, 
  Sparkles, 
  BrainCircuit, 
  Users, 
  CheckCircle2, 
  Briefcase,
  X,
  ChevronDown,
  ArrowRight,
  Filter
} from 'lucide-react';

interface MatchResult {
  candidate_id: string;
  candidate_name: string;
  score: number;
  reason: string;
  missing_skills: string[];
}

const SmartMatch: React.FC = () => {
  const [jdText, setJdText] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('');
  const [results, setResults] = useState<MatchResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  
  // Selection State
  const [showCandidateSelector, setShowCandidateSelector] = useState(false);
  const [allCandidates, setAllCandidates] = useState<any[]>([]);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  useEffect(() => {
    api.get('/jobs')
       .then(res => setJobs(res.data))
       .catch(err => console.error("Failed to load jobs", err));
  }, []);

  const handleJobSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const jobId = e.target.value;
      if (!jobId) return;

      const job = jobs.find(j => j.id === jobId);
      if (job) {
          setSelectedJobId(jobId);
          const fullJd = `
Role: ${job.title}
Location: ${job.location || 'Not specified'}
Salary: ${job.salary || 'Not specified'}

Description:
${job.description}

Requirements:
${Array.isArray(job.requirements) ? job.requirements.join('\n- ') : job.requirements}
          `.trim();
          
          setJdText(fullJd);
      }
  };

  const toggleCandidateSelection = async () => {
      if (!showCandidateSelector) {
          setLoadingCandidates(true);
          try {
              const res = await api.get('/resumes');
              setAllCandidates(res.data);
          } catch(e) {
              console.error(e);
          } finally {
              setLoadingCandidates(false);
          }
      }
      setShowCandidateSelector(!showCandidateSelector);
  };

  const handleSelectCandidate = (id: string) => {
      if (selectedCandidateIds.includes(id)) {
          setSelectedCandidateIds(prev => prev.filter(c => c !== id));
      } else {
          setSelectedCandidateIds(prev => [...prev, id]);
      }
  };

  const handleMatch = async () => {
    if (!jdText.trim()) return;
    
    setIsAnalyzing(true);
    setResults([]);
    setHasSearched(true);
    setShowCandidateSelector(false);
    
    try {
      const payload: any = { 
          jd_text: jdText,
          job_id: selectedJobId || null
      };

      if (selectedCandidateIds.length > 0) {
          payload.candidate_ids = selectedCandidateIds;
      }

      const res = await api.post('/jobs/match', payload);
      setResults(res.data);
    } catch (error) {
      console.error("Match error", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans relative">
       
       {/* Modal Overlay for Candidate Selection */}
       {showCandidateSelector && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity" onClick={() => setShowCandidateSelector(false)} />
               <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                   
                   {/* Modal Header */}
                   <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                       <div>
                           <h3 className="text-xl font-bold text-gray-900">Select Candidates</h3>
                           <p className="text-sm text-gray-500">Choose which profiles to analyze against the job description.</p>
                       </div>
                       <button 
                         onClick={() => setShowCandidateSelector(false)}
                         className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                       >
                           <X className="w-6 h-6" />
                       </button>
                   </div>

                   {/* Modal Toolbar */}
                   <div className="px-6 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex gap-2">
                             <button 
                               onClick={() => setSelectedCandidateIds(allCandidates.map(c => c.id))}
                               className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm"
                             >
                                Select All
                             </button>
                             <button 
                               onClick={() => setSelectedCandidateIds([])}
                               className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-red-300 hover:text-red-600 transition-all shadow-sm"
                             >
                                Clear Selection
                             </button>
                        </div>
                        <span className="text-sm font-semibold text-indigo-600">
                            {selectedCandidateIds.length} Selected
                        </span>
                   </div>

                   {/* Modal Content */}
                   <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                        {loadingCandidates ? (
                            <div className="h-full flex flex-col items-center justify-center">
                                <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                                <p className="text-gray-500">Loading candidate pool...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {allCandidates.map(c => {
                                    const isSelected = selectedCandidateIds.includes(c.id);
                                    return (
                                        <div 
                                            key={c.id} 
                                            onClick={() => handleSelectCandidate(c.id)}
                                            className={`
                                                relative cursor-pointer transition-all duration-200 rounded-xl border-2
                                                ${isSelected 
                                                    ? 'border-indigo-500 ring-4 ring-indigo-500/10 bg-indigo-50/10' 
                                                    : 'border-transparent hover:border-indigo-200'
                                                }
                                            `}
                                        >
                                            <div className="pointer-events-none">
                                                <ResumeCard candidate={c} />
                                            </div>
                                            {isSelected && (
                                                <div className="absolute top-3 right-3 bg-indigo-600 text-white p-1 rounded-full shadow-lg scale-100 transition-transform">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                   </div>

                   {/* Modal Footer */}
                   <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
                       <button 
                         onClick={() => setShowCandidateSelector(false)}
                         className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
                       >
                           Confirm Selection
                       </button>
                   </div>
               </div>
           </div>
       )}


       <div className="max-w-[1600px] mx-auto">
            {/* Main Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-200">
                        <BrainCircuit className="w-8 h-8 text-white" />
                    </div>
                    Smart Match AI
                </h1>
                <p className="text-gray-500 mt-2 text-lg ml-1">
                    Rank your talent pool against specific job requirements using AI.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                
                {/* Left Column: Configuration (Sticky) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-6">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Filter className="w-5 h-5 text-indigo-500" />
                                Match Configuration
                            </h2>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            
                            {/* Job Selector */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Select Job Profile</label>
                                <div className="relative">
                                    <select 
                                        className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-medium focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white outline-none appearance-none transition-all cursor-pointer"
                                        onChange={handleJobSelect}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>-- Choose a Job --</option>
                                        {jobs.map(job => (
                                            <option key={job.id} value={job.id}>
                                                {job.title}
                                            </option>
                                        ))}
                                    </select>
                                    <Briefcase className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Candidate Selector */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Candidate Pool</label>
                                <button 
                                    onClick={toggleCandidateSelection}
                                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Select Candidates</p>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {selectedCandidateIds.length > 0 ? `${selectedCandidateIds.length} profiles selected` : 'Entire talent pool'}
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-gray-300 group-hover:text-indigo-500" />
                                </button>
                            </div>

                            {/* JD Text Area */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-sm font-bold text-gray-700">Job Description</label>
                                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Required</span>
                                </div>
                                <textarea 
                                    className="w-full h-48 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm leading-relaxed text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none resize-none transition-all shadow-inner"
                                    placeholder="Paste the job description, requirements, and responsibilities here..."
                                    value={jdText}
                                    onChange={(e) => setJdText(e.target.value)}
                                />
                            </div>

                            {/* Action Button */}
                            <button 
                                onClick={handleMatch}
                                disabled={isAnalyzing || !jdText}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all flex items-center justify-center gap-3"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-6 h-6" />
                                        <span>Run Match Analysis</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between">
                         <h2 className="text-xl font-bold text-gray-900">Analysis Results</h2>
                         {results.length > 0 && (
                             <span className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-600 shadow-sm">
                                 {results.length} Matches Found
                             </span>
                         )}
                    </div>

                    <div className="min-h-[500px]">
                        {isAnalyzing ? (
                            <div className="h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <div className="relative w-24 h-24 mb-6">
                                     <div className="absolute inset-0 border-4 border-indigo-50 rounded-full"></div>
                                     <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                                     <div className="absolute inset-0 flex items-center justify-center">
                                         <BrainCircuit className="w-10 h-10 text-indigo-600 animate-pulse" />
                                     </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Profiles</h3>
                                <p className="text-gray-500">Our AI is reading resumes and comparing skills...</p>
                            </div>
                        ) : !hasSearched ? (
                            <div className="h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-gray-200 text-center p-8">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <Search className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Match</h3>
                                <p className="text-gray-500 max-w-sm mx-auto mb-8">
                                    Select a job profile or paste a description on the left to start ranking candidates.
                                </p>
                                <div className="flex gap-2 text-sm text-gray-400">
                                    <div className="px-3 py-1 bg-gray-50 rounded-md border border-gray-100">✨ AI Scoring</div>
                                    <div className="px-3 py-1 bg-gray-50 rounded-md border border-gray-100">📊 Skill Gap Analysis</div>
                                </div>
                            </div>
                        ) : results.length === 0 ? (
                            <div className="h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <X className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No Matches Found</h3>
                                <p className="text-gray-500">
                                    None of the selected candidates matched the criteria sufficiently. Try adjusting the job description.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {results.map((r, index) => (
                                    <div key={r.candidate_id} className="animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                        <CandidateMatchCard 
                                           candidateName={r.candidate_name}
                                           score={r.score}
                                           reason={r.reason}
                                           missingSkills={r.missing_skills}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
       </div>
    </div>
  );
};

export default SmartMatch;