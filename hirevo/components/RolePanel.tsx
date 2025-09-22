"use client";

import { useState } from "react";

export default function RolePanel() {
  const [role, setRole] = useState<"jobseeker" | "employer">("jobseeker");

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => setRole("jobseeker")}
        className={`btn ${role === "jobseeker" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        Job Seeker
      </button>
      <button
        onClick={() => setRole("employer")}
        className={`btn ${role === "employer" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        Employer
      </button>
    </div>
  );
}
