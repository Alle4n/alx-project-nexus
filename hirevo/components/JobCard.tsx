"use client";

import { useState } from "react";
import ApplyModal from "./ApplyModal";

interface Job {
  id: number;
  title: string;
  description?: string;
  company?: { name?: string };
  category?: { name?: string };
  location?: string;
  job_type?: string;
  posted_at?: string;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [applying, setApplying] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  const handleApplyClick = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login or signup to apply for this job!");
      return;
    }
    setApplying(true);
  };

  return (
    <article className="p-4 bg-white dark:bg-gray-800 rounded shadow-sm">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {job.company?.name || "Unknown Company"} • {job.location || "Unknown Location"} •{" "}
            {job.job_type || "N/A"}
          </div>
          {job.category && (
            <span className="inline-block mt-1 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
              {job.category.name}
            </span>
          )}
        </div>

        <span className="text-xs text-gray-500">
          {job.posted_at ? timeAgo(new Date(job.posted_at).getTime()) : ""}
        </span>
      </div>

      {job.description && (
        <div className={`mt-3 text-sm ${expanded ? "" : "line-clamp-2"}`}>
          {job.description}
        </div>
      )}

      <div className="mt-3 flex gap-2">
        {job.description && (
          <button
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
            onClick={toggleExpand}
          >
            {expanded ? "Collapse" : "View"}
          </button>
        )}
        <button
          className="px-3 py-1 border border-gray-300 rounded text-sm"
          onClick={handleApplyClick}
        >
          Apply
        </button>
      </div>

      {applying && <ApplyModal job={job} onClose={() => setApplying(false)} />}
    </article>
  );
}

function timeAgo(ts: number) {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}
