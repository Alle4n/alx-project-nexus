"use client";

import { useJobs } from "@/context/JobContext";
import { useState } from "react";

export default function FilterBar() {
  const { filters, setFilters } = useJobs();
  const [query, setQuery] = useState(filters.query || "");
  const [category, setCategory] = useState(filters.category || "");
  const [location, setLocation] = useState(filters.location || "");
  const [experience, setExperience] = useState(filters.experience || "");

  const applyFilters = () => {
    setFilters({ query, category, location, experience });
  };

  const resetFilters = () => {
    setQuery(""); setCategory(""); setLocation(""); setExperience("");
    setFilters({});
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4 items-center">
      <input
        type="text"
        placeholder="Search jobs or companies"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="input w-40"
      />
      <select value={category} onChange={e => setCategory(e.target.value)} className="input">
        <option value="">All categories</option>
        <option value="Engineering">Engineering</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
      </select>
      <select value={experience} onChange={e => setExperience(e.target.value)} className="input">
        <option value="">Any level</option>
        <option value="Entry">Entry-Level</option>
        <option value="Mid">Mid-Level</option>
        <option value="Senior">Senior</option>
      </select>
      <div className="flex gap-2">
        <button onClick={applyFilters} className="btn">Apply</button>
        <button onClick={resetFilters} className="btn-outline">Reset</button>
      </div>
    </div>
  );
}
