import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  Briefcase,
  UploadCloud,
  Sparkles,
  History,
  Search,
  Bell,
  Code2,
  Settings,
  UserCircle,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

const HRLayout: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const isAdmin = user?.user_metadata?.role === 'hr_admin' || user?.app_metadata?.role === 'hr_admin';

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      if (term) {
          setSearchParams({ ...Object.fromEntries(searchParams), q: term });
      } else {
          const newParams = Object.fromEntries(searchParams);
          delete newParams.q;
          setSearchParams(newParams);
      }
  };

  // Define navigations
  const userNavItems = [
    { path: '/hr/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/hr/talent', label: 'Talent Pool', icon: Users },
    { path: '/hr/upload', label: 'Upload Resumes', icon: UploadCloud },
    { path: '/hr/jobs', label: 'Job Descriptions', icon: Briefcase },
    { path: '/hr/match', label: 'Smart Match AI', icon: Sparkles },
    { path: '/hr/history', label: 'Match History', icon: History },
  ];

  const adminNavItems = [
    { path: '/hr/admin', label: 'Analytics', icon: TrendingUp }, // Renamed Dashboard to Analytics for clarity if desired, or keep Dashboard
    { path: '/hr/talent', label: 'Talent Pool', icon: Users },
    { path: '/hr/upload', label: 'Upload Resumes', icon: UploadCloud },
    { path: '/hr/jobs', label: 'Job Descriptions', icon: Briefcase },
    { path: '/hr/match', label: 'Smart Match AI', icon: Sparkles },
    { path: '/hr/history', label: 'Match History', icon: History },
  ];

  const currentNavItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-xl shadow-gray-200/50 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
          {/* Logo Section */}
          <div className="h-20 flex items-center px-8 border-b border-gray-50">
             <div className="flex items-center gap-3 font-extrabold text-2xl tracking-tight text-gray-900">
                <div className={`p-2 bg-gradient-to-br ${isAdmin ? 'from-purple-600 to-indigo-600 shadow-purple-200' : 'from-indigo-600 to-violet-600 shadow-indigo-200'} text-white rounded-xl shadow-lg`}>
                   <Code2 className="w-6 h-6" />
                </div>
                <span>Prashne<span className={isAdmin ? 'text-purple-600' : 'text-indigo-600'}>HR</span></span>
             </div>
             <button 
               onClick={() => setIsMobileMenuOpen(false)}
               className="ml-auto lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
             >
               <X className="w-6 h-6" />
             </button>
          </div>

          {/* User Profile Card */}
          <div className="px-6 py-6">
             <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm flex items-center gap-3 group cursor-pointer hover:shadow-md transition-all duration-300">
                <div className={`w-10 h-10 rounded-full ${isAdmin ? 'bg-purple-100 text-purple-600' : 'bg-indigo-100 text-indigo-600'} flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm group-hover:scale-105 transition-transform`}>
                   {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold text-gray-900 truncate">
                       {isAdmin ? 'Team Admin' : 'HR Staff'}
                   </p>
                   <p className="text-xs text-gray-500 truncate font-medium">{user?.email}</p>
                </div>
                <Settings className={`w-4 h-4 text-gray-300 ${isAdmin ? 'group-hover:text-purple-500' : 'group-hover:text-indigo-500'} transition-colors`} />
             </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 space-y-1.5 py-2">
             <div className="px-4 mb-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                {isAdmin ? 'Admin Console' : 'Main Menu'}
             </div>
             
             {currentNavItems.map((item) => (
               <NavLink
                 key={item.path}
                 to={item.path}
                 onClick={() => setIsMobileMenuOpen(false)}
                 className={({ isActive }) => `
                    flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 group font-medium text-sm
                    ${isActive 
                      ? isAdmin 
                            ? 'bg-purple-50 text-purple-700 shadow-sm shadow-purple-100'
                            : 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                 `}
               >
                 {({ isActive }) => (
                    <>
                      <item.icon className={`
                        w-5 h-5 transition-colors 
                        ${isActive 
                            ? isAdmin ? 'text-purple-600' : 'text-indigo-600'
                            : 'text-gray-400 group-hover:text-gray-600'
                        }
                      `} />
                      {item.label}
                    </>
                 )}
               </NavLink>
             ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-50 space-y-2 bg-gray-50/30">
            <button 
              onClick={() => navigate('/hr/profile')}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-white hover:shadow-sm rounded-xl transition-all text-sm font-medium"
            >
                <UserCircle className="w-5 h-5 text-gray-400" />
                <span>My Profile</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-sm font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative bg-gray-50">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 z-20 sticky top-0 shadow-sm shadow-gray-100/50">
           <div className="flex items-center gap-6 flex-1">
               <button 
                 onClick={() => setIsMobileMenuOpen(true)}
                 className="lg:hidden text-gray-500 p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
               >
                 <Menu className="w-6 h-6" />
               </button>

               {/* Global Search */}
               <div className="max-w-md w-full hidden md:block relative group">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                   <input 
                     type="text"
                     placeholder="Search jobs, candidates, keywords..."
                     className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-transparent rounded-xl text-sm font-medium text-gray-700 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 transition-all outline-none"
                     value={searchTerm}
                     onChange={handleSearch}
                   />
               </div>
           </div>

           <div className="flex items-center gap-4">
              <button className="relative p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all group">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:border-indigo-50 transition-colors"></span>
              </button>
              <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>
              <div className="hidden sm:flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">{isAdmin ? 'HR Admin' : 'HR Staff'}</span>
              </div>
           </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
           <div className="max-w-[1600px] mx-auto p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <Outlet />
           </div>
        </main>
      </div>

    </div>
  );
};

export default HRLayout;