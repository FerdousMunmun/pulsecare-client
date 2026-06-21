"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

 useEffect(() => {
  fetch("http://localhost:5000/donation-requests")
    .then((res) => res.json())
    .then((data) => {
      console.log("Requests:", data);
      setRequests(data);
    });
}, []);

  return (
    <div className="max-w-7xl mx-auto p-8">

      {/* Welcome Section */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

        <h1 className="text-4xl font-bold text-red-700">
          Welcome 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for being a blood donor.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="bg-red-50 p-5 rounded-2xl">
            <p className="text-gray-500 text-sm">
              Status
            </p>

            <h3 className="text-xl font-bold text-green-600">
              Active
            </h3>
          </div>

          <div className="bg-red-50 p-5 rounded-2xl">
            <p className="text-gray-500 text-sm">
              Role
            </p>

            <h3 className="text-xl font-bold">
              Donor
            </h3>
          </div>

        </div>
      </div>

      {/* Recent Requests */}
      <h2 className="text-3xl font-bold mb-6">
        Recent Donation Requests
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {requests.slice(0, 3).map((request) => (

          <div
            key={request._id}
            className="bg-white rounded-2xl shadow-lg p-5"
          >

            <h3 className="text-3xl font-bold text-red-600">
              {request.bloodGroup}
            </h3>

            <p className="font-semibold mt-3">
              {request.recipientName}
            </p>

            <p className="text-gray-500">
              {request.recipientDistrict}
            </p>

            <p className="text-gray-500">
              {request.donationDate}
            </p>

          </div>

        ))}

      </div>

      <div className="mt-8">
        <Link
          href="/donation-requests"
          className="bg-red-700 text-white px-6 py-3 rounded-xl"
        >
          View All Requests
        </Link>
      </div>

    </div>
  );
}