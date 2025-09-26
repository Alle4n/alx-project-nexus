import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <div>
      <Hero />

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 text-center">
        <div>
          <h3 className="text-xl font-semibold">For Job Seekers</h3>
          <p className="mt-2 text-gray-600">
            Search, filter, and apply to jobs that match your skills and aspirations.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">For Employers</h3>
          <p className="mt-2 text-gray-600">
            Post jobs, manage applications, and connect with top talent instantly.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">PWA Experience</h3>
          <p className="mt-2 text-gray-600">
            Install Hirevo on your device and browse jobs even offline.
          </p>
        </div>
      </section>
    </div>
  );
}