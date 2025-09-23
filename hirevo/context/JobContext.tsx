"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  experience: string;
  description?: string;
}

interface Filters {
  company?: string;
  location?: string;
  page?: number;
}

interface JobContextType {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  refetch: () => void;
}

const JobContext = createContext<JobContextType>({
  jobs: [],
  loading: false,
  error: null,
  filters: {},
  setFilters: () => {},
  refetch: () => {},
});

export const useJobs = () => useContext(JobContext);

interface Props {
  children: ReactNode;
}

export const JobProvider = ({ children }: Props) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ company: "Ubisoft", location: "us", page: 1 });

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: filters.company,
          locality: filters.location,
          page: filters.page,
        }),
      });

      if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.statusText}`);

      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <JobContext.Provider value={{ jobs, loading, error, filters, setFilters, refetch: fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};
