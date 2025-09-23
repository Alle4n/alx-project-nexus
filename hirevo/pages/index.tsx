import FilterBar from "@/components/FilterBar";
import JobList from "@/components/JobList";
import RolePanel from "@/components/RolePanel";
import { JobProvider } from "@/context/JobContext";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <JobProvider>
      <Header />
      <main className="max-w-5xl mx-auto p-4">
        <RolePanel />
        <FilterBar />
        <JobList />
      </main>
    </JobProvider>
  );
}
