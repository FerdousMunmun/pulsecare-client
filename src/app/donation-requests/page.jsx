"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@heroui/react";
import { getDonationRequests } from "@/services/donationRequest";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

export default function DonationRequestsPage() {

  const [requests, setRequests] = useState([]);
// paginationstate

const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 9;


const lastIndex = currentPage * itemsPerPage;
const firstIndex = lastIndex - itemsPerPage;

const currentRequests = requests.slice(firstIndex, lastIndex);

const totalPages = Math.ceil(requests.length / itemsPerPage);
// paginationstate


useEffect(() => {
  getDonationRequests().then((data) => {
    const pendingRequests = data.filter(
      (request) => request.status === "pending"
    );

    setRequests(pendingRequests);
  });
}, []);

  return (

    <div className="max-w-7xl mx-auto py-10">

      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">
        Donation Requests
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
       
        {currentRequests.map((request) => (

          <div className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
  
  {/* Top Section */}
  <div className="bg-red-100 h-28 relative">
    
    <p className="absolute top-4 left-4 text-[10px] font-bold text-orange-500 uppercase tracking-widest">
   ● {request.status}
    </p>

    <div className="absolute -bottom-6 left-5 bg-white shadow-lg rounded-2xl w-16 h-16 flex items-center justify-center">
      <span className="text-3xl font-extrabold text-yellow-600">
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

      <div className="flex items-center gap-3">
        <FaMapMarkerAlt className="text-orange-500" />

        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
            Location
          </p>

          <p className="text-sm font-semibold text-gray-700">
            {request.recipientUpazila},{" "}
            {request.recipientDistrict}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <FaCalendarAlt className="text-orange-500" />

        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
            Date & Time
          </p>

          <p className="text-sm font-semibold text-gray-700">
            {request.donationDate} | {request.donationTime}
          </p>
        </div>
      </div>

    </div>

    <Link
 href={`/donation-requests/${request._id}`}
>
  <button className="mt-8 w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-2xl transition">
      View Details →
    </button>

</Link>

  

  </div>
</div>
        ))}

      </div>


{/* pagination addedd */}



<div className="flex justify-center items-center gap-2 mt-10">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
  >
    «
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`w-10 h-10 rounded-lg font-semibold ${
        currentPage === index + 1
          ? "bg-red-700 text-white"
          : "bg-white border hover:bg-red-50"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
  >
    »
  </button>

</div>

<p className="text-center text-gray-500 mt-4">
  Showing {firstIndex + 1} to{" "}
  {Math.min(lastIndex, requests.length)}
  {" "}of {requests.length} requests
</p>
{/* pagination addedd */}
      

    </div>

  );
}