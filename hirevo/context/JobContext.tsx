"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Job, Filters, JobContextType, JobProviderProps } from "@/interfaces";

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

export const JobProvider = ({ children }: JobProviderProps) => {
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
          job.company?.name?.toLowerCase().includes(filters.query.toLowerCase());
        const matchesCategory =
          !filters.category || job.category?.name === filters.category;
        const matchesLocation =
          !filters.location ||
          (typeof job.location === "object" && job.location !== null && "city" in job.location && job.location.city === filters.location);
        return matchesQuery && matchesCategory && matchesLocation;
      });

      setJobs(filtered);

      setLocations([
        ...new Set(
          data
            .map((job) =>
              typeof job.location === "object" && job.location !== null && "city" in job.location
                ? job.location.city
                : undefined
            )
            .filter(Boolean)
        ),
      ]);
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
