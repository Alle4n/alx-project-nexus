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
  query?: string;
  category?: string;
  location?: string;
  experience?: string;
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
  const [filters, setFilters] = useState<Filters>({});

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.query) params.append("query", filters.query);
      if (filters.category) params.append("category", filters.category);
      if (filters.location) params.append("location", filters.location);
      if (filters.experience) params.append("experience", filters.experience);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data: Job[] = await res.json();
      setJobs(data);
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
