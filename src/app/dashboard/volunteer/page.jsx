import React from "react";

const VolunteerHomePage = () => {
  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-red-700 mb-2">
        Volunteer Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Welcome to PulseCare Volunteer Panel
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <h3 className="text-gray-500">
            Total Requests
          </h3>

          <h2 className="text-4xl font-bold text-red-600 mt-2">
            0
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <h3 className="text-gray-500">
            Pending Requests
          </h3>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            0
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <h3 className="text-gray-500">
            Completed Donations
          </h3>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            0
          </h2>
        </div>

      </div>

      <div className="mt-10 bg-white shadow-lg rounded-2xl p-8 border">

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Volunteer Responsibilities
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>✓ View all donation requests</li>
          <li>✓ Update donation request status</li>
          <li>✓ Monitor ongoing donations</li>
          <li>✓ Help connect donors and recipients</li>
        </ul>

      </div>

    </div>
  );
};

export default VolunteerHomePage;