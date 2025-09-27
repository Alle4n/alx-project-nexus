"use client";

import { useState } from "react";
import ApplyModal from "./ApplyModal";
import { Job } from "@/context/JobContext";

interface JobCardProps {
  job: Job;
  onUpdate?: (id: number, patch: Partial<Job>) => void;
  onDelete?: (id: number) => void;
  isEmployerView?: boolean; // Hides Apply button if true
}

export default function JobCard({
  job,
  onUpdate,
  onDelete,
  isEmployerView = false,
}: JobCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [applying, setApplying] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <article className="p-4 bg-white dark:bg-gray-800 rounded shadow-sm">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {job.company?.name || "Unknown Company"} •{" "}
            {job.location ? `${job.location.city}, ${job.location.country}` : "Unknown Location"} •{" "}
            {job.job_type || "N/A"}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {job.posted_at ? timeAgo(new Date(job.posted_at).getTime()) : ""}
          </span>

          {isEmployerView && onUpdate && onDelete && (
            <div className="flex gap-2">
              <button
                className="px-2 py-1 text-xs bg-yellow-400 text-black rounded"
                onClick={() => onUpdate(job.id, { title: job.title + " (edited)" })}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                onClick={() => onDelete(job.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {job.description && (
        <div className={`mt-3 text-sm ${expanded ? "" : "line-clamp-2"}`}>
          {job.description}
        </div>
      )}

      {!isEmployerView && (
        <div className="mt-3 flex items-center gap-2">
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
            onClick={() => setApplying(true)}
          >
            Apply
          </button>
        </div>
      )}

      {applying && <ApplyModal job={job} onClose={() => setApplying(false)} />}
    </article>
  );
}

/* ---------- Helper to show relative time ---------- */
function timeAgo(ts: number) {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}
