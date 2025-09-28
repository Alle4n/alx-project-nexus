"use client";

import { useState, useEffect, FormEvent } from "react";
import Select from "react-select";
import { Country, City } from "country-state-city";
import { Job, PostJobFormProps } from "@/interfaces";

export default function PostJobForm({
  onClose,
  onAdd,
  employerName = "",
}: PostJobFormProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState(employerName);
  const [country, setCountry] = useState<{ value: string; label: string } | null>(null);
  const [city, setCity] = useState<{ value: string; label: string } | null>(null);
  const [type, setType] = useState("Full-time");
  const [category, setCategory] = useState("Engineering");
  const [description, setDescription] = useState("");

  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const countries = Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name,
    }));
    setCountryOptions(countries);
    setCountry(countries[0] || null);
  }, []);

  // City list fetch (optional)
  // useEffect(() => {
  //   if (!country?.value) return;
  //   const cities = City.getCitiesOfCountry(country.value).map((c) => ({
  //     value: c.name,
  //     label: c.name,
  //   }));
  //   setCityOptions(cities);
  //   setCity(cities[0] || null);
  // }, [country]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login or sign up to post a job.");
      return;
    }

    if (!country || !city) return;

    const job: Job = {
      id: Date.now(),
      title,
      company: {
        name: company,
      },
      // city: city.label, 
      category: { name: category },
      description,
      posted_at: Date.now().toString(),
    };
    onAdd(job);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold">Post a New Job</h2>

        <label className="block text-sm font-medium">Job Title</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block text-sm font-medium">Company</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Country</label>
            <Select
              options={countryOptions}
              value={country}
              onChange={(val) => setCountry(val)}
              placeholder="Select Country"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">City</label>
            <Select
              options={cityOptions}
              value={city}
              onChange={(val) => setCity(val)}
              placeholder="Select City"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <select
            className="flex-1 px-3 py-2 border rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>

          <select
            className="flex-1 px-3 py-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Engineering</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
        </div>

        <label className="block text-sm font-medium">Job Description</label>
        <textarea
          className="w-full px-3 py-2 border rounded h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="flex justify-end gap-2">
          <button type="button" className="px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
}
