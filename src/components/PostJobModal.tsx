import React, { useState } from 'react';
import { X, Briefcase, Plus, Trash2, Globe, FileText, CheckCircle } from 'lucide-react';
import { Job } from '../types';

interface PostJobModalProps {
  onClose: () => void;
  onPostJob: (job: Omit<Job, 'id' | 'postedAt'>) => void;
}

export default function PostJobModal({ onClose, onPostJob }: PostJobModalProps) {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('development');
  const [type, setType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Internship'>('Full-time');
  const [location, setLocation] = useState('Remote (Worldwide)');
  const [salary, setSalary] = useState('$100,000 - $130,000');
  const [companyWebsite, setCompanyWebsite] = useState('https://');
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [description, setDescription] = useState('');

  // Bullet states
  const [currRequirement, setCurrRequirement] = useState('');
  const [requirements, setRequirements] = useState<string[]>([
    'Solid knowledge of software architecture and developer tools',
    '3+ years working in high-trust, asynchronous remote environments'
  ]);

  const [currBenefit, setCurrBenefit] = useState('');
  const [benefits, setBenefits] = useState<string[]>([
    '100% Remote, choose your workspace location worldwide',
    'Equipment allowance plus dedicated learning stipend'
  ]);

  const [formDone, setFormDone] = useState(false);

  const handleAddRequirement = () => {
    if (!currRequirement.trim()) return;
    setRequirements([...requirements, currRequirement.trim()]);
    setCurrRequirement('');
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleAddBenefit = () => {
    if (!currBenefit.trim()) return;
    setBenefits([...benefits, currBenefit.trim()]);
    setCurrBenefit('');
  };

  const handleRemoveBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !companyName || !description) return;

    // Direct fallback for logo if they leave it empty to keep it beautiful
    const fallbackLogos = [
      'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&h=120&q=80'
    ];
    const finalLogo = companyLogo.trim() || fallbackLogos[Math.floor(Math.random() * fallbackLogos.length)];

    onPostJob({
      title,
      companyName,
      category,
      type,
      location,
      salary,
      companyWebsite: companyWebsite.startsWith('http') ? companyWebsite : `https://${companyWebsite}`,
      companyLogo: finalLogo,
      companyDescription: companyDescription.trim() || `${companyName} is a fully remote product hub building future-facing solutions.`,
      description,
      requirements: requirements.length > 0 ? requirements : ['Strong teamwork skills', 'Commitment to high-trust asynchronous environments'],
      benefits: benefits.length > 0 ? benefits : ['Flexible vacation', 'Modern workspace stipend']
    });

    setFormDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-2xl flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Briefcase className="h-4.5 w-4.5" />
              </div>
              <h2 className="font-sans text-base font-bold tracking-tight text-gray-900">
                Post a Remote Opportunity
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!formDone ? (
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Core Job Details */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Role Title *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Senior Frontend Developer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">Company Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. SpaceScale"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-2 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="development">Software Development</option>
                    <option value="design">Product & UI Design</option>
                    <option value="marketing">Marketing & Sales</option>
                    <option value="product">Product Management</option>
                    <option value="support">Customer Success</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">Job Type *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-2 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">Location Range *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Remote (Global) or Remote (US)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Salary Range Description *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. $110,000 - $140,000"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">Company Website URL</label>
                  <input
                    type="text"
                    placeholder="e.g. spacescale.com"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700">Company Logo Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="Paste Unsplash or static image link... (leaves default if empty)"
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  className="mt-1.5 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700">Company Short Motto / Bio</label>
                <input
                  type="text"
                  placeholder="e.g. Building custom space rockets for remote communication teams"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  className="mt-1.5 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700">Full Job Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain the day-to-day operations, the platform stack, and general expectation parameters of the role..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Requirements block builder */}
              <div className="border-t border-gray-100 pt-4">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Build Role Requirements ({requirements.length})
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add a core qualification..."
                    value={currRequirement}
                    onChange={(e) => setCurrRequirement(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequirement())}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-gray-100 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {requirements.length > 0 && (
                  <ul className="rounded-lg bg-gray-50 p-2.5 space-y-2">
                    {requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center justify-between gap-3 text-xs text-gray-600 bg-white px-2.5 py-1.5 rounded-md border border-gray-100">
                        <span className="truncate flex-1">{req}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRequirement(idx)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Benefits block builder */}
              <div className="border-t border-gray-100 pt-4">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Build Perks & Benefits ({benefits.length})
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add a remote perk (e.g., equipment allowance)..."
                    value={currBenefit}
                    onChange={(e) => setCurrBenefit(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddBenefit}
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-gray-100 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {benefits.length > 0 && (
                  <ul className="rounded-lg bg-gray-50 p-2.5 space-y-2">
                    {benefits.map((ben, idx) => (
                      <li key={idx} className="flex items-center justify-between gap-3 text-xs text-gray-600 bg-white px-2.5 py-1.5 rounded-md border border-gray-100">
                        <span className="truncate flex-1">{ben}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(idx)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Submit footer button inside form */}
              <div className="border-t border-gray-100 pt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-500 transition-colors"
                >
                  Publish Posting
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-white space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <CheckCircle className="h-7 w-7" />
              </div>
              <h3 className="font-sans text-base font-bold text-gray-900">
                Listing Created Successfully!
              </h3>
              <p className="max-w-md text-xs text-gray-500 leading-relaxed">
                Your role for <strong>{companyName}</strong> has been created and immediately integrated into Work Nexis. We have saved the details in the cloud database so the role will persist.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 rounded-xl bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-gray-800 transition-colors"
              >
                Go to Opportunity
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
