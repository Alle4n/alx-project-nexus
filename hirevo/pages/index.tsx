import FilterBar from "@/components/FilterBar";
import JobList from "@/components/JobList";
import RolePanel from "@/components/RolePanel";
import { JobProvider } from "@/context/JobContext";

export default function HomePage() {
  return (
    <JobProvider>
      <main className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Interactive Job Board</h1>
        <RolePanel />
        <FilterBar />
        <JobList />
      </main>
    </JobProvider>
  );
}
