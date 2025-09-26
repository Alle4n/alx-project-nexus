import { useState } from "react";

import PostJobForm from "@/components/PostJobForm";
import JobCard from "@/components/JobCard";
import { useJobs } from "@/context/JobContext";

export default function EmployersPage() {
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  const [showPostForm, setShowPostForm] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>

      {/* Post Job Button */}
      <div className="mb-6">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={() => setShowPostForm(true)}
        >
          Post a New Job
        </button>
      </div>

      {/* Post Job Form Modal */}
      {showPostForm && (
        <PostJobForm
          onClose={() => setShowPostForm(false)}
          onAdd={addJob}
          employerName="Acme Corp" // Replace with dynamic user name if using auth
        />
      )}

      {/* Job Listings */}
      <section className="space-y-4">
        {jobs.length === 0 && (
          <p className="text-gray-500">No jobs posted yet. Start by posting a job above.</p>
        )}

        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onUpdate={updateJob}
            onDelete={deleteJob}
            isEmployerView={true} // optional prop to hide "Apply" button
          />
        ))}
      </section>
    </div>
  );
}
