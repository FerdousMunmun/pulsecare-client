import Link from "next/link";
import { getDonationRequests } from "@/services/donationRequest";

export default async function AllBloodDonationRequestPage({
  searchParams,
}) {
  const params = await searchParams;

  const currentPage =
    Number(params?.page) || 1;

  const statusFilter =
    params?.status || "";

  const bloodGroupFilter =
    params?.bloodGroup || "";

  const searchTerm =
    params?.search || "";

  const itemsPerPage = 5;

  const requests =
    await getDonationRequests();
    


  let filteredRequests = [...requests];

  // Status Filter
  if (statusFilter) {
    filteredRequests =
      filteredRequests.filter(
        (request) =>
          request.status
            ?.toLowerCase()
            .trim() ===
          statusFilter
            .toLowerCase()
            .trim()
      );
  }

  // Blood Group Filter
  if (bloodGroupFilter) {
    filteredRequests =
      filteredRequests.filter(
        (request) =>
          request.bloodGroup ===
          bloodGroupFilter
      );
  }

  // Search Filter
  if (searchTerm) {
    filteredRequests =
      filteredRequests.filter(
        (request) =>
          request.recipientName
            ?.toLowerCase()
            .trim()
            .includes(
              searchTerm
                .toLowerCase()
                .trim()
            )
      );
  }

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredRequests.length /
        itemsPerPage
    )
  );

  const paginatedRequests =
    filteredRequests.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage * itemsPerPage
    );

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold text-red-700 mb-6">
        All Blood Donation Requests
      </h1>

      {/* Filter Section */}

      <form
        action="/dashboard/volunteer/all-blood-donation-request"
        className="bg-white p-4 rounded-2xl shadow mb-6"
      >
        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            name="search"
            defaultValue={searchTerm}
            placeholder="Search recipient..."
            className="border rounded-xl p-3"
          />

          <select
            name="bloodGroup"
            defaultValue={bloodGroupFilter}
            className="border rounded-xl p-3"
          >
            <option value="">
              All Blood Groups
            </option>

            <option value="A+">
              A+
            </option>

            <option value="A-">
              A-
            </option>

            <option value="B+">
              B+
            </option>

            <option value="B-">
              B-
            </option>

            <option value="AB+">
              AB+
            </option>

            <option value="AB-">
              AB-
            </option>

            <option value="O+">
              O+
            </option>

            <option value="O-">
              O-
            </option>
          </select>

          <select
            name="status"
            defaultValue={statusFilter}
            className="border rounded-xl p-3"
          >
            <option value="">
              All Status
            </option>

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

        <div className="mt-4 flex gap-3">

          <button
            type="submit"
            className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
          >
            Apply Filter
          </button>

          <Link
            href="/dashboard/volunteer/all-blood-donation-request"
            className="bg-gray-200 px-5 py-2 rounded-xl"
          >
            Reset
          </Link>

        </div>
      </form>

      {/* No Data */}

      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            No Donation Request Found
          </h2>
        </div>
      ) : (

        <>
          {/* Table */}

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
                        {
                          request.recipientDistrict
                        }
                      </td>

                      <td className="p-4">
                        {
                          request.donationDate
                        }
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
                              : request.status ===
                                "done"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {request.status}
                        </span>

                      </td>

                      <td className="p-4">

                        <div className="flex gap-2 flex-wrap">

                          <Link
                            href={`/donation-requests/${request._id}`}
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                          >
                            View Details
                          </Link>

                          <Link
                            href={`/dashboard/volunteer/update-status/${request._id}`}
                            className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                          >
                            Update Status
                          </Link>

                        </div>

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
                }&status=${statusFilter}&bloodGroup=${bloodGroupFilter}&search=${searchTerm}`}
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
                  }&status=${statusFilter}&bloodGroup=${bloodGroupFilter}&search=${searchTerm}`}
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

            {currentPage <
              totalPages && (
              <Link
                href={`/dashboard/volunteer/all-blood-donation-request?page=${
                  currentPage + 1
                }&status=${statusFilter}&bloodGroup=${bloodGroupFilter}&search=${searchTerm}`}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Next
              </Link>
            )}

          </div>

        </>
      )}

    </div>
  );
}