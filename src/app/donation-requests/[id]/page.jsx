
import {
  getDonationRequestById,
} from "@/services/donationRequest";




export default async function DonationdetailsPage({
  params,
}) {

  const request =
    await getDonationRequestById(
      params.id
    );

  return (
    ...
  );
}

  return (
    <div className="max-w-4xl mx-auto p-8">

  <div className="bg-white rounded-3xl shadow-lg p-8">

    <h1 className="text-3xl font-bold text-red-600 mb-8">
      Donation Request Details
    </h1>

    <div className="grid md:grid-cols-2 gap-5">

      <div>
        <p className="text-gray-500">
          Recipient Name
        </p>
        <h3>{request.recipientName}</h3>
      </div>

      <div>
        <p className="text-gray-500">
          Blood Group
        </p>
        <h3>{request.bloodGroup}</h3>
      </div>

      <div>
        <p className="text-gray-500">
          District
        </p>
        <h3>{request.recipientDistrict}</h3>
      </div>

      <div>
        <p className="text-gray-500">
          Upazila
        </p>
        <h3>{request.recipientUpazila}</h3>
      </div>

      <div>
        <p className="text-gray-500">
          Hospital
        </p>
        <h3>{request.hospitalName}</h3>
      </div>

      <div>
        <p className="text-gray-500">
          Status
        </p>
        <h3>{request.status}</h3>
      </div>

      <div>
        <p className="text-gray-500">
          Donation Date
        </p>
        <h3>{request.donationDate}</h3>
      </div>

      <div>
        <p className="text-gray-500">
          Donation Time
        </p>
        <h3>{request.donationTime}</h3>
      </div>

    </div>

    <div className="mt-6">
      <p className="text-gray-500">
        Full Address
      </p>

      <h3>{request.fullAddress}</h3>
    </div>

    <div className="mt-6">
      <p className="text-gray-500">
        Request Message
      </p>

      <h3>{request.requestMessage}</h3>
    </div>

    <div className="mt-6">
      <p className="text-gray-500">
        Requester Name
      </p>

      <h3>{request.requesterName}</h3>
    </div>

    <div className="mt-3">
      <p className="text-gray-500">
        Requester Email
      </p>

      <h3>{request.requesterEmail}</h3>
    </div>

  </div>

</div>
  );
}