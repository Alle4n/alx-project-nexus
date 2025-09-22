"use client";

import { useJobs } from "@/context/JobContext";
import JobCard from "./JobCard";

export default function JobList() {
  const { jobs, loading, error, refetch } = useJobs();

  if (loading) return <p>Loading jobs...</p>;
  if (error) return (
    <div>
      <p className="text-red-500">Error: {error}</p>
      <button onClick={refetch} className="btn mt-2">Retry</button>
    </div>
  );

  if (!jobs.length) return <p>No jobs found.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map(job => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}
