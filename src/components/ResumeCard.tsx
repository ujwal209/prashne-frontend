import React from 'react';
import { 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Trash2, 
  User, 
  Briefcase, 
  FileText,
  Eye
} from 'lucide-react';

interface ResumeCardProps {
  candidate: {
    id: string;
    candidate_name: string;
    raw_ai_response: any;
    cloudinary_url: string;
    created_at: string;
    experience_years: number;
    // ... other fields
  };
  onDelete?: (id: string) => void;
  onView?: (candidate: any) => void;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ candidate, onDelete, onView, selected, onSelect }) => {
  const { full_name, skills, email } = candidate.raw_ai_response || {};
  const displayName = candidate.candidate_name || full_name || "Unknown Candidate";
  const experience = candidate.experience_years;
  
  // Format date
  const date = new Date(candidate.created_at).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  // Get Initials for Avatar
  const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
  };

  return (
    <div 
      className={`
        group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer
        ${selected 
            ? 'border-indigo-500 ring-4 ring-indigo-500/10 shadow-lg shadow-indigo-100' 
            : 'border-gray-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-gray-200/50'
        }
      `}
      onClick={() => onSelect && onSelect(candidate.id)}
    > 
      
      {/* Selection Checkbox (Visible if selected or on group hover if selectable) */}
      {(selected || onSelect) && (
          <div className={`
             absolute top-4 right-4 z-20 transition-all duration-200
             ${selected ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'}
          `}>
             <div className={`
                rounded-full p-1 shadow-sm transition-colors
                ${selected ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-300 hover:border-indigo-300 hover:text-indigo-500'}
             `}>
                 <CheckCircle2 className="w-5 h-5" />
             </div>
          </div>
      )}

      {/* Header Section */}
      <div className="p-6 pb-2 flex items-start gap-4">
          {/* Avatar Placeholder */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 font-bold text-sm shadow-sm">
              {displayName ? getInitials(displayName) : <User className="w-6 h-6" />}
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate leading-tight">
                  {displayName}
              </h3>
              
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {/* Experience Badge */}
                  {experience !== undefined && experience !== null ? (
                     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                        <Briefcase className="w-3 h-3" />
                        {experience} Yrs Exp
                     </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wide">
                        Entry Level
                     </span>
                  )}
                  
                  {/* Date */}
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                     <Calendar className="w-3 h-3" />
                     {date}
                  </span>
              </div>
          </div>
      </div>

      {/* Skills Section */}
      <div className="px-6 py-4 flex-1">
          <div className="flex flex-wrap gap-2">
            {skills && skills.length > 0 ? (
                skills.slice(0, 4).map((skill: string, index: number) => (
                    <span 
                        key={index} 
                        className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-lg font-medium shadow-sm"
                    >
                        {skill}
                    </span>
                ))
            ) : (
                <span className="text-sm text-gray-400 italic">Processing skills...</span>
            )}
            {skills && skills.length > 4 && (
                <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-50 rounded-lg">
                    +{skills.length - 4} more
                </span>
            )}
          </div>
      </div>

      {/* Footer / Actions */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between mt-auto">
          
          {/* Action: View PDF */}
          {candidate.cloudinary_url ? (
               <a 
                 href={candidate.cloudinary_url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 onClick={(e) => e.stopPropagation()}
                 className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors group/link"
               >
                   <FileText className="w-3.5 h-3.5" />
                   View PDF
                   <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
               </a>
          ) : (
               <span className="text-xs text-gray-400">No PDF</span>
          )}

          <div className="flex items-center gap-2">
              {/* Action: View Details */}
              {onView && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onView(candidate); }}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-gray-200"
                    title="View Analysis"
                  >
                      <Eye className="w-4 h-4" />
                  </button>
              )}

              {/* Action: Delete */}
              {onDelete && (
                  <button 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if(window.confirm("Are you sure you want to delete this resume?")) {
                            onDelete(candidate.id);
                        }
                    }}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-gray-200"
                    title="Delete Candidate"
                  >
                      <Trash2 className="w-4 h-4" />
                  </button>
              )}
          </div>
      </div>
    </div>
  );
};

export default ResumeCard;