"use client";

import { useState, FormEvent } from "react";
import { Job } from "@/context/JobContext";

interface ApplyModalProps {
  job: Job;
  onClose: () => void;
}

export default function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Applying for job:", job.id, { name, email, cv });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-lg font-semibold">Apply to {job.title}</h2>

        {submitted ? (
          <div>
            <p className="text-sm">
              Application submitted. We&apos;ll contact you if selected.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="file"
              onChange={(e) => setCv(e.target.files?.[0] ?? null)}
              className="text-sm text-gray-600"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 border rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
