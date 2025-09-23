import { useEffect, useState } from "react";

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_city: string;
  job_country: string;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs?query=react developer&page=1");
        const data = await res.json();
        setJobs(data.data || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <div key={job.job_id} className="p-4 border rounded shadow-sm">
          <h3 className="font-bold">{job.job_title}</h3>
          <p>{job.employer_name}</p>
          <p className="text-sm text-gray-600">
            {job.job_city}, {job.job_country}
          </p>
        </div>
      ))}
    </div>
  );
}
