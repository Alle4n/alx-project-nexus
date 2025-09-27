"use client";

import { useState, useEffect } from "react";
import { useJobs } from "@/context/JobContext";

export default function FilterBar() {
  const { filters, setFilters, locations = [], categories = [] } = useJobs();

  const [query, setQuery] = useState(filters.query || "");
  const [category, setCategory] = useState(filters.category || "");
  const [location, setLocation] = useState(filters.location || "");

  useEffect(() => {
    setQuery(filters.query || "");
    setCategory(filters.category || "");
    setLocation(filters.location || "");
  }, [filters]);

  const applyFilters = () => {
    setFilters({ query, category, location, page: 1 });
  };

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setLocation("");
    setFilters({ page: 1 });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4 items-center">
      <input
        type="text"
        placeholder="Search jobs or companies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
      />

      <select value={location} onChange={(e) => setLocation(e.target.value)} className="input w-40">
        <option value="">All locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button onClick={applyFilters} className="btn bg-blue-700 py-1 px-1 rounded">
          Search
        </button>
        <button onClick={resetFilters} className="btn-outline bg-blue-700 py-1 px-1 rounded">
          Reset
        </button>
      </div>
    </div>
  );
}
