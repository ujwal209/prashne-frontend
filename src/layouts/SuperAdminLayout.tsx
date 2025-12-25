import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  ShieldAlert, 
  LogOut, 
  Menu,
  ChevronRight,
  PieChart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SuperAdminLayout: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Global Overview', path: '/admin', icon: PieChart },
    { name: 'Tenants / Companies', path: '/admin/companies', icon: Building2 },
    { name: 'User Provisioning', path: '/admin/users', icon: Users },
    { name: 'Access Control', path: '/admin/access', icon: ShieldAlert },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 flex-col bg-[#0f172a] text-white border-r border-slate-800 shadow-2xl">
        {/* Brand */}
        <div className="h-20 flex items-center px-8 border-b border-slate-800/60 bg-[#020617]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/20">
              <ShieldAlert className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide">PRASHNE</h1>
              <span className="text-[10px] font-bold tracking-wider text-red-500 bg-red-950/30 px-2 py-0.5 rounded-full border border-red-900/50 uppercase">
                Super Admin
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">Main Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/20'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                {item.name}
              </div>
              <ChevronRight className={`h-4 w-4 opacity-0 transition-all -translate-x-2 ${'group-hover:opacity-100 group-hover:translate-x-0'}`} />
            </NavLink>
          ))}
        </nav>

        {/* User Footer */}
        <div className="border-t border-slate-800 bg-[#020617] p-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-inner">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-white">Super Admin</p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:bg-red-950/30 hover:text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex h-16 items-center justify-between bg-white px-4 border-b border-gray-200">
          <div className="flex items-center gap-2 font-bold text-slate-900">
             <ShieldAlert className="h-6 w-6 text-red-600" />
             PRASHNE ADMIN
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-500">
            <Menu />
          </button>
        </header>

        {/* Scrollable Canvas */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-10 relative">
          <div className="max-w-7xl mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
