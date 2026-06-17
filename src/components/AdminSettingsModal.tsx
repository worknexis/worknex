import React, { useState } from 'react';
import { X, Shield, Mail, Check, AlertTriangle } from 'lucide-react';

interface AdminSettingsModalProps {
  onClose: () => void;
  currentAdminEmail: string;
  onUpdateAdminEmail: (newEmail: string) => Promise<void>;
}

export default function AdminSettingsModal({
  onClose,
  currentAdminEmail,
  onUpdateAdminEmail,
}: AdminSettingsModalProps) {
  const [emailInput, setEmailInput] = useState(currentAdminEmail);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    
    setSubmitting(true);
    setErrorMsg('');
    setSuccess(false);
    
    try {
      await onUpdateAdminEmail(emailInput.trim());
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update administrator email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-950/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6">
        <div 
          id="admin-settings-modal"
          className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-md p-6 sm:p-8"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-sans text-base font-bold tracking-tight text-gray-900">
                Admin Settings
              </h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-500 leading-relaxed">
            By changing the administrator email, you can grant job-posting, editing, and deleting permissions to a different Google account.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-750">
                Administrator Google Email
              </label>
              <div className="relative mt-1.5 rounded-lg shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin-email@gmail.com"
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-xs text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 font-medium">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 font-medium">
                <Check className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500" />
                <span>Administrator email updated successfully in the cloud database!</span>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-500 transition disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>

          {/* Quick Info Box */}
          <div className="mt-6 rounded-xl bg-amber-50/50 p-3.5 border border-amber-100/30 text-[11px] leading-relaxed text-amber-805">
            <span className="font-bold">Note on Super-Admin:</span>
            <p className="mt-0.5 text-amber-700">
              The original email <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[10px]">kelvin.orji@gmail.com</code> remains configured as a super-admin bypass backup to ensure you are never locked out of settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
