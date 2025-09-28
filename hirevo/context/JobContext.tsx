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
      const res = await fetch(`/api/jobs`);
      if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.statusText}`);

      const data: Job[] = await res.json();
      console.log("Fetched jobs:", data);

      const filtered = data.filter((job) => {
        const matchesQuery =
          !filters.query ||
          job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
          job.company.name.toLowerCase().includes(filters.query.toLowerCase());
        const matchesCategory =
          !filters.category || job.category?.name === filters.category;
        const matchesLocation =
          !filters.location || job.location.city === filters.location;
        return matchesQuery && matchesCategory && matchesLocation;
      });

      setJobs(filtered);

      setLocations([...new Set(data.map((job) => job.location.city).filter(Boolean))]);
      setCategories([
        ...new Set(data.map((job) => job.category?.name).filter((name): name is string => Boolean(name))),
      ]);
    } catch (err: any) {
      console.log("Error fetching jobs:", err);
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
