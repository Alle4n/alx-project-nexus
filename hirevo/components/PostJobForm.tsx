import { useState, useEffect, FormEvent } from "react";
import Select from "react-select";
import { Country, City } from "country-state-city";

interface Job {
  id: string;
  title: string;
  company: string;
  country: string;
  city: string;
  type: string;
  category: string;
  mode: string; // NEW FIELD
  description: string;
  postedAt: number;
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
  const [type, setType] = useState<{ value: string; label: string } | null>(null);
  const [category, setCategory] = useState<{ value: string; label: string } | null>(null);
  const [onsiteOrRemote, setOnsiteOrRemote] = useState<{ value: string; label: string } | null>(null); // NEW STATE
  const [description, setDescription] = useState("");

  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);

  const typeOptions = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
  ];

  const categoryOptions = [
    { value: "Engineering", label: "Engineering" },
    { value: "Design", label: "Design" },
    { value: "Marketing", label: "Marketing" },
  ];

  const locationModeOptions = [ // NEW OPTIONS
    { value: "Onsite", label: "Onsite" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  // Load countries on mount
  useEffect(() => {
    const countries = Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name,
    }));
    setCountryOptions(countries);
  }, []);

  // Update cities whenever the country changes
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
    setCity(null); // Reset city when country changes
  }, [country]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!country || !city || !type || !category || !onsiteOrRemote) return;

    const job: Job = {
      id: Date.now().toString(),
      title,
      company,
      country: country.label,
      city: city.label,
      type: type.label,
      category: category.label,
      mode: onsiteOrRemote.label, // NEW FIELD
      description,
      postedAt: Date.now(),
    };

    onAdd(job);
    onClose();
  };

  // Custom styles for react-select (to make dropdown items black)
  const customSelectStyles = {
    option: (provided: any) => ({
      ...provided,
      color: 'black',
      backgroundColor: 'white',
      padding: '0.5rem',
      textAlign: 'left',
    }),
    control: (provided: any) => ({
      ...provided,
      borderColor: 'gray',
      borderRadius: '0.375rem',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.375rem',
      marginTop: '0.25rem',
    }),
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
          placeholder="Enter job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block text-sm font-medium">Company</label>
        <input
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter company name"
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
              placeholder="Select a country"
              styles={customSelectStyles}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">City</label>
            <Select
              options={cityOptions}
              value={city}
              onChange={(val) => setCity(val)}
              placeholder="Select a city"
              isDisabled={!countryOptions.length || !country}
              styles={customSelectStyles}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select
            className="flex-1"
            options={typeOptions}
            value={type}
            onChange={(val) => setType(val)}
            placeholder="Select job type"
            styles={customSelectStyles}
          />
          <Select
            className="flex-1"
            options={categoryOptions}
            value={category}
            onChange={(val) => setCategory(val)}
            placeholder="Select category"
            styles={customSelectStyles}
          />
        </div>

        {/* NEW FIELD - Onsite/Remote/Hybrid */}
        <div>
          <label className="block text-sm font-medium">Work Mode</label>
          <Select
            options={locationModeOptions}
            value={onsiteOrRemote}
            onChange={(val) => setOnsiteOrRemote(val)}
            placeholder="Select onsite/remote/hybrid"
            styles={customSelectStyles}
          />
        </div>

        <label className="block text-sm font-medium">Job Description</label>
        <textarea
          className="w-full px-3 py-2 border rounded h-24"
          placeholder="Enter job description"
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
