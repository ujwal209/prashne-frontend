import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { UserPlus, Mail, Building, Key, Copy, Check } from 'lucide-react';

interface Company {
  id: string;
  name: string;
}

interface UserForm {
    email: string;
    full_name: string;
    company_id: string;
    role: string;
    password: string;
}

const UserProvisioning: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [formData, setFormData] = useState<UserForm>({ 
        email: '', 
        full_name: '', 
        company_id: '',
        role: 'hr_admin',
        password: '' 
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        api.get('/admin/companies').then(res => setCompanies(res.data)).catch(console.error);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(formData.password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            await api.post('/admin/users', formData);
            setMessage({ type: 'success', text: 'HR Admin Provisioned Successfully!' });
            setFormData({ email: '', full_name: '', company_id: '', role: 'hr_admin', password: '' });
        } catch (error: any) {
             const errMsg = error.response?.data?.detail || "Failed to create user";
             setMessage({ type: 'error', text: errMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
             <div>
                <h1 className="text-2xl font-bold text-gray-900">User Provisioning</h1>
                <p className="mt-1 text-gray-500">Manually generate HR Admin accounts for specific tenants.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                
                {message && (
                    <div className={`mb-8 p-4 rounded-xl flex items-center border ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                         <span className="font-semibold">{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {/* Name */}
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input 
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            />
                        </div>

                        {/* Company Selection */}
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Assign to Tenant</label>
                            <div className="relative">
                                <Building className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                <select 
                                    name="company_id"
                                    value={formData.company_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-300 pl-11 p-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-white"
                                >
                                    <option value="">Select Company</option>
                                    {companies.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                         {/* Role Selection */}
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                            <div className="relative">
                                <select 
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-white"
                                >
                                    <option value="hr_admin">HR Admin (Full Access)</option>
                                    <option value="hr_user">HR User (Restricted)</option>
                                </select>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="md:col-span-2">
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Work Email</label>
                             <div className="relative">
                                <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                <input 
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="admin@company.com"
                                    className="w-full rounded-xl border border-gray-300 pl-11 p-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                />
                             </div>
                        </div>

                        {/* Password */}
                        <div className="md:col-span-2">
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Temporary Password</label>
                             <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Key className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                    <input 
                                        type="text" 
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                        placeholder="e.g. SecurePass@2025"
                                        className="w-full rounded-xl border border-gray-300 pl-11 p-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-mono text-gray-700"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={copyPassword}
                                    className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
                                    title="Copy Password"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                                </button>
                             </div>
                             <p className="mt-2 text-xs text-gray-500">Ensure you save this password to share with the user securely.</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold transition-all shadow-lg shadow-indigo-500/30 ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'}`}
                        >
                            {loading ? 'Provisioning...' : <><UserPlus className="w-5 h-5" /> Provision Account</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProvisioning;
