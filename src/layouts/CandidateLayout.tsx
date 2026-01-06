import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    Menu, X, LogOut, LayoutDashboard, Code2, PlayCircle, Trophy, User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CandidateLayout: React.FC = () => {
    const { signOut, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await signOut();
        navigate('/auth/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/candidate/dashboard', icon: LayoutDashboard },
        { name: 'Practice Arena', path: '/candidate/practice', icon: Code2 },
        { name: 'Mock Interviews', path: '/candidate/interviews', icon: PlayCircle },
        { name: 'Leaderboard', path: '/candidate/leaderboard', icon: Trophy },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans">

            {/* --- SIDEBAR --- */}
            <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-slate-200">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-slate-800 text-lg">
                        <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                            <Code2 className="w-5 h-5" />
                        </div>
                        Prashne
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    <div className="px-2 mb-4 mt-2">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Candidate Portal</p>
                    </div>
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                                {item.name}
                            </NavLink>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100 mb-2">
                    <div className="flex items-center gap-3 p-2 rounded-xl border border-slate-100 bg-slate-50">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-700 truncate">{user?.email}</p>
                            <p className="text-[10px] text-slate-500">Candidate</p>
                        </div>
                        <button onClick={handleLogout} className="text-slate-400 hover:text-rose-500">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
                    <span className="font-bold text-slate-900">Prashne Candidate</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </header>

                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-white p-4 pt-20">
                        <nav className="space-y-4">
                            {navItems.map(item => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-lg font-medium text-slate-700 py-2 border-b border-slate-100"
                                >
                                    <item.icon className="w-5 h-5 text-indigo-600" /> {item.name}
                                </NavLink>
                            ))}
                            <button onClick={handleLogout} className="flex items-center gap-3 text-lg font-medium text-rose-600 py-2 mt-8">
                                <LogOut className="w-5 h-5" /> Sign Out
                            </button>
                        </nav>
                    </div>
                )}

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-white">
                    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CandidateLayout;
