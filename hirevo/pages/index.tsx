"use client";

import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import JobList from "@/components/JobList";
import RolePanel from "@/components/RolePanel";
import Pagination from "@/components/Pagination";
import { JobProvider } from "@/context/JobContext";

export default function HomePage() {
  return (
    <JobProvider>
      <Header />
      <main className="max-w-5xl mx-auto p-4 space-y-6">
        <RolePanel />
        <FilterBar />
        <JobList />
        <Pagination itemsPerPage={10} />
      </main>
    </JobProvider>
  );
}
