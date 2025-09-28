"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/employers", label: "Employers" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          Hir<span className="text-gray-800">evo</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 rounded ${
                pathname === link.href
                  ? "font-bold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Buttons */}
          <div className="flex gap-3 ml-6">
            <Link
              href="/auth/login"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 space-y-2 bg-white shadow">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 rounded ${
                pathname === link.href
                  ? "font-bold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Buttons */}
          <Link
            href="/auth/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded text-center"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded text-center"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
