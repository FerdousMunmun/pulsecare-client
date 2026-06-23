import Link from "next/link";
import {
  getDonationRequests,
} from "@/services/donationRequest";

export default async function AllBloodDonationRequestPage({
  searchParams,
}) {
    
  
   const currentPage =
    Number((await searchParams)?.page) || 1;
    <h2>Current Page: {currentPage}</h2>

  const itemsPerPage = 5;

  const requests =
    await getDonationRequests();

  const totalPages = Math.ceil(
    requests.length / itemsPerPage
  );

  const paginatedRequests =
    requests.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold text-red-700 mb-6">
        All Blood Donation Requests
      </h1>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>
              <th className="p-4 text-left">
                Recipient
              </th>

              <th className="p-4 text-left">
                Blood Group
              </th>

              <th className="p-4 text-left">
                District
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {paginatedRequests.map(
              (request) => (
                <tr
                  key={request._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    {request.recipientName}
                  </td>

                  <td className="p-4">
                    {request.bloodGroup}
                  </td>

                  <td className="p-4">
                    {request.recipientDistrict}
                  </td>

                  <td className="p-4">
                    {request.donationDate}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        request.status ===
                        "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : request.status ===
                            "inprogress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/donation-requests/${request._id}`}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-2 mt-8">

        {currentPage > 1 && (
          <Link
            href={`/dashboard/volunteer/all-blood-donation-request?page=${
              currentPage - 1
            }`}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Previous
          </Link>
        )}

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <Link
              key={index}
              href={`/dashboard/volunteer/all-blood-donation-request?page=${
                index + 1
              }`}
              className={`px-4 py-2 rounded-lg ${
                currentPage ===
                index + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </Link>
          )
        )}

        {currentPage < totalPages && (
          <Link
            href={`/dashboard/volunteer/all-blood-donation-request?page=${
              currentPage + 1
            }`}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Next
          </Link>
        )}

      </div>

    </div>
  );
}