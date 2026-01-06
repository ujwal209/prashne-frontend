import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import {
  LayoutDashboard,
  Building2,
  Users,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Plus,
  Search,
  Bell,
  Settings
=======
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  ChevronRight,
  Plus
>>>>>>> c22e57f15658acb56e240bc10a7e750daacbf34f
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SuperAdminLayout: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth/login');
  };

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard, exact: true },
<<<<<<< HEAD
    {
      name: 'Tenants',
      path: '/admin/companies',
      icon: Building2,
      subItems: [
        { name: 'Register Tenant', path: '/admin/companies/new', icon: Plus }
      ]
    },
    {
      name: 'User Management',
      path: '/admin/users',
      icon: Users,
      subItems: [
        { name: 'Provision User', path: '/admin/users/new', icon: Plus }
      ]
=======
    { 
        name: 'Tenants', 
        path: '/admin/companies', 
        icon: Building2,
        subItems: [
            { name: 'Register Tenant', path: '/admin/companies/new', icon: Plus }
        ]
    },
    { 
        name: 'User Management', 
        path: '/admin/users', 
        icon: Users,
        subItems: [
            { name: 'Provision User', path: '/admin/users/new', icon: Plus }
        ]
>>>>>>> c22e57f15658acb56e240bc10a7e750daacbf34f
    },
  ];

  // Helper to determine if a route is active
  const isRouteActive = (itemPath: string, exact: boolean = false) => {
<<<<<<< HEAD
    if (exact) return location.pathname === itemPath;
    return location.pathname.startsWith(itemPath);
=======
      if (exact) return location.pathname === itemPath;
      return location.pathname.startsWith(itemPath);
>>>>>>> c22e57f15658acb56e240bc10a7e750daacbf34f
  };

  const NavItem = ({ item, onClick }: { item: any, onClick?: () => void }) => {
    const active = isRouteActive(item.path, item.exact);
    const hasSubItems = item.subItems && item.subItems.length > 0;
<<<<<<< HEAD
    const [expanded, setExpanded] = useState(active);

    return (
      <div className="mb-2">
        <div className="px-3">
          <NavLink
            to={item.path}
            onClick={(e) => {
              if (hasSubItems) {
                // Optional: prevent default if you want click to just toggle expand
                // e.preventDefault();
                setExpanded(!expanded);
              }
              if (onClick) onClick();
            }}
            end={item.exact}
            className={`group relative flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${active && !hasSubItems
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-900/20'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`h-5 w-5 ${active ? 'text-indigo-200' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors duration-300`} />
              <span className="tracking-wide font-medium">{item.name}</span>
            </div>
            {hasSubItems ? (
              <ChevronRight className={`h-4 w-4 text-slate-600 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
            ) : (
              active && <div className="h-1.5 w-1.5 rounded-full bg-indigo-300 shadow-glow" />
            )}
          </NavLink>
        </div>

        {/* Sub Items */}
        {hasSubItems && expanded && (
          <div className="mt-1 ml-4 border-l-2 border-slate-800 pl-3 space-y-1 animate-in slide-in-from-left-2 duration-200">
            {item.subItems.map((sub: any) => {
              const subActive = location.pathname === sub.path;
              return (
                <NavLink
                  key={sub.path}
                  to={sub.path}
                  onClick={onClick}
                  className={`group flex items-center gap-3 rounded-lg px-4 py-2.5 text-xs font-medium transition-all duration-200 ${subActive
                      ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                    }`}
                >
                  <sub.icon className={`h-3.5 w-3.5 ${subActive ? 'text-indigo-400' : 'text-slate-600'}`} />
                  {sub.name}
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
=======

    return (
        <div className="mb-1">
            <NavLink
                to={item.path}
                onClick={onClick}
                end={item.exact}
                className={`group relative flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active && !hasSubItems // Only highlight parent if no sub-items are explicitly active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
                <div className="flex items-center gap-3">
                    <item.icon className={`h-4 w-4 ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    <span className="tracking-wide">{item.name}</span>
                </div>
                {active && !hasSubItems && <ChevronRight className="h-3 w-3 text-indigo-200" />}
            </NavLink>

            {/* Sub Items */}
            {hasSubItems && (
                <div className="mt-1 ml-4 border-l border-slate-700 pl-2 space-y-1">
                    {item.subItems.map((sub: any) => {
                        const subActive = location.pathname === sub.path;
                        return (
                            <NavLink
                                key={sub.path}
                                to={sub.path}
                                onClick={onClick}
                                className={`group flex items-center gap-3 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 ${
                                    subActive
                                    ? 'bg-indigo-500/20 text-indigo-300'
                                    : 'text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                <sub.icon className="h-3 w-3" />
                                {sub.name}
                            </NavLink>
                        );
                    })}
                </div>
            )}
        </div>
>>>>>>> c22e57f15658acb56e240bc10a7e750daacbf34f
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
<<<<<<< HEAD

      {/* --- SIDEBAR --- */}
      <aside className="hidden lg:flex w-72 flex-col bg-slate-950 text-white border-r border-slate-900 shadow-2xl z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-900 bg-slate-950/50 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/20">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="block font-bold text-lg tracking-tight text-white leading-none">Admin</span>
              <span className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">Console</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-8">
          <div className="px-7 mb-4">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Main Menu</span>
=======
      
      {/* --- SIDEBAR --- */}
      <aside className="hidden lg:flex w-64 flex-col bg-slate-900 text-white border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
               <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight">Admin Console</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          <div className="px-4 mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform</span>
>>>>>>> c22e57f15658acb56e240bc10a7e750daacbf34f
          </div>
          {navItems.map((item) => <NavItem key={item.name} item={item} />)}
        </nav>

<<<<<<< HEAD
        <div className="p-6 border-t border-slate-900 bg-slate-950/50">
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold ring-2 ring-slate-900">SA</div>
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">Administrator</p>
              <p className="truncate text-xs text-slate-500">Super Admin</p>
            </div>
            <button onClick={handleLogout} className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 hover:bg-rose-500/10 rounded-lg"><LogOut className="h-4 w-4" /></button>
=======
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">SA</div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-semibold text-white">Administrator</p>
              <p className="truncate text-[10px] text-slate-400">{user?.email}</p>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-white"><LogOut className="h-4 w-4" /></button>
>>>>>>> c22e57f15658acb56e240bc10a7e750daacbf34f
          </div>
        </div>
      </aside>

<<<<<<< HEAD
      {/* --- CONTENT AREA --- */}
      <div className="flex flex-1 flex-col overflow-hidden relative bg-slate-50/50">

        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-10 hidden lg:flex items-center justify-between px-8 transition-all">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              {navItems.find(i => isRouteActive(i.path, i.exact))?.name || 'Dashboard'}
            </h2>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-full border border-slate-200/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Operational
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-slate-100/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
              />
            </div>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30">
          <span className="font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-indigo-600" /> Admin
=======
      {/* --- MOBILE --- */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
          <span className="font-bold text-slate-900 flex items-center gap-2">
             <ShieldCheck className="h-5 w-5 text-indigo-600" /> Admin
>>>>>>> c22e57f15658acb56e240bc10a7e750daacbf34f
          </span>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {mobileMenuOpen && (
<<<<<<< HEAD
          <div className="absolute inset-0 z-50 bg-slate-950 text-white p-4 lg:hidden">
            <nav className="space-y-2 mt-10">
              {navItems.map((item) => <NavItem key={item.name} item={item} onClick={() => setMobileMenuOpen(false)} />)}
              <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-4 text-rose-400 mt-8 rounded-xl hover:bg-slate-900">
                <LogOut className="h-5 w-5" /> Sign Out
              </button>
            </nav>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">
=======
            <div className="absolute inset-0 z-50 bg-slate-900 text-white p-4">
                <nav className="space-y-2 mt-10">
                    {navItems.map((item) => <NavItem key={item.name} item={item} onClick={() => setMobileMenuOpen(false)} />)}
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-rose-400 mt-8">
                        <LogOut className="h-5 w-5" /> Sign Out
                    </button>
                </nav>
            </div>
        )}

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative bg-slate-50">
          <div className="max-w-6xl mx-auto">
>>>>>>> c22e57f15658acb56e240bc10a7e750daacbf34f
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;