import {
  getDonationRequestById,
} from "@/services/donationRequest";

import Link from "next/link";

import DonateButton from "@/components/DonateButton";


export default async function DonationDetailsPage({
  params,
}) {

  const { id } = await params;

  const request =
    await getDonationRequestById(id);
console.log(request._id);

  return (
    <div className="max-w-6xl mx-auto p-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Donation Request
            <span className="text-red-600">
              {" "}Details
            </span>
          </h1>

          <p className="text-gray-500 mt-2">
            Complete information about this blood request
          </p>
        </div>


        <span className="px-5 py-2 rounded-full bg-red-100 text-red-600 font-bold capitalize">
          {request.status}
        </span>

      </div>



      {/* Request Information */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          🩸 Request Information
        </h2>


        <div className="grid md:grid-cols-3 gap-6">


          <Info
            title="Recipient Name"
            value={request.recipientName}
          />


          <Info
            title="Blood Group"
            value={request.bloodGroup}
          />


          <Info
            title="Donation Date"
            value={request.donationDate}
          />


          <Info
            title="Donation Time"
            value={request.donationTime}
          />


          <Info
            title="District"
            value={request.recipientDistrict}
          />


          <Info
            title="Upazila"
            value={request.recipientUpazila}
          />


          <Info
            title="Hospital"
            value={request.hospitalName}
          />


          <Info
            title="Address"
            value={request.fullAddress}
          />


        </div>


        <div className="mt-8 bg-red-50 p-5 rounded-2xl">

          <p className="text-gray-500">
            Request Message
          </p>

          <h3 className="font-semibold mt-2">
            {request.requestMessage}
          </h3>

        </div>

      </div>




      {/* Requester */}


      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          👤 Requester Information
        </h2>


        <div className="grid md:grid-cols-2 gap-6">


          <Info
            title="Requester Name"
            value={request.requesterName}
          />


          <Info
            title="Requester Email"
            value={request.requesterEmail}
          />


        </div>


      </div>




      {/* Donate Section */}

      <div className="bg-red-50 border border-red-100 rounded-3xl p-8 flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            Ready to Help Save a Life?
          </h2>

          <p className="text-gray-500">
            Donate blood and help the patient.
          </p>

        </div>


        <DonateButton
          requestId={request._id}
        />


      </div>



      <div className="text-center mt-8">

        <Link href="/donation-requests">

          <button className="px-8 py-3 bg-gray-100 rounded-xl font-semibold">

            ← Back To Requests

          </button>

        </Link>

      </div>



    </div>
  );
}




function Info({
  title,
  value,
}) {

  return (

    <div className="border rounded-2xl p-5">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h3 className="font-bold mt-1">
        {value}
      </h3>

    </div>

  );
}