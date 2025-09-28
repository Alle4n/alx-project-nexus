"use client";

import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Job } from "@/interfaces";

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        console.log("Jobs received in frontend:", data);
        if (!res.ok) throw new Error(data.error || "Failed to fetch jobs");
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

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
