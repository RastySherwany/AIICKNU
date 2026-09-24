'use client';

import { getApiUrl, getImageUrl } from '@/lib/api';

import { useState, useEffect } from 'react';

const ENDPOINTS = ['staff', 'news', 'project', 'publication', 'activity', 'dataset'];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('staff');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchData = (endpoint: string) => {
    setLoading(true);
    fetch(getApiUrl(`/${endpoint}`))
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData(activeTab);
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'aiic2026') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      fetch(getApiUrl(`/${activeTab}/${id}`), { method: 'DELETE' })
        .then(() => fetchData(activeTab));
    }
  };
  
  const handleOpenForm = (item: any = null) => {
    if (item) {
      // Fix date format for HTML input
      const formattedItem = {...item};
      if (formattedItem.date) formattedItem.date = formattedItem.date.slice(0, 10);
      // Omit createdAt and updatedAt from payload to prevent Prisma strict errors
      delete formattedItem.createdAt;
      delete formattedItem.updatedAt;
      setEditingId(item.id);
      setFormData(formattedItem);
    } else {
      setEditingId(null);
      setFormData({});
    }
    setIsModalOpen(true);
  };
  
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const urls = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const formDataObj = new FormData();
      formDataObj.append('file', file);
      
      try {
        const res = await fetch(`${getApiUrl('/upload')}`, {
          method: 'POST',
          body: formDataObj
        });
        const data = await res.json();
        urls.push(data.url);
      } catch (err) {
        console.error('Upload failed', err);
      }
    }
    
    const existing = formData[field] ? formData[field].split(',').filter(Boolean) : [];
    setFormData({...formData, [field]: [...existing, ...urls].join(',')});
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {...formData};
    delete payload.id;
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.date && payload.date.length === 10) payload.date = new Date(payload.date).toISOString();
    
    const method = editingId ? 'PATCH' : 'POST';
    const url = editingId 
      ? getApiUrl(`/${activeTab}/${editingId}`)
      : getApiUrl(`/${activeTab}`);
      
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if(res.ok) {
        setIsModalOpen(false);
        fetchData(activeTab);
      } else {
        alert('Failed to save record.');
      }
    })
    .catch(err => alert(err));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-[#002147] text-white py-2 rounded-lg hover:bg-blue-900 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  // Generate generic form fields based on active tab
  // Ideally this would come from a schema, but we can hardcode the expected fields for simplicity
  const schema: any = {
    staff: ['name', 'degree', 'title', 'role', 'type', 'bio', 'image', 'linkedin', 'googleScholar', 'orcid', 'researchGate', 'personalSite'],
    news: ['title', 'content', 'date', 'image'],
    project: ['title', 'description', 'link', 'image'],
    publication: ['title', 'authors', 'journal', 'year', 'link', 'image'],
    activity: ['title', 'description', 'date', 'isUpcoming', 'image'],
    dataset: ['title', 'description', 'size', 'format', 'link', 'image']
  };

  const fieldLabels: Record<string, string> = {
    degree: 'Academic Degree (e.g. MSc, PhD, BSc)',
    bio: 'About / Bio (Detailed description shown on member profile page)',
    type: 'Staff Category (Leadership or Team Member)',
    role: 'Position / Role (e.g. Professor in Computer Science, Researcher)',
    title: 'Academic Title (e.g. Dr., Prof., Asst. Prof.)',
    personalSite: 'Personal Website URL',
    googleScholar: 'Google Scholar Profile URL',
    researchGate: 'ResearchGate Profile URL',
    linkedin: 'LinkedIn Profile URL',
    orcid: 'ORCID Profile URL',
    isUpcoming: 'Event Status',
    image: 'Profile Picture / Cover Image(s)',
    content: 'Content / Article Body',
    description: 'Description / Summary',
    authors: 'Authors',
    journal: 'Journal / Publisher',
    year: 'Publication Year',
    link: 'Resource / External Link URL',
    size: 'Dataset Size (e.g. 2.4 GB)',
    format: 'Dataset Format (e.g. CSV, JSON, ZIP)',
    date: 'Date',
    name: 'Full Name',
  };
  
  const activeSchema = schema[activeTab] || [];
  const headers = data.length > 0 ? Object.keys(data[0]).filter(k => k !== 'id' && k !== 'createdAt' && k !== 'updatedAt') : activeSchema;

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {ENDPOINTS.map(endpoint => (
          <button 
            key={endpoint}
            onClick={() => setActiveTab(endpoint)}
            className={`px-4 py-2 rounded-lg capitalize font-medium whitespace-nowrap transition-colors ${activeTab === endpoint ? 'bg-[#002147] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            Manage {endpoint}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold capitalize">{activeTab} List</h2>
          <button onClick={() => handleOpenForm()} className="bg-[#002147] text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition shadow-sm hover:shadow">
            + Add New Record
          </button>
        </div>
        
        {loading ? (
           <div className="py-10 text-center text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
           <div className="py-10 text-center text-gray-500">No records found. Click add new record to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b bg-gray-50">
                  {headers.map((header: string) => (
                    <th key={header} className="py-3 px-4 font-semibold text-gray-600 capitalize">{header}</th>
                  ))}
                  <th className="py-3 px-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                    {headers.map((header: string) => (
                      <td key={header} className="py-3 px-4 max-w-xs truncate" title={String(item[header])}>
                        {item[header] !== null && item[header] !== undefined ? String(item[header]) : '-'}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => handleOpenForm(item)} className="text-[#002147] hover:underline mr-4 font-medium">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline font-medium">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 capitalize">{editingId ? 'Edit' : 'Add'} {activeTab}</h2>
            <form onSubmit={handleSave} className="space-y-5">
              {activeSchema.map((field: string) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{fieldLabels[field] || field}</label>
                  {field === 'type' && activeTab === 'staff' ? (
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#002147] outline-none bg-white font-medium"
                      value={formData.type || 'RESEARCHER'}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="RESEARCHER">Team Member / Researcher</option>
                      <option value="LEADERSHIP">Leadership / Co-Founder (Top Row)</option>
                    </select>
                  ) : field === 'isUpcoming' ? (
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#002147] outline-none bg-white font-medium"
                      value={formData[field] || 'false'}
                      onChange={e => setFormData({...formData, [field]: e.target.value === 'true'})}
                    >
                      <option value="false">No (Past)</option>
                      <option value="true">Yes (Upcoming)</option>
                    </select>
                  
                  ) : field === 'image' ? (
                    <div>
                      <input 
                        type="file" multiple accept="image/jpeg,image/png,image/gif,image/webp,.jpg,.jpeg,.png,.gif,.webp"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#002147] outline-none"
                        onChange={e => handleFileUpload(e, field)}
                      />
                      {formData[field] && (
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          {formData[field].split(',').filter(Boolean).map((url: string, i: number) => (
                            <div key={i} className={`relative group border-2 rounded-lg overflow-hidden ${i === 0 ? 'border-[#002147]' : 'border-transparent'}`}>
                              {i === 0 && <div className="absolute top-0 left-0 bg-[#002147] text-white text-[10px] font-bold px-2 py-1 z-10">COVER</div>}
                              <img src={getImageUrl(url)} alt="Preview" className="h-32 w-full object-cover" />
                              
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center flex-col gap-2 transition-opacity">
                                {i !== 0 && (
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      const arr = formData[field].split(',').filter(Boolean);
                                      const clicked = arr.splice(i, 1)[0];
                                      arr.unshift(clicked); // Move to front
                                      setFormData({...formData, [field]: arr.join(',')});
                                    }}
                                    className="bg-white text-[#002147] text-xs font-bold px-3 py-1 rounded"
                                  >
                                    Set as Cover
                                  </button>
                                )}
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const arr = formData[field].split(',').filter(Boolean);
                                    arr.splice(i, 1);
                                    setFormData({...formData, [field]: arr.join(',')});
                                  }}
                                  className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : field === 'content' || field === 'description' || field === 'bio' ? (

                    <textarea 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#002147] outline-none h-32"
                      placeholder={field === 'bio' ? 'Write the detailed bio / about information for this staff member...' : ''}
                      value={formData[field] || ''}
                      onChange={e => setFormData({...formData, [field]: e.target.value})}
                    />
                  ) : (
                    <input 
                      type={field === 'date' ? 'date' : 'text'}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#002147] outline-none"
                      value={formData[field] || ''}
                      onChange={e => setFormData({...formData, [field]: e.target.value})}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#002147] text-white rounded-lg hover:bg-blue-900">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
