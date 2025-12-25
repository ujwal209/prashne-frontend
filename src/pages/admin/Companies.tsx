import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Globe,
  Filter,
  Download,
  Building2
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  domain: string;
  plan_tier: string;
  created_at: string;
}

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', domain: '', plan_tier: 'FREE' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data } = await api.get('/admin/companies');
      setCompanies(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/admin/companies', formData);
      setIsModalOpen(false);
      setFormData({ name: '', domain: '', plan_tier: 'FREE' });
      fetchCompanies(); 
    } catch (error) {
      alert("Failed to create company");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenants & Companies</h1>
          <p className="mt-1 text-gray-500">Manage registered organizations and their subscriptions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition shadow-lg shadow-slate-900/20"
        >
          <Plus className="h-4 w-4" />
          Add Company
        </button>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search companies..." 
              className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 text-sm focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                 <Filter className="w-4 h-4" /> Filter
             </button>
             <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                 <Download className="w-4 h-4" /> Export
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">Subscription</th>
                <th className="px-6 py-4">Onboarded</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{company.name}</div>
                      <div className="text-xs text-gray-400">ID: {company.id.slice(0,8)}...</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-md w-fit">
                        <Globe className="w-3 h-3 text-gray-400" />
                        {company.domain || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                        company.plan_tier === 'PRO' 
                        ? 'bg-purple-50 text-purple-700 border-purple-200' 
                        : company.plan_tier === 'ENTERPRISE'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                    }`}>
                      {company.plan_tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(company.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {companies.length === 0 && (
            <div className="p-16 flex flex-col items-center justify-center text-gray-400">
              <Building2 className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-lg font-medium text-gray-900">No companies found</p>
              <p className="text-sm">Get started by adding a new tenant organization.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in-95">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Register New Tenant</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                  placeholder="e.g. Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Domain (Optional)</label>
                <input 
                  type="text" 
                  value={formData.domain}
                  onChange={e => setFormData({...formData, domain: e.target.value})}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                  placeholder="e.g. acme.com (for auto-onboarding)"
                />
              </div>
              <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subscription Plan</label>
                 <select
                    value={formData.plan_tier}
                    onChange={e => setFormData({...formData, plan_tier: e.target.value})}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-white"
                 >
                    <option value="FREE">Free Tier</option>
                    <option value="PRO">Pro Plan</option>
                    <option value="ENTERPRISE">Enterprise</option>
                 </select>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-lg shadow-slate-900/20"
                >
                  {loading ? 'Creating...' : 'Create Tenant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
