import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LeaderboardEntry {
    user_id: string;
    name: string;
    email: string;
    role: string;
    count: number;
    rank: number;
}

const LeaderboardWidget: React.FC = () => {
    const { user } = useAuth();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get('/analytics/leaderboard');
                setLeaderboard(res.data);
            } catch (err) {
                console.error("Failed to load leaderboard", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const topThree = leaderboard.slice(0, 3);
    const others = leaderboard.slice(3);

    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <h3 className="font-bold text-gray-900">Team Leaderboard</h3>
                </div>
                <div className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-md shadow-sm">
                    This Month
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-16 bg-gray-100 rounded-xl"></div>
                        ))}
                    </div>
                ) : leaderboard.length === 0 ? (
                     <div className="text-center py-10 text-gray-400">
                        <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-20" />
                        <p>No activity yet.</p>
                     </div>
                ) : (
                    <div className="space-y-6">
                        {/* Top 3 Podium Cards */}
                        <div className="grid grid-cols-1 gap-3">
                            {topThree.map((entry) => {
                                let rankColor = 'border-gray-200 bg-white';
                                let icon = <Medal className="w-5 h-5 text-gray-400" />;
                                
                                if (entry.rank === 1) {
                                    rankColor = 'border-amber-200 bg-amber-50/50';
                                    icon = <Crown className="w-5 h-5 text-amber-500 fill-amber-100" />;
                                } else if (entry.rank === 2) {
                                    rankColor = 'border-slate-300 bg-slate-50/50';
                                    icon = <Medal className="w-5 h-5 text-slate-400" />;
                                } else if (entry.rank === 3) {
                                    rankColor = 'border-orange-200 bg-orange-50/40';
                                    icon = <Medal className="w-5 h-5 text-orange-400" />;
                                }

                                const isMe = user?.id === entry.user_id || entry.email === user?.email;

                                return (
                                    <div 
                                        key={entry.user_id} 
                                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-transform hover:scale-[1.02] ${rankColor} ${isMe ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
                                    >
                                        <div className="flex-shrink-0 font-bold text-lg w-6 text-center text-gray-400">
                                            #{entry.rank}
                                        </div>
                                        <div className="flex-shrink-0">
                                             <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center font-bold text-indigo-600 shadow-sm relative">
                                                {entry.name.charAt(0).toUpperCase()}
                                                <div className="absolute -top-1 -right-1">{entry.rank === 1 && icon}</div>
                                             </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-bold text-sm truncate ${isMe ? 'text-indigo-700' : 'text-gray-900'}`}>
                                                {entry.name} {isMe && '(You)'}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">{entry.count} Resumes Processed</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* The Rest */}
                        {others.length > 0 && (
                            <div className="space-y-1 pt-4 border-t border-gray-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Honorable Mentions</h4>
                                <div className="space-y-2">
                                    {others.map((entry) => {
                                        const isMe = user?.id === entry.user_id || entry.email === user?.email;
                                        return (
                                            <div 
                                                key={entry.user_id} 
                                                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${isMe ? 'bg-indigo-50 border border-indigo-100' : ''}`}
                                            >
                                                <span className="text-sm font-semibold text-gray-400 w-6 text-center">#{entry.rank}</span>
                                                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center">
                                                    {entry.name.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm font-medium ${isMe ? 'text-indigo-700' : 'text-gray-700'}`}>
                                                        {entry.name}
                                                    </p>
                                                </div>
                                                <div className="text-sm font-bold text-gray-900">
                                                    {entry.count}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaderboardWidget;
