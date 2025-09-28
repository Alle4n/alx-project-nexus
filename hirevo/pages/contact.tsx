import {
  FaInstagram,
  FaXTwitter,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa6";

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-indigo-600">Contact Us</h1>
        <p className="text-gray-700 text-lg">
          Have questions or want to get in touch? Reach out via any of the platforms below.
        </p>
      </header>

      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">Get in Touch</h2>
        <p className="text-gray-700">
          We’re always happy to hear from job seekers, employers, or partners. Use any of the methods below to connect with us.
        </p>

        <ul className="flex gap-6 justify-center mt-4 text-[28px]">

          <li>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-indigo-600 transition"
            >
              <FaXTwitter />
            </a>
          </li>

          <li>
            <a
              href="mailto:hello@hirevo.com"
              className="text-[#EA4335] hover:text-indigo-600 transition"
            >
              <FaEnvelope />
            </a>
          </li>

          <li>
            <a
              href="https://wa.me/256700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-indigo-600 transition"
            >
              <FaWhatsapp />
            </a>
          </li>

          <li>
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E4405F] hover:text-indigo-600 transition"
            >
              <FaInstagram />
            </a>
          </li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Send Us a Message</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className=" text-gray-500 w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className=" text-gray-500 w-full px-3 py-2 border rounded"
            required
          />
          <textarea
            placeholder="Your Message"
            className=" text-gray-500 w-full px-3 py-2 border rounded h-24"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-900"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
