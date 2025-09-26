"use client";

import FilterBar from "@/components/FilterBar";
import JobList from "@/components/JobList";
import Pagination from "@/components/Pagination";
import { JobProvider } from "@/context/JobContext";

export default function HomePage() {
  return (
    <JobProvider>
      <main className="max-w-5xl mx-auto p-4 space-y-6">
        <FilterBar />
        <JobList />
        <Pagination itemsPerPage={10} />
      </main>
    </JobProvider>
  );
}
