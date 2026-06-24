import { getDonationRequests } from "@/services/donationRequest";
import { getUsers } from "@/services/user";

export default async function AdminHomePage() {
  const requests = await getDonationRequests();
const users = await getUsers();

const totalUsers = users.length;
const totalFunding = 0;
  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  ).length;

  const inProgressRequests = requests.filter(
    (request) => request.status === "inprogress"
  ).length;

  const completedRequests = requests.filter(
    (request) => request.status === "done"
  ).length;

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8 text-red-600">
        Admin Dashboard
      </h1>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">
      Total Users
    </h3>

    <p className="text-4xl font-bold text-blue-600 mt-2">
      {totalUsers}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">
      Total Funding
    </h3>

    <p className="text-4xl font-bold text-green-600 mt-2">
      {totalFunding}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-500">
      Total Blood Requests
    </h3>

    <p className="text-4xl font-bold text-red-600 mt-2">
      {totalRequests}
    </p>
  </div>

</div>

      <div className="bg-white mt-8 p-8 rounded-2xl shadow text-red-600">
        <h2 className="text-2xl font-bold mb-4">
          Admin Overview
        </h2>

        <p className="text-gray-600">
          Manage blood donation requests, volunteers,
          donors and platform activities from this dashboard.
        </p>
      </div>

    </div>
  );
}