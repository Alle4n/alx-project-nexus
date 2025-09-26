import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
        Welcome to <span className="text-blue-600">Hirevo</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Your evolution in hiring and job discovery.  
        Explore opportunities, apply easily, and connect with top employers.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/jobs" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Find Jobs
        </Link>
        <Link href="/employers" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition">
          Post a Job
        </Link>
      </div>
    </section>
  );
}
