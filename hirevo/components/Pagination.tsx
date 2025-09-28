"use client";

import { useJobs } from "@/context/JobContext";
import { PaginationProps } from "@/interfaces";


export default function Pagination({ itemsPerPage }: PaginationProps) {
  const { filters, setFilters, jobs } = useJobs();

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const currentPage = filters.page || 1;

  const goToPage = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="btn"
      >
        Prev
      </button>
      <span className="px-2 py-1 border rounded">{currentPage}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="btn"
      >
        Next
      </button>
    </div>
  );
}
