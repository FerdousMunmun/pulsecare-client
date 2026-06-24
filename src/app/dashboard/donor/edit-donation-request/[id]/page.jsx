"use client";

import Link from "next/link";




import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDonationRequestById } from "@/services/donationRequest";
import {
  updateDonationRequest,
} from "@/services/donationRequest";



export default function EditDonationRequestPage() {

  const params = useParams();
const router = useRouter();
const [formData, setFormData] = useState({
  recipientName: "",
  recipientDistrict: "",
  recipientUpazila: "",
  hospitalName: "",
  fullAddress: "",
});

 useEffect(() => {
  if (!params?.id) return;

  getDonationRequestById(params.id)
   
    .then((data) => {

      
      setFormData({
        recipientName: data.recipientName || "",
        recipientDistrict: data.recipientDistrict || "",
        recipientUpazila: data.recipientUpazila || "",
        hospitalName: data.hospitalName || "",
        fullAddress: data.fullAddress || "",
      });
    });
}, [params]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
       console.log("FORM DATA:", formData);
    const result =
      await updateDonationRequest(
        params.id,
        formData
         
      );

  
  
   if (result.modifiedCount > 0) {
  alert("Updated Successfully");

  router.push(
    "/dashboard/donor/my-donation-requests"
  );
}
  };


  return (
    <div className="max-w-4xl mx-auto py-10 px-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/donor/my-donation-request"
            className="w-10 h-10 rounded-full border flex items-center justify-center"
          >
            ←
          </Link>

          <div>
            <h1 className="text-4xl font-bold">
              Edit{" "}
              <span className="text-red-600">
                Request
              </span>
            </h1>

            <p className="text-gray-500 text-sm">
              Update the details for this blood requirement.
            </p>
          </div>
        </div>

        <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-semibold uppercase">
          Current Status: Pending
        </div>

      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <input
              value={formData.recipientName}
              onChange={handleChange}
              name="recipientName"
              className="w-full mt-2 border rounded-xl px-4 py-3 text-sm"
            />
          </div>

          <div>
            <input
              value={formData.
                recipientDistrict}
              onChange={handleChange}
              name="recipientDistrict"
              className="w-full mt-2 border rounded-xl px-4 py-3 text-sm"
            />
          </div>

          <div>
            <input
              value={formData.recipientUpazila}
              onChange={handleChange}
              name="recipientUpazila"
              className="w-full mt-2 border rounded-xl px-4 py-3 text-sm"
            />
          </div>

          <div>
            <input
              value={formData.hospitalName}
              onChange={handleChange}
              name="hospitalName"
             className="w-full mt-2 border rounded-xl px-4 py-3 text-sm"
            />
          </div>

        </div>

        <div className="mt-5">

          <textarea
            value={formData.fullAddress}
            onChange={handleChange}
            name="fullAddress"
            rows="5"
            className="w-full mt-4 border rounded-xl px-4 py-3 text-sm"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">

          <Link
            href="/dashboard/donor/my-donation-request"
          >
            <button className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl font-medium">
              Cancel
            </button>
          </Link>

          <button
            onClick={handleUpdate}
           className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Update Request
          </button>
        </div>

      </div>

    </div>
  );
}