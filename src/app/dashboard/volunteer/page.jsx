
import { getDashboardStats } from "@/services/donation";
import {
  FaUsers,
  FaHandHoldingHeart,
  FaTint,
} from "react-icons/fa";

export default async function VolunteerHomePage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-red-700">
            Volunteer Dashboard
          </h1>

          <p className="text-gray-500 mt-3 text-lg max-w-2xl">
            Welcome to PulseCare Volunteer Panel. Thank you for
            helping save lives through blood donation.
          </p>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
          alt="Volunteer"
          className="w-30 md:w-35"
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Donors */}
        <div className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">
              Total Users (Donors)
            </p>

            <h2 className="text-2xl font-bold text-red-600 mt-3">
              {stats.totalDonors}
            </h2>
          </div>

          <FaUsers className="text-2xl text-red-500" />
        </div>

        {/* Total Funding */}
        <div className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">
              Total Funding
            </p>

            <h2 className="text-2xl font-bold text-yellow-500 mt-3">
              ৳{stats.totalFunding}
            </h2>
          </div>

          <FaHandHoldingHeart className="text-2xl text-yellow-500" />
        </div>

        {/* Total Requests */}
        <div className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">
              Total Blood Requests
            </p>

            <h2 className="text-2xl font-bold text-green-600 mt-3">
              {stats.totalRequests}
            </h2>
          </div>

          <FaTint className="text-2xl text-green-600" />
        </div>
      </div>

      {/* Responsibilities Section */}
      <div className="bg-white rounded-3xl shadow-md p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-red-700 mb-8">
              Volunteer Responsibilities
            </h2>

            <div className="space-y-5 text-lg">
              <p>
                ✅ View all donation requests
              </p>

              <p>
                ✅ Update donation request status
              </p>

              <p>
                ✅ Monitor ongoing donations
              </p>

              <p>
                ✅ Help connect donors and recipients
              </p>

              <p>
                ✅ Support blood donation campaigns
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
              alt="Blood Donation"
              className="w-30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}