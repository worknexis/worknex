import React from 'react';
import { MapPin, DollarSign, Calendar, Sparkles, Building } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  // Helper to choose badge colors based on job type
  const getTypeBadgeStyles = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-emerald-50/80 text-emerald-700 border-emerald-200/50';
      case 'Contract':
        return 'bg-amber-50/80 text-amber-700 border-amber-200/50';
      case 'Part-time':
        return 'bg-blue-50/80 text-blue-700 border-blue-200/50';
      case 'Internship':
        return 'bg-purple-50/80 text-purple-700 border-purple-200/50';
      default:
        return 'bg-gray-50/80 text-gray-700 border-gray-200/50';
    }
  };

  return (
    <div
      onClick={onClick}
      id={`job-card-${job.id}`}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-100/60 cursor-pointer ${
        job.featured
          ? 'border-indigo-100 ring-4 ring-indigo-50/30'
          : 'border-gray-100'
      }`}
    >
      {/* Featured spark decoration */}
      {job.featured && (
        <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
          <Sparkles className="h-3 w-3 animate-pulse" />
          <span>Featured</span>
        </span>
      )}

      <div className="flex items-start gap-4">
        {/* Company Logo / Placeholder */}
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={`${job.companyName} logo`}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover grayscale-[20%] transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-sans text-lg font-bold text-gray-400 uppercase">
              {job.companyName.substring(0, 2)}
            </div>
          )}
        </div>

        {/* Core content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold tracking-wide text-gray-400 uppercase">
              {job.companyName}
            </span>
          </div>

          <h3 className="mt-1 font-sans text-base font-bold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
            {job.title}
          </h3>

          {/* Quick info specs */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              <span>{job.location}</span>
            </span>
            <span className="inline-flex items-center gap-1 font-mono">
              <DollarSign className="h-3.5 w-3.5 text-gray-400" />
              <span>{job.salary}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <span>{job.postedAt}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer tags */}
      <div className="mt-4 pt-4 border-t border-gray-50/80 flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${getTypeBadgeStyles(
            job.type
          )}`}
        >
          {job.type}
        </span>

        <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <span>Apply Now</span>
          <span>&rarr;</span>
        </span>
      </div>
    </div>
  );
};

export default JobCard;
