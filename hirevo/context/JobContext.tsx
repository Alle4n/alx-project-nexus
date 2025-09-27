"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface Job {
  id: number;
  title: string;
  company: { id: number; name: string };
  location: { id?: number; city: string; country: string };
  job_type: string;
  category?: { id: number; name: string };
  description?: string;
  posted_at: string;
}

interface Filters {
  query?: string;
  category?: string;
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
  locations: string[];
  categories: string[];
  addJob: (job: Job) => void;
  updateJob: (id: number, patch: Partial<Job>) => void;
  deleteJob: (id: number) => void;
}

const JobContext = createContext<JobContextType>({
  jobs: [],
  loading: false,
  error: null,
  filters: {},
  setFilters: () => {},
  refetch: () => {},
  locations: [],
  categories: [],
  addJob: () => {},
  updateJob: () => {},
  deleteJob: () => {},
});

export const useJobs = () => useContext(JobContext);

interface Props {
  children: ReactNode;
}

export const JobProvider = ({ children }: Props) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ page: 1 });

  const [locations, setLocations] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams(
        Object.entries(filters)
          .filter(([_, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      ).toString();

      const res = await fetch(`/api/jobs?${params}`);
      if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.statusText}`);

      const data: Job[] = (await res.json()).jobs || [];
      setJobs(data);

      setLocations([...new Set(data.map((job) => job.location.city).filter(Boolean))]);
      setCategories([...new Set(data.map((job) => job.category?.name).filter(Boolean))]);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const addJob = (job: Job) => setJobs((prev) => [job, ...prev]);
  const updateJob = (id: number, patch: Partial<Job>) =>
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, ...patch } : job)));
  const deleteJob = (id: number) => setJobs((prev) => prev.filter((job) => job.id !== id));

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        error,
        filters,
        setFilters,
        refetch: fetchJobs,
        locations,
        categories,
        addJob,
        updateJob,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
