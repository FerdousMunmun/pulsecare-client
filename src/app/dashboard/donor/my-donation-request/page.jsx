"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";




import {
  getDonationRequests,
  deleteDonationRequest,
} from "@/services/donationRequest";




export default function MyDonationRequestPage() {
const [session, setSession] = useState(null);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] =
  useState("all");
useEffect(() => {
  authClient.getSession().then((res) => {
    setSession(res.data);
   
  });
}, []);



useEffect(() => {
  getDonationRequests().then((data) => {
    setRequests(data);
  });
}, []);


  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure?"
  );

  if (!confirmDelete) return;

  const result =
    await deleteDonationRequest(id);

  if (result.deletedCount > 0) {
    setRequests(
      requests.filter(
        (request) => request._id !== id
      )
    );

    alert("Deleted Successfully");
  }
};

  const itemsPerPage = 10;

  const myRequests = requests.filter( 
  (request) =>
    request.requesterEmail ===
    session?.user?.email
    
);

 console.log(session?.user?.email);
console.log(myRequests);
const filteredRequests =
  filterStatus === "all"
    ? myRequests
    : myRequests.filter(
        (request) =>
          request.status === filterStatus
      );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentRequests =
  filteredRequests.slice(
    firstIndex,
    lastIndex
  );
  console.log("Current Requests:", currentRequests);

  const totalPages = Math.ceil(
  filteredRequests.length /
    itemsPerPage
);
  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          My <span className="text-red-600">Donation Requests</span>
        </h1>

        <p className="text-gray-500 mt-2">
          Manage and track your blood donation posts.
        </p>
      </div>


      <div className="mb-4">

  <select
    value={filterStatus}
    onChange={(e) =>
      setFilterStatus(e.target.value)
    }
    className="border p-3 rounded-xl"
  >
    <option value="all">All</option>
    <option value="pending">
      Pending
    </option>
    <option value="inprogress">
      In Progress
    </option>
    <option value="done">
      Done
    </option>
    <option value="canceled">
      Canceled
    </option>
  </select>

</div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Recipient Info</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Group</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {currentRequests.map((request, index) => (

              <tr
                key={request._id}
                className="border-t"
              >

                <td className="p-4">
                  {firstIndex + index + 1}
                </td>

                <td className="p-4">
                  <h3 className="font-semibold">
                    {request.recipientName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {request.donationDate}
                  </p>
                </td>

                <td className="p-4">
                  {request.recipientUpazila},{" "}
                  {request.recipientDistrict}
                </td>

                <td className="p-4 font-bold text-red-600">
                  {request.bloodGroup}
                </td>

                <td className="p-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {request.status}
                  </span>
                </td>

                <td className="p-4">

  <div className="flex gap-2">

    <Link
      href={`/donation-requests/${request._id}`}
    >
      <button className="bg-blue-400 text-white px-3 py-2 rounded-lg">
        View
      </button>
    </Link>

    <Link
  href={`/dashboard/donor/edit-donation-request/${request._id}`}
>
  <button className="bg-green-600 text-white px-3 py-2 rounded-lg">
    Edit
  </button>
</Link>

    <button
  onClick={() =>
    handleDelete(request._id)
  }
  className="bg-red-600 text-white px-3 py-2 rounded-lg"
>
  Delete
</button>

  </div>

</td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="flex justify-between items-center mt-6 px-6 pb-6">

          <p className="text-gray-500">
            Showing {firstIndex + 1} to{" "}
            {Math.min(lastIndex, requests.length)}
            {" "}of {requests.length} results
          </p>

          <div className="flex gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
              className="px-4 py-2 border rounded-lg"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (

              <button
                key={i}
                onClick={() =>
                  setCurrentPage(i + 1)
                }
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white"
                    : "border"
                }`}
              >
                {i + 1}
              </button>

            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
              className="px-4 py-2 border rounded-lg"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}