export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-indigo-600">About Hirevo</h1>
        <p className="text-gray-700 text-lg">
          Connecting talented professionals with innovative companies worldwide.
        </p>
      </header>

      <section className="bg-indigo-50 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Our Vision</h2>
        <p className="text-gray-700">
          To become the most trusted and innovative platform for connecting top tech talent with companies, fostering growth, creativity, and opportunity globally.
        </p>
      </section>

      <section className="bg-green-50 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">Our Mission</h2>
        <p className="text-gray-700">
          Our mission is to simplify the hiring process by providing an intuitive and powerful platform for job seekers and employers. We aim to empower individuals with career opportunities while helping companies find the right talent quickly and efficiently.
        </p>
      </section>

      <section className="bg-yellow-50 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">Our Core Values</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Integrity:</strong> We operate with honesty and transparency in all our actions.</li>
          <li><strong>Innovation:</strong> We continuously improve our platform to meet the evolving needs of users.</li>
          <li><strong>Empowerment:</strong> We provide opportunities that help individuals and companies succeed.</li>
          <li><strong>Community:</strong> We build meaningful connections that strengthen the tech ecosystem.</li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">About Hirevo</h2>
        <p className="text-gray-700 leading-relaxed">
          Hirevo is a modern tech job board designed to connect talented developers, designers, and marketers with companies around the world. 
          Whether you are looking for your next career move or searching for the perfect candidate, Hirevo simplifies the process by combining smart search, filtering options, and a user-friendly interface.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          With a focus on innovation and user experience, Hirevo aims to become a go-to platform for tech recruitment and career development.
        </p>
      </section>
    </main>
  );
}
