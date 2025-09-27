"use client";

import { useJobs } from "../context/JobContext";
import JobCard from "./JobCard";

export default function JobList() {
  const { jobs, loading, error } = useJobs();

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!jobs.length) return <p>No jobs found.</p>;

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
