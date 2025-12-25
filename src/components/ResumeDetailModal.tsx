import React from 'react';
import { 
  X, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Phone, 
  ExternalLink,
  User,
  MapPin,
  FileText
} from 'lucide-react';

interface ResumeDetailModalProps {
  candidate: any;
  onClose: () => void;
}

const ResumeDetailModal: React.FC<ResumeDetailModalProps> = ({ candidate, onClose }) => {
  if (!candidate) return null;

  const { full_name, email, phone, skills, experience_years, education, summary, location } = candidate.raw_ai_response || {};
  
  // Safely parse education if it's a string, otherwise use as is
  let eduList = [];
  try {
      eduList = typeof education === 'string' ? JSON.parse(education) : (education || []);
  } catch (e) {
      console.error("Failed to parse education", e);
  }

  // Get Initials
  const getInitials = (name: string) => {
      return name ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'U';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-gray-900/5">
        
        {/* Header Section */}
        <div className="relative px-8 pt-8 pb-6 border-b border-gray-100 bg-gradient-to-br from-white to-gray-50/50">
           {/* Close Button */}
           <button 
             onClick={onClose} 
             className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
           >
             <X className="w-5 h-5" />
           </button>

           <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
               {/* Avatar */}
               <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-200 shrink-0">
                   {getInitials(candidate.candidate_name || full_name)}
               </div>
               
               <div className="flex-1 min-w-0 space-y-2">
                   <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                       {candidate.candidate_name || full_name || "Unknown Candidate"}
                   </h2>
                   
                   <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                       {email && (
                           <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                               <Mail className="w-4 h-4 text-gray-400" /> {email}
                           </a>
                       )}
                       {phone && (
                           <span className="flex items-center gap-2">
                               <Phone className="w-4 h-4 text-gray-400" /> {phone}
                           </span>
                       )}
                       {location && (
                           <span className="flex items-center gap-2">
                               <MapPin className="w-4 h-4 text-gray-400" /> {location}
                           </span>
                       )}
                   </div>
               </div>

               {/* Exp Badge */}
               {experience_years !== undefined && (
                   <div className="hidden sm:flex flex-col items-end shrink-0">
                       <span className="text-3xl font-bold text-indigo-600 tracking-tight">{experience_years}</span>
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Years Exp</span>
                   </div>
               )}
           </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 bg-white">
           
           {/* Summary */}
           {summary && (
               <section>
                   <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                       <User className="w-4 h-4 text-indigo-500" /> Professional Summary
                   </h3>
                   <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                       {summary}
                   </p>
               </section>
           )}

           {/* Two Column Layout for Skills & Education */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               
               {/* Skills Column */}
               <section>
                   <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                       <Briefcase className="w-4 h-4 text-indigo-500" /> Key Skills
                   </h3>
                   <div className="flex flex-wrap gap-2">
                       {skills && skills.length > 0 ? skills.map((skill: string, i: number) => (
                           <span 
                             key={i} 
                             className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg shadow-sm"
                           >
                               {skill}
                           </span>
                       )) : (
                           <span className="text-gray-400 text-sm italic">No specific skills extracted.</span>
                       )}
                   </div>
               </section>

               {/* Education Column */}
               <section>
                   <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                       <GraduationCap className="w-4 h-4 text-indigo-500" /> Education
                   </h3>
                   <div className="space-y-4">
                       {Array.isArray(eduList) && eduList.length > 0 ? eduList.map((edu: any, i: number) => (
                           <div key={i} className="flex gap-4 group">
                               <div className="mt-1 flex flex-col items-center">
                                   <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-indigo-500 transition-colors"></div>
                                   {i !== eduList.length - 1 && <div className="w-px h-full bg-gray-200 my-1"></div>}
                               </div>
                               <div>
                                   <p className="font-bold text-gray-900 text-sm">{edu.degree || edu.qualification || "Degree Not Specified"}</p>
                                   <p className="text-xs font-medium text-gray-500">{edu.school || edu.institution || "Institution Not Specified"}</p>
                                   {edu.year && <p className="text-xs text-gray-400 mt-0.5">{edu.year}</p>}
                               </div>
                           </div>
                       )) : (
                           <p className="text-sm text-gray-400 italic">No education history available.</p>
                       )}
                   </div>
               </section>
           </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">
                Parsed on {new Date(candidate.created_at).toLocaleDateString()}
            </span>

            {candidate.cloudinary_url && (
                <a 
                   href={candidate.cloudinary_url}
                   target="_blank"
                   rel="noopener noreferrer" 
                   className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-gray-200 hover:shadow-xl hover:-translate-y-0.5"
                >
                    <FileText className="w-4 h-4" /> View Original Resume
                </a>
            )}
        </div>

      </div>
    </div>
  );
};

export default ResumeDetailModal;