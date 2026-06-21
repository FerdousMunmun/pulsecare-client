"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyDonationRequestPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/donation-requests")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Donation Requests
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {requests.map((request) => (

          <div
            key={request._id}
            className="bg-white rounded-[30px] overflow-hidden shadow-lg"
          >

            <div className="bg-red-100 h-24 relative">

              <p className="absolute top-4 left-4 text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                ● {request.status}
              </p>

              <div className="absolute -bottom-6 left-5 bg-white shadow-lg rounded-2xl w-16 h-16 flex items-center justify-center">
                <span className="text-3xl font-extrabold text-red-600">
                  {request.bloodGroup}
                </span>
              </div>

            </div>

            <div className="px-6 pt-10 pb-6">

              <h3 className="text-xl font-bold text-center">
                {request.recipientName}
              </h3>

              <p className="text-center text-gray-400 text-xs uppercase mb-6">
                Recipient
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {request.recipientUpazila},{" "}
                {request.recipientDistrict}
              </p>

              <p className="mt-2">
                <strong>Date:</strong>{" "}
                {request.donationDate}
              </p>

              <p className="mt-2">
                <strong>Time:</strong>{" "}
                {request.donationTime}
              </p>

              <p className="mt-2">
                <strong>Status:</strong>{" "}
                {request.status}
              </p>

              <Link
                href={`/donation-requests/${request._id}`}
              >
                <button className="mt-6 w-full bg-red-700 text-white py-3 rounded-xl">
                  View Details
                </button>
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}