import React, { useState, useEffect } from 'react';
import { X, MapPin, DollarSign, Calendar, Globe, Send, CheckCircle2, Building, ShieldCheck, Edit, Trash2, Check, AlertTriangle, Star, Mail, Clock, ChevronDown, ChevronUp, Inbox, User, ExternalLink } from 'lucide-react';
import { Job } from '../types';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
  isAdmin?: boolean;
  onSaveJob?: (updatedJob: Job) => Promise<void>;
  onDeleteJob?: (jobId: string) => Promise<void>;
}

export default function JobDetailsModal({ job, onClose, isAdmin = false, onSaveJob, onDeleteJob }: JobDetailsModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantResumeUrl, setApplicantResumeUrl] = useState('');
  const [applicantCoverNote, setApplicantCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Edit / Delete action states
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Editable fields states
  const [editTitle, setEditTitle] = useState('');
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editCompanyLogo, setEditCompanyLogo] = useState('');
  const [editCategory, setEditCategory] = useState('development');
  const [editType, setEditType] = useState('Full-time');
  const [editLocation, setEditLocation] = useState('');
  const [editSalary, setEditSalary] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editRequirements, setEditRequirements] = useState('');
  const [editBenefits, setEditBenefits] = useState('');
  const [editFeatured, setEditFeatured] = useState(false);
  const [editCompanyWebsite, setEditCompanyWebsite] = useState('');
  const [editCompanyDescription, setEditCompanyDescription] = useState('');
  const [editApplyUrl, setEditApplyUrl] = useState('');

  if (!job) return null;

  const startEditing = () => {
    setEditTitle(job.title);
    setEditCompanyName(job.companyName);
    setEditCompanyLogo(job.companyLogo || '');
    setEditCategory(job.category);
    setEditType(job.type);
    setEditLocation(job.location);
    setEditSalary(job.salary);
    setEditDescription(job.description);
    setEditRequirements(job.requirements?.join('\n') || '');
    setEditBenefits(job.benefits?.join('\n') || '');
    setEditFeatured(job.featured || false);
    setEditCompanyWebsite(job.companyWebsite);
    setEditCompanyDescription(job.companyDescription);
    setEditApplyUrl(job.applyUrl || '');
    setErrorMsg('');
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!onSaveJob) return;
    if (!editTitle || !editCompanyName || !editLocation || !editSalary) {
      setErrorMsg('Title, company name, location, and salary are required fields.');
      return;
    }

    setSaving(true);
    setErrorMsg('');

    const updatedJob: Job = {
      ...job,
      title: editTitle.trim(),
      companyName: editCompanyName.trim(),
      companyLogo: editCompanyLogo.trim(),
      category: editCategory,
      type: editType as 'Full-time' | 'Part-time' | 'Contract' | 'Internship',
      location: editLocation.trim(),
      salary: editSalary.trim(),
      description: editDescription.trim(),
      requirements: editRequirements.split('\n').map(p => p.trim()).filter(Boolean),
      benefits: editBenefits.split('\n').map(p => p.trim()).filter(Boolean),
      featured: editFeatured,
      companyWebsite: editCompanyWebsite.trim(),
      companyDescription: editCompanyDescription.trim(),
      applyUrl: editApplyUrl.trim(),
    };

    try {
      await onSaveJob(updatedJob);
      setIsEditing(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update job details.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDeleteJob) return;
    setDeleting(true);
    setErrorMsg('');
    try {
      await onDeleteJob(job.id);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete job listing.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantResumeUrl) return;

    setSubmitting(true);
    setErrorMsg('');
    
    try {
      const appsRef = collection(db, 'jobs', job.id, 'applications');
      const newAppDoc = doc(appsRef);
      
      const applicationData = {
        id: newAppDoc.id,
        jobId: job.id,
        applicantName: applicantName.trim(),
        applicantEmail: applicantEmail.trim(),
        applicantResumeUrl: applicantResumeUrl.trim(),
        applicantCoverNote: applicantCoverNote.trim() || null,
        submittedAt: new Date().toISOString(),
      };
      
      await setDoc(newAppDoc, applicationData);
      setFormSubmitted(true);
    } catch (err: any) {
      console.error("Failed to submit application to firestore:", err);
      setErrorMsg(err.message || 'Failed to submit application. Please check your network and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setFormSubmitted(false);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantResumeUrl('');
    setApplicantCoverNote('');
    setIsEditing(false);
    setShowDeleteConfirm(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity" 
        onClick={handleModalClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6">
        {/* Modal panel */}
        <div 
          id="job-details-modal"
          className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-4xl flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100 animate-scale-up"
        >
          {/* Main info column */}
          <div className="flex-1 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            {showDeleteConfirm && (
              <div className="mb-6 rounded-xl border border-red-100 bg-red-50/75 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-sans text-xs font-bold text-red-800">
                      Delete listing "{job.title}"?
                    </h4>
                    <p className="mt-1 text-[11px] text-red-600 leading-normal">
                      Are you sure you want to delete this job listing? This action is permanent and cannot be undone.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                      >
                        {deleting ? 'Deleting...' : 'Yes, Delete Permanently'}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={deleting}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-gray-750 hover:bg-gray-50 text-xs font-bold rounded-lg transition disabled:opacity-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3 border-gray-100">
                  <div className="flex items-center gap-1.5 text-indigo-600 font-sans text-xs font-bold">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Editing Job Details</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      disabled={saving}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-650 hover:bg-gray-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-xs cursor-pointer"
                    >
                      {saving ? 'Saving...' : (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 font-medium">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700">Role Title *</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700">Company Name *</label>
                    <input
                      type="text"
                      value={editCompanyName}
                      onChange={(e) => setEditCompanyName(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700">Category</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="development">Software Engineering</option>
                      <option value="design">Design & Creative</option>
                      <option value="marketing">Marketing & Writing</option>
                      <option value="product">Product Management</option>
                      <option value="support">Customer Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700">Job Type</label>
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700">Location *</label>
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700">Salary Range *</label>
                    <input
                      type="text"
                      value={editSalary}
                      onChange={(e) => setEditSalary(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700">Company Website</label>
                    <input
                      type="url"
                      value={editCompanyWebsite}
                      onChange={(e) => setEditCompanyWebsite(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700">Company Logo (Image URL)</label>
                    <input
                      type="url"
                      value={editCompanyLogo}
                      onChange={(e) => setEditCompanyLogo(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-1.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="edit-featured"
                      checked={editFeatured}
                      onChange={(e) => setEditFeatured(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="edit-featured" className="block text-xs font-bold text-gray-700 cursor-pointer flex items-center gap-1.5 select-none">
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                      <span>Pin listing as "Featured"</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700">The Opportunity (Description)</label>
                  <textarea
                    rows={4}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700">Role Requirements (One per line)</label>
                  <textarea
                    rows={3}
                    value={editRequirements}
                    onChange={(e) => setEditRequirements(e.target.value)}
                    placeholder="E.g. 3+ years React experience&#10;Excellent communication details"
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700">Compensation & Perks (One per line)</label>
                  <textarea
                    rows={3}
                    value={editBenefits}
                    onChange={(e) => setEditBenefits(e.target.value)}
                    placeholder="E.g. Full competitive medical&#10;Absolute flexible working hours"
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700">About the Company</label>
                  <textarea
                    rows={3}
                    value={editCompanyDescription}
                    onChange={(e) => setEditCompanyDescription(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <>
                {/* Header / Info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                      {job.companyLogo ? (
                        <img 
                          src={job.companyLogo} 
                          alt={`${job.companyName} logo`} 
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-sans text-xl font-bold text-gray-400 uppercase">
                          {job.companyName.substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-mono text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        {job.companyName}
                      </h4>
                      <a 
                        href={job.companyWebsite} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:underline"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        <span>Visit website</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isAdmin && (
                      <div className="flex items-center gap-1 border border-indigo-10s0 bg-indigo-50/50 rounded-lg p-0.5 mr-2">
                        <button
                          onClick={startEditing}
                          title="Edit Job Details"
                          className="inline-flex h-7 w-7 items-center justify-center hover:bg-white rounded text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          title="Delete Job Listing"
                          className="inline-flex h-7 w-7 items-center justify-center hover:bg-white rounded text-red-500 hover:text-red-700 transition cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <h2 className="mt-4 font-sans text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  {job.title}
                </h2>

                {/* Badges block */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-lg bg-indigo-50/80 px-2.5 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                    {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-900/5">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span>{job.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-900/5 font-mono">
                    <DollarSign className="h-3 w-3 text-gray-400" />
                    <span>{job.salary}</span>
                  </span>
                  {job.featured && (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-700/15">
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="font-sans text-xs font-bold tracking-wider text-gray-400 uppercase">
                    The Opportunity
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 space-y-2 whitespace-pre-line">
                    {job.description}
                  </p>
                </div>

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-sans text-xs font-bold tracking-wider text-gray-400 uppercase">
                      Role Requirements
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-sans text-xs font-bold tracking-wider text-gray-400 uppercase">
                      Compensation & Perks
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Company Info footer card */}
                <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <h4 className="font-sans text-xs font-bold text-gray-700">
                      About {job.companyName}
                    </h4>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500 whitespace-pre-line">
                    {job.companyDescription}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Direct Apply Column */}
          <div className="w-full md:w-[360px] shrink-0 p-6 sm:p-8 bg-gray-50/40 max-h-[85vh] overflow-y-auto">
            {isAdmin ? (
              <AdminApplicationsView jobId={job.id} />
            ) : !formSubmitted ? (
              <div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-indigo-600" />
                  <h3 className="font-sans text-sm font-bold tracking-tight text-gray-900">
                    Quick Apply Instantly
                  </h3>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Submit your details directly. No third-party registrations required.
                </p>

                <form onSubmit={handleApplySubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane.doe@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700">
                      Resume Link / Portfolio *
                    </label>
                    <input
                      required
                      type="url"
                      placeholder="https://github.com/janedoe"
                      value={applicantResumeUrl}
                      onChange={(e) => setApplicantResumeUrl(e.target.value)}
                      className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700">
                      Cover Note (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share achievements, projects, or why you are excited..."
                      value={applicantCoverNote}
                      onChange={(e) => setApplicantCoverNote(e.target.value)}
                      className="mt-1.5 block w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-500 transition-colors disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border border-t-transparent border-white" />
                        <span>Sending Application...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Application</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-sans text-sm font-bold text-gray-900">
                  Application Logged!
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">
                  Amazing work, <strong>{applicantName}</strong>! Your application token for <strong>{job.companyName}</strong> has been logged inside our local database.
                </p>
                <div className="mt-6 rounded-lg bg-emerald-50/50 p-3.5 text-left border border-emerald-100/50">
                  <h5 className="font-sans text-[11px] font-bold text-emerald-800">
                    What happens next?
                  </h5>
                  <p className="mt-1 text-[10px] leading-relaxed text-emerald-700/90">
                    We have forwarded your resume directly to {job.companyName}'s fully remote hiring coordinators. Watch your inbox at {applicantEmail} for initial technical interview steps. Good luck!
                  </p>
                </div>
                <button
                  onClick={handleModalClose}
                  className="mt-6 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AdminApplicationsViewProps {
  jobId: string;
}

function AdminApplicationsView({ jobId }: AdminApplicationsViewProps) {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErrorMsg('');
    
    const appsRef = collection(db, 'jobs', jobId, 'applications');
    const q = query(appsRef, orderBy('submittedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appsList: any[] = [];
      snapshot.forEach((doc) => {
        appsList.push({ id: doc.id, ...doc.data() });
      });
      setApplications(appsList);
      setLoading(false);
    }, (err) => {
      console.error("Error loading candidate applications:", err);
      setErrorMsg("Unable to retrieve candidate applications. Ensure Firestore configurations are complete.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [jobId]);

  const handleDeleteApp = async (appId: string) => {
    try {
      const appDocRef = doc(db, 'jobs', jobId, 'applications', appId);
      await deleteDoc(appDocRef);
      setDeleteConfirmId(null);
    } catch (err: any) {
      console.error("Error deleting candidate application document:", err);
      alert("Permission denied. Could not delete candidate application.");
    }
  };

  const formatDistanceToNow = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    } catch (e) {
      return 'Some time ago';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
        <p className="mt-3 font-mono text-[11px] text-gray-500">Retrieving applications...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-4 text-center">
        <AlertTriangle className="mx-auto h-5 w-5 text-rose-500" />
        <h4 className="mt-2 text-xs font-bold text-rose-800">Connection Error</h4>
        <p className="mt-1 text-[11px] leading-relaxed text-rose-700">{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <h3 className="font-sans text-sm font-bold tracking-tight text-gray-900">
            Candidates Applied
          </h3>
          <p className="mt-0.5 text-[10px] text-gray-500 font-sans">
            Realtime candidates tracker
          </p>
        </div>
        <span className="inline-flex h-5 items-center justify-center rounded-full bg-indigo-50 px-2 text-[11px] font-bold text-indigo-600">
          {applications.length}
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/50 py-10 px-4 text-center">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-400">
            <Inbox className="h-5 w-5" />
          </div>
          <h4 className="mt-3 font-sans text-xs font-bold text-gray-700">No Applications</h4>
          <p className="mt-1 max-w-[210px] text-[10px] leading-relaxed text-gray-500">
            Applications submitted through the public "Quick Apply" form will appear here instantly.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => {
            const isExpanded = expandedAppId === app.id;
            const isConfirmingDelete = deleteConfirmId === app.id;

            return (
              <div
                key={app.id}
                className="group relative rounded-xl border border-gray-100 bg-white p-3.5 shadow-xs transition-all hover:border-gray-200 hover:shadow-xs"
              >
                {/* Header Information */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-sans text-xs font-bold text-gray-900 flex items-center gap-1">
                      <User className="h-3 w-3 text-gray-400 shrink-0" />
                      {app.applicantName}
                    </h4>
                    
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-gray-500">
                      <a
                        href={`mailto:${app.applicantEmail}`}
                        className="flex items-center gap-1 font-mono text-gray-500 hover:text-indigo-600 transition-colors"
                        title="Contact candidate by email"
                      >
                        <Mail className="h-3 w-3 text-gray-400 shrink-0" />
                        <span className="truncate max-w-[120px]">{app.applicantEmail}</span>
                      </a>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1 font-mono text-[9px]">
                        <Clock className="h-3 w-3 text-gray-400 shrink-0" />
                        {formatDistanceToNow(app.submittedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Top-Right Action Controls */}
                  <div className="flex items-center gap-1 pl-1">
                    {/* External Link button to Resume */}
                    <a
                      href={app.applicantResumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                      title="Open Candidate Resume / Portfolio"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    {/* Delete Application Button */}
                    {!isConfirmingDelete ? (
                      <button
                        onClick={() => {
                          setDeleteConfirmId(app.id);
                        }}
                        className="inline-flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete candidate application record"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-lg bg-rose-50 border border-rose-100 p-1 shadow-sm">
                        <span className="text-[9px] font-bold text-rose-700 px-1 font-mono">Delete?</span>
                        <button
                          onClick={() => handleDeleteApp(app.id)}
                          className="h-5 rounded-md bg-rose-600 px-1.5 text-[9px] font-semibold text-white hover:bg-rose-500"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="h-5 rounded-md bg-white border border-gray-200 px-1.5 text-[9px] font-semibold text-gray-600 hover:bg-gray-50"
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cover Note Section */}
                {app.applicantCoverNote && (
                  <div className="mt-2.5 pt-2 border-t border-gray-50">
                    <button
                      onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                      className="flex w-full items-center justify-between text-left text-[10px] font-semibold text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      <span>Cover Letter / Note</span>
                      {isExpanded ? (
                        <ChevronUp className="h-3 w-3 text-gray-400 shrink-0" />
                      ) : (
                        <ChevronDown className="h-3 w-3 text-gray-400 shrink-0" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <p className="mt-1.5 text-[10px] leading-relaxed text-gray-500 whitespace-pre-wrap bg-gray-50 p-2.5 rounded-lg border border-gray-100/50">
                        {app.applicantCoverNote}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
