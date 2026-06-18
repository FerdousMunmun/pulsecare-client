"use client";

import { useState } from "react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    alert(`Searching for: ${searchQuery}`);
    // এখানে API call বা routing add করতে পারো
  };

  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center bg-gray-900">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://unsplash.com/photos/close-up-doctor-holding-red-heart-and-stethoscope-health-insurance-concept--7yOVrKuzjE')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">

        {/* Badge */}
        <div className="inline-block px-4 py-1 mb-4 text-sm bg-white/10 rounded-full backdrop-blur">
          ❤️ Trusted by 15+ Local Heroes
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Saving Lives,
          <span className="text-red-500"> One Drop at a Time</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-200 text-sm md:text-base">
          Connect with donors instantly or find blood donation requests in your area.
        </p>

        {/* Search Box */}
        <div className="mt-6 flex flex-col md:flex-row items-center gap-3 justify-center">
          <input
            type="text"
            placeholder="Search donors, blood group, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 px-4 py-3 rounded-lg text-black outline-none"
          />

        
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <button  onClick={handleSearch}
          className="px-6 py-3 bg-red-800 hover:bg-red-700 rounded-lg font-semibold transition">
             Search Donor →
          </button>

          <button className="px-6 py-3 border border-white/40 hover:bg-white/10 rounded-lg transition">
            Search Requests
          </button>
        </div>
      </div>
    </section>
  );
}