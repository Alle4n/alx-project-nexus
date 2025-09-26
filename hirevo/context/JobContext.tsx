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
  company?: string;
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
  experiences: string[];
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
  experiences: [],
});

export const useJobs = () => useContext(JobContext);

interface Props {
  children: ReactNode;
}

export const JobProvider = ({ children }: Props) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ company: "Ubisoft", page: 1 });

  const [locations, setLocations] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.statusText}`);

      const data = await res.json();
      const jobsData: Job[] = data.jobs || [];
      setJobs(jobsData);

      // Extract unique dynamic options
      setLocations([...new Set(jobsData.map((job) => job.location).filter(Boolean))]);
      setCategories([...new Set(jobsData.map((job) => job.category).filter(Boolean))]);
      setExperiences([...new Set(jobsData.map((job) => job.experience).filter(Boolean))]);
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
        experiences,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
