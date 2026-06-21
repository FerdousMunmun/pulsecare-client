
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
const [requests, setRequests] = useState([]);

useEffect(() => {
fetch("http://localhost:5000/donation-requests")
.then((res) => res.json())
.then((data) => {
setRequests(data);
});
}, []);

return ( <div className="max-w-7xl mx-auto p-8">


  {/* Welcome Section */}
  <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

    <div className="flex items-center justify-between flex-wrap gap-4">

      <div>
        <h1 className="text-4xl font-extrabold text-red-700">
          Welcome 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for being a valuable donor.
        </p>
      </div>

      <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
        Active
      </div>

    </div>

    <div className="grid md:grid-cols-3 gap-5 mt-8">

      <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-2xl border border-red-100">

        <p className="text-gray-500 text-sm">
          User Name
        </p>

        <h3 className="text-2xl font-bold mt-2">
      
        </h3>

      </div>

      <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-100">

        <p className="text-gray-500 text-sm">
          Role
        </p>

        <h3 className="text-2xl font-bold mt-2">
          Donor
        </h3>

      </div>

      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-100">

        <p className="text-gray-500 text-sm">
          Total Requests
        </p>

        <h3 className="text-2xl font-bold mt-2">
          {requests.length}
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
        className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      >

        {/* Top Banner */}
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

        {/* Content */}
        <div className="px-6 pt-10 pb-6">

          <h3 className="text-xl font-bold text-center text-gray-900">
            {request.recipientName}
          </h3>

          <p className="text-[10px] text-center uppercase tracking-[3px] text-gray-400 mb-6">
            Recipient
          </p>

          <div className="space-y-4">

            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                Location
              </p>

              <p className="text-sm font-semibold text-gray-700">
                {request.recipientUpazila},{" "}
                {request.recipientDistrict}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                Date & Time
              </p>

              <p className="text-sm font-semibold text-gray-700">
                {request.donationDate} | {request.donationTime}
              </p>
            </div>

          </div>

          <Link href={`/donation-requests/${request._id}`}>
            <button className="mt-8 w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-2xl transition">
              View Details →
            </button>
          </Link>

        </div>

      </div>

    ))}

  </div>

  <div className="mt-8 flex justify-center">

    <Link
  href="/dashboard/donor/my-donation-request"
  className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-xl font-semibold"
>
  View All Requests
</Link>

  </div>

</div>


);
}
