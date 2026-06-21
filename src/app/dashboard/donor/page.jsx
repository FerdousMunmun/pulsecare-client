import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function DonorDashboard() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
const response = await fetch(
  "http://localhost:5000/donation-requests",
  {
    cache: "no-store",
  }
);

const requests = await response.json();
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-red-700">
        Welcome, {session?.user?.name} 👋
      </h1>

      <p className="text-gray-500 mt-2">
        Thank you for being a donor.
      </p>

      <div className="grid md:grid-cols-3 gap-5 mt-8">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">User Name</p>
          <h3 className="font-bold">
            {session?.user?.name}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Role</p>
          <h3 className="font-bold">
            {session?.user?.role}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Status</p>
          <h3 className="font-bold text-green-600">
            Active
          </h3>
        </div>

      </div>


      {/* ------ */}

      <h2 className="text-2xl font-bold mt-10 mb-5">
  Recent Donation Requests
</h2>

<div className="grid md:grid-cols-3 gap-5">

  {requests.slice(0, 3).map((request) => (

    <div
      key={request._id}
      className="bg-white p-5 rounded-xl shadow"
    >

      <h3 className="text-3xl font-bold text-red-600">
        {request.bloodGroup}
      </h3>

      <p className="font-semibold mt-2">
        {request.recipientName}
      </p>

      <p>
        {request.recipientDistrict}
      </p>

      <p>
        {request.donationDate}
      </p>

    </div>

  ))}

</div>

<div className="mt-6">
  <Link
    href="/donation-requests"
    className="bg-red-700 text-white px-5 py-3 rounded-lg"
  >
    View All Requests
  </Link>
</div>
      {/* ------ */}

      

    </div>

    
  );
}