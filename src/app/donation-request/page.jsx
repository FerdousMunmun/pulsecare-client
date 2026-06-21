"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DonationRequestsPage() {

  const [requests, setRequests] = useState([]);
useEffect(() => {
  fetch("http://localhost:5000/donation-requests")
    .then((res) => res.json())
    .then((data) => {
      setRequests(data);
      console.log(data);
    });
}, []);

  return (

    <div className="max-w-7xl mx-auto py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Donation Requests
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        {requests.map((request) => (

          <div
            key={request._id}
            className="bg-white rounded-3xl shadow-lg p-5"
          >

            <h2 className="text-5xl font-bold text-red-600">
              {request.bloodGroup}
            </h2>

            <h3 className="text-xl font-semibold mt-4">
              {request.recipientName}
            </h3>

            <p>
              {request.recipientUpazila}
            </p>

            <p>
              {request.recipientDistrict}
            </p>

            <p>
              {request.donationDate}
            </p>

            <p>
              {request.donationTime}
            </p>

            <Link
              href={`/donation-requests/${request._id}`}
            >
              <button
                className="w-full mt-4 bg-orange-500 text-white py-2 rounded-xl"
              >
                View Details
              </button>
            </Link>

          </div>

        ))}

      </div>

    </div>

  );
}