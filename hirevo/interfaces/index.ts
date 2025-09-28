import { ReactNode } from "react";

export interface ApplyModalProps {
  job: Job;
  onClose: () => void;
}

export interface Job {
  id: number;
  title: string;
  description?: string;
  company?: { name?: string };
  category?: { name?: string };
  location?: string;
  job_type?: string;
  posted_at?: string;
}

export interface JobCardProps {
  job: Job;
}
export interface PaginationProps {
  itemsPerPage: number;
}

export interface PostJobFormProps {
  onClose: () => void;
  onAdd: (job: Job) => void;
  employerName?: string;
}

export interface Filters {
  query?: string;
  category?: string;
  location?: string;
  page?: number;
}

export interface JobContextType {
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

export interface JobProviderProps {
  children: ReactNode;
}