import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  User, 
  TrendingUp,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface Props {
  candidateName: string;
  score: number;
  reason: string;
  missingSkills: string[];
}

const CandidateMatchCard: React.FC<Props> = ({ candidateName, score, reason, missingSkills }) => {
  
  // Determine styling based on score
  let theme = {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-700',
    icon: AlertCircle,
    barColor: 'bg-gray-400',
    lightBg: 'bg-gray-50',
    badgeColor: 'bg-gray-100 text-gray-600'
  };

  if (score >= 80) {
    theme = {
      bg: 'hover:border-emerald-200',
      border: 'border-emerald-100',
      text: 'text-emerald-700',
      icon: CheckCircle2,
      barColor: 'bg-emerald-500',
      lightBg: 'bg-emerald-50/50',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    };
  } else if (score >= 50) {
    theme = {
      bg: 'hover:border-amber-200',
      border: 'border-amber-100',
      text: 'text-amber-700',
      icon: AlertCircle,
      barColor: 'bg-amber-500',
      lightBg: 'bg-amber-50/50',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-100'
    };
  } else {
    theme = {
      bg: 'hover:border-rose-200',
      border: 'border-rose-100',
      text: 'text-rose-700',
      icon: XCircle,
      barColor: 'bg-rose-500',
      lightBg: 'bg-rose-50/50',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-100'
    };
  }

  const Icon = theme.icon;

  return (
    <div className={`
        group relative bg-white rounded-2xl border border-gray-100 
        p-6 shadow-sm hover:shadow-lg transition-all duration-300
        ${theme.bg}
    `}>
       <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left: Avatar & Score */}
          <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-48 shrink-0">
              <div className="flex items-center gap-3 w-full">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                      <User className="w-6 h-6" />
                  </div>
                  <div className="md:hidden">
                      <h3 className="font-bold text-gray-900 text-lg">{candidateName}</h3>
                  </div>
              </div>

              <div className="w-full space-y-2">
                  <div className={`flex items-center justify-between px-3 py-1.5 rounded-lg border ${theme.badgeColor}`}>
                      <span className="text-xs font-bold uppercase tracking-wider">Match</span>
                      <div className="flex items-center gap-1.5 font-extrabold text-lg">
                          <Icon className="w-5 h-5" />
                          {score}%
                      </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${theme.barColor}`} 
                        style={{ width: `${score}%` }}
                      />
                  </div>
              </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 space-y-4">
              <div className="hidden md:flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 text-xl">{candidateName}</h3>
                  <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                  </button>
              </div>

              {/* AI Analysis Box */}
              <div className={`p-4 rounded-xl ${theme.lightBg} border ${theme.border}`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-1.5 ${theme.text}`}>
                      <TrendingUp className="w-3.5 h-3.5" />
                      AI Analysis
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                      {reason}
                  </p>
              </div>

              {/* Missing Skills (Gap Analysis) */}
              {missingSkills.length > 0 && (
                  <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Skill Gap Analysis
                      </h4>
                      <div className="flex flex-wrap gap-2">
                          {missingSkills.map((skill, i) => (
                              <span 
                                key={i} 
                                className="px-2.5 py-1 bg-white border border-rose-100 text-rose-600 text-xs font-medium rounded-md shadow-sm"
                              >
                                  {skill}
                              </span>
                          ))}
                      </div>
                  </div>
              )}
          </div>
       </div>
    </div>
  );
};

export default CandidateMatchCard;