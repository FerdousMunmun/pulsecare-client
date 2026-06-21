"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm mb-6">
          ❤️ Trusted by 100+ Blood Donors
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-5xl">
          Saving Lives,
          <br />
          <span className="text-red-800">One Drop</span> at a Time
        </h1>

        <p className="text-gray-200 text-lg md:text-xl mt-6 max-w-3xl">
          Connect directly with blood donors and recipients.
          Join our community and help save lives across Bangladesh.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-10">
          
          <Link href="/registration">
            <button className="bg-red-800 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition">
              Become a Donor →
            </button>
          </Link>

          <Link href="/search">
            <button className="bg-white/10 border border-white text-white px-8 py-4 rounded-xl font-semibold backdrop-blur-md">
              Search Donors
            </button>
          </Link>

        </div>
      </div>

      {/* Stats Cards */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
            <h3 className="text-4xl font-bold text-gray-900">150+</h3>
            <p className="text-gray-500 mt-2">Active Donors</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl text-center border-2 border-red-500">
            <h3 className="text-4xl font-bold text-red-800">1,200+</h3>
            <p className="text-gray-500 mt-2">Blood Donations</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
            <h3 className="text-4xl font-bold text-gray-900">300+</h3>
            <p className="text-gray-500 mt-2">Blood Requests</p>
          </div>

        </div>
      </div>
    </section>
  );
}