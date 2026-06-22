"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  createDonationRequest,
} from "@/services/donationRequest";

export default function CreateDonationRequestPage() {
const [session, setSession] = useState(null);

const [districts, setDistricts] = useState([]);
const [upazilas, setUpazilas] = useState([]);
const [selectedDistrictId, setSelectedDistrictId] = useState("");

const [formData, setFormData] = useState({
recipientName: "",
recipientDistrict: "",
recipientUpazila: "",
hospitalName: "",
fullAddress: "",
bloodGroup: "",
donationDate: "",
donationTime: "",
requestMessage: "",
});

// Load Session
useEffect(() => {
authClient.getSession().then((res) => {
setSession(res.data);
});
}, []);

// Load Districts
useEffect(() => {
fetch("http://localhost:5000/districts")
.then((res) => res.json())
.then((data) => {
setDistricts(data);
});
}, []);

// Handle Input Change
const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

// District Change
const handleDistrictChange = async (e) => {
const districtId = e.target.value;


setSelectedDistrictId(districtId);

const selectedDistrict = districts.find(
  (district) => district.id === districtId
);

setFormData({
  ...formData,
  recipientDistrict: selectedDistrict?.name || "",
  recipientUpazila: "",
});

const res = await fetch(
  `http://localhost:5000/districts/${districtId}/upazilas`
);

const data = await res.json();

setUpazilas(data);


};

// Submit
const handleSubmit = async (e) => {
e.preventDefault();


const donationRequest = {
  requesterId: session?.user?.id,
  requesterName: session?.user?.name,
  requesterEmail: session?.user?.email,
  role: session?.user?.role,

  recipientName: formData.recipientName,
  recipientDistrict: formData.recipientDistrict,
  recipientUpazila: formData.recipientUpazila,
  hospitalName: formData.hospitalName,
  fullAddress: formData.fullAddress,
  bloodGroup: formData.bloodGroup,
  donationDate: formData.donationDate,
  donationTime: formData.donationTime,
  requestMessage: formData.requestMessage,

  status: "pending",
  createdAt: new Date(),
};

try {
  const data = await createDonationRequest(
    donationRequest
  );

  if (data.insertedId || data.acknowledged) {
    alert("Donation Request Created Successfully!");

    setFormData({
      recipientName: "",
      recipientDistrict: "",
      recipientUpazila: "",
      hospitalName: "",
      fullAddress: "",
      bloodGroup: "",
      donationDate: "",
      donationTime: "",
      requestMessage: "",
    });

    setSelectedDistrictId("");
    setUpazilas([]);
  }
} catch (error) {
  console.log(error);
  alert("Something went wrong!");
}


};

return ( <div className="max-w-6xl mx-auto py-10 px-4">


  {/* Header */}
  <h1 className="text-5xl font-extrabold">
    New{" "}
    <span className="text-red-700">
      Donation Request
    </span>
  </h1>

  <p className="text-gray-500 mt-2 mb-10">
    Complete the form below to broadcast an urgent request.
  </p>

  <form onSubmit={handleSubmit}>

    {/* Requester Info */}
    <div className="bg-white border rounded-3xl p-8 mb-8">

      <h2 className="text-3xl font-bold mb-6">
        Requester Info
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          readOnly
          value={session?.user?.name || ""}
          className="border rounded-xl p-4 bg-gray-50 w-full"
        />

        <input
          readOnly
          value={session?.user?.email || ""}
          className="border rounded-xl p-4 bg-gray-50 w-full"
        />

      </div>

    </div>

    {/* Patient Details */}
    <div className="bg-white border rounded-3xl p-8 mb-8">

      <h2 className="text-3xl font-bold mb-6">
        Patient Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          name="recipientName"
          placeholder="Recipient Name"
          value={formData.recipientName}
          onChange={handleChange}
          className="border rounded-xl p-4"
          required
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="border rounded-xl p-4"
          required
        >
          <option value="">
            Select Blood Group
          </option>

          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <select
          value={selectedDistrictId}
          onChange={handleDistrictChange}
          className="border rounded-xl p-4"
          required
        >
          <option value="">
            Select District
          </option>

          {districts.map((district) => (
            <option
              key={district.id}
              value={district.id}
            >
              {district.name}
            </option>
          ))}
        </select>

        <select
          name="recipientUpazila"
          value={formData.recipientUpazila}
          onChange={handleChange}
          className="border rounded-xl p-4"
          required
        >
          <option value="">
            Select Upazila
          </option>

          {upazilas.map((upazila) => (
            <option
              key={upazila.id}
              value={upazila.name}
            >
              {upazila.name}
            </option>
          ))}
        </select>

      </div>

    </div>

    {/* Hospital & Timing */}
    <div className="bg-white border rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-6">
        Hospital & Timing
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          name="hospitalName"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
          className="border rounded-xl p-4"
          required
        />

        <input
          name="fullAddress"
          placeholder="Street / Ward / Area"
          value={formData.fullAddress}
          onChange={handleChange}
          className="border rounded-xl p-4"
          required
        />

        <input
          type="date"
          name="donationDate"
          value={formData.donationDate}
          onChange={handleChange}
          className="border rounded-xl p-4"
          required
        />

        <input
          type="time"
          name="donationTime"
          value={formData.donationTime}
          onChange={handleChange}
          className="border rounded-xl p-4"
          required
        />

      </div>

      <textarea
        name="requestMessage"
        rows="5"
        placeholder="Explain why the blood is needed..."
        value={formData.requestMessage}
        onChange={handleChange}
        className="w-full border rounded-xl p-4 mt-6"
        required
      />

      <div className="flex justify-end mt-8">

        <button
          type="submit"
          className="bg-red-700 hover:bg-red-800 text-white px-10 py-4 rounded-2xl font-semibold"
        >
          Create Donation Request
        </button>

      </div>

    </div>

  </form>

</div>


);
}
