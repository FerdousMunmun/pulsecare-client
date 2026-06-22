
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getDonationRequests } from "@/services/donationRequest";

export default function DonarDashboardHomePage() {
  const [session, setSession] = useState(null);
  const [requests, setRequests] = useState([]);
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
  const myRequests = requests.filter(
    (request) =>
      request.requesterEmail === session?.user?.email
  );

  const recentRequests = myRequests
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 3);

  return (<div className="max-w-7xl mx-auto p-8">


    {/* Welcome Section */}
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

      <div className="flex items-center justify-between flex-wrap gap-4">

        <div>
          <h1 className="text-4xl font-extrabold text-red-700">
            Welcome, {session?.user?.name} 👋
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

        <div className="bg-red-50 p-5 rounded-xl">
          <p>User Name</p>
          <h3>{session?.user?.name}</h3>
        </div>

        <div className="bg-orange-50 p-5 rounded-xl">
          <p>Role</p>
          <h3>Donor</h3>
        </div>

        <div className="bg-green-50 p-5 rounded-xl">
          <p>Total Requests</p>
          <h3>{myRequests.length}</h3>
        </div>
      </div>
    </div>

    {/* tabular */}

    <div className="bg-white rounded-3xl shadow-lg overflow-hidden mt-8">
      {myRequests.length > 0 && (
        <>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">Recipient</th>

                <th className="p-4 text-left">Location</th>

                <th className="p-4 text-left">Date</th>

                <th className="p-4 text-left">Time</th>

                <th className="p-4 text-left">Group</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {recentRequests.map((request) => (

                <tr
                  key={request._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {request.recipientName}
                  </td>

                  <td className="p-4">
                    {request.recipientUpazila},{" "}
                    {request.recipientDistrict}
                  </td>

                  <td className="p-4">
                    {request.donationDate}
                  </td>

                  <td className="p-4">
                    {request.donationTime}
                  </td>

                  <td className="p-4 font-bold text-red-600">
                    {request.bloodGroup}
                  </td>

                  <td className="p-4">
                    {request.status}
                  </td>

                  <td className="p-4">

                    <Link
                      href={`/donation-requests/${request._id}`}
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </>
      )}
      <div className="mt-8 flex justify-center">

        <Link
          href="/dashboard/donor/my-donation-request"
          className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-xl font-semibold"
        >
          View All Requests
        </Link>

      </div>

    </div>

    {/* tabular */}
  </div>




  );
}
