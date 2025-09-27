"use client";

import { useState, useEffect, FormEvent } from "react";
import Select from "react-select";
import { Country, City } from "country-state-city";

interface Job {
  id: string;
  title: string;
  company_name: string;
  country: string;
  city: string;
  employment_type: string;
  category: string;
  work_mode: string;
  experience_level: string;
  description: string;
}

interface PostJobFormProps {
  onClose: () => void;
  onAdd: (job: Job) => void;
}

export default function PostJobForm({ onClose, onAdd }: PostJobFormProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState<{ value: string; label: string } | null>(null);
  const [city, setCity] = useState<{ value: string; label: string } | null>(null);
  const [employmentType, setEmploymentType] = useState<{ value: string; label: string } | null>(null);
  const [category, setCategory] = useState<{ value: string; label: string } | null>(null);
  const [workMode, setWorkMode] = useState<{ value: string; label: string } | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<{ value: string; label: string } | null>(null);
  const [description, setDescription] = useState("");

  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);

  const employmentOptions = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
  ];

  const categoryOptions = [
    { value: "Engineering", label: "Engineering" },
    { value: "Design", label: "Design" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
  ];

  const workModeOptions = [
    { value: "Onsite", label: "Onsite" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  const experienceOptions = [
    { value: "Junior", label: "Junior" },
    { value: "Mid", label: "Mid" },
    { value: "Senior", label: "Senior" },
    { value: "Lead", label: "Lead" },
  ];

  useEffect(() => {
    const countries = Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name,
    }));
    setCountryOptions(countries);
  }, []);

  useEffect(() => {
    if (!country) {
      setCityOptions([]);
      setCity(null);
      return;
    }
    const cities = City.getCitiesOfCountry(country.value).map((c) => ({
      value: c.name,
      label: c.name,
    }));
    setCityOptions(cities);
    setCity(null);
  }, [country]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!country || !city || !employmentType || !category || !workMode || !experienceLevel) return;

    const jobData = {
      title,
      description,
      company_name: company,
      employment_type: employmentType.value,
      location: { city: city.value, country: country.value },
      category: { name: category.value },
      work_mode: workMode.value,
      experience_level: experienceLevel.value,
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) throw new Error("Failed to post job");
      const newJob = await res.json();
      onAdd(newJob);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to post job");
    }
  };

  const customSelectStyles = {
    option: (provided: any) => ({ ...provided, color: "black", backgroundColor: "white", padding: "0.5rem" }),
    control: (provided: any) => ({ ...provided, borderColor: "gray", borderRadius: "0.375rem" }),
    singleValue: (provided: any) => ({ ...provided, color: "black" }),
    menu: (provided: any) => ({ ...provided, borderRadius: "0.375rem", marginTop: "0.25rem" }),
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-lg space-y-4">
        <h2 className="text-xl font-semibold">Post a New Job</h2>

        <label className="block text-sm font-medium">Job Title</label>
        <input className="w-full px-3 py-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label className="block text-sm font-medium">Company Name</label>
        <input className="w-full px-3 py-2 border rounded" value={company} onChange={(e) => setCompany(e.target.value)} required />

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Country</label>
            <Select options={countryOptions} value={country} onChange={setCountry} styles={customSelectStyles} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">City</label>
            <Select options={cityOptions} value={city} onChange={setCity} isDisabled={!country} styles={customSelectStyles} />
          </div>
        </div>

        <div className="flex gap-2">
          <Select options={employmentOptions} value={employmentType} onChange={setEmploymentType} placeholder="Employment Type" styles={customSelectStyles} className="flex-1" />
          <Select options={categoryOptions} value={category} onChange={setCategory} placeholder="Category" styles={customSelectStyles} className="flex-1" />
        </div>

        <div className="flex gap-2">
          <Select options={workModeOptions} value={workMode} onChange={setWorkMode} placeholder="Work Mode" styles={customSelectStyles} className="flex-1" />
          <Select options={experienceOptions} value={experienceLevel} onChange={setExperienceLevel} placeholder="Experience Level" styles={customSelectStyles} className="flex-1" />
        </div>

        <label className="block text-sm font-medium">Job Description</label>
        <textarea className="w-full px-3 py-2 border rounded h-24" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <div className="flex justify-end gap-2">
          <button type="button" className="px-4 py-2 border rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Post Job</button>
        </div>
      </form>
    </div>
  );
}
