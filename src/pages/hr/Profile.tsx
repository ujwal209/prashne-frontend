import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Shield, 
  Building, 
  MapPin, 
  Phone, 
  Calendar, 
  Camera, 
  Edit2,
  CheckCircle2,
  LogOut
} from 'lucide-react';

const Profile: React.FC = () => {
    const { user } = useAuth();
    
    // Formatting helper
    const roleName = user?.role ? user.role.replace('_', ' ') : 'HR Admin';
    const initial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
                    <p className="text-gray-500 mt-2 text-lg">Manage your personal information and preferences.</p>
                </div>

                {/* Main Profile Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    
                    {/* Banner Section */}
                    <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 relative">
                        <div className="absolute inset-0 bg-black/5"></div>
                        <div className="absolute bottom-4 right-6">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all">
                                <Camera className="w-4 h-4" />
                                <span>Change Cover</span>
                            </button>
                        </div>
                    </div>

                    <div className="px-8 pb-10 relative">
                        {/* Avatar & Main Info Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-8 gap-6">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-lg ring-1 ring-gray-100 rotate-3 group-hover:rotate-0 transition-all duration-300">
                                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center text-5xl font-extrabold text-indigo-600 border border-indigo-100">
                                        {initial}
                                    </div>
                                </div>
                                <button className="absolute bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-full shadow-lg border-4 border-white hover:bg-indigo-700 transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 pt-2 md:pt-0">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                            {user?.email?.split('@')[0] || 'User Profile'}
                                            <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-50" />
                                        </h2>
                                        <p className="text-gray-500 font-medium">{user?.email}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                                            <Edit2 className="w-4 h-4" />
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            
                            {/* Left Column: Role & Organization */}
                            <div className="md:col-span-2 space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                                        Professional Details
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-indigo-200 transition-colors">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
                                                    <Shield className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-500">Role</span>
                                            </div>
                                            <p className="text-lg font-bold text-gray-900 capitalize pl-1">{roleName}</p>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-indigo-200 transition-colors">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
                                                    <Building className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-500">Organization</span>
                                            </div>
                                            <p className="text-lg font-bold text-gray-900 pl-1">Prashne Corp</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3">
                                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Email Address</p>
                                                <p className="text-gray-900 font-medium">{user?.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3">
                                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                                                <p className="text-gray-900 font-medium">+91 98765 43210</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3">
                                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Location</p>
                                                <p className="text-gray-900 font-medium">Bengaluru, Karnataka, India</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Sidebar / Stats */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-4">Profile Status</h3>
                                    <div className="relative pt-1">
                                        <div className="flex mb-2 items-center justify-between">
                                            <span className="text-xs font-semibold inline-block text-indigo-600">
                                                80% Complete
                                            </span>
                                        </div>
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                            <div style={{ width: "80%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"></div>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Complete your profile to unlock all features.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-4">Account</h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                                        <Calendar className="w-4 h-4" />
                                        <span>Joined December 2024</span>
                                    </div>
                                    <button className="w-full py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;