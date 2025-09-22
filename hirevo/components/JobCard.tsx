interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  experience: string;
  description?: string;
}

export default function JobCard({ title, company, location, type, category, experience }: JobCardProps) {
  return (
    <div className="border rounded p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600">{company}</p>
      <p className="text-sm text-gray-500">{location} • {type} • {experience}</p>
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-2 inline-block">
        {category}
      </span>
    </div>
  );
}