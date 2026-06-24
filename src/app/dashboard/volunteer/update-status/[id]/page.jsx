"use client";

import { use } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateStatusPage({
  params,
}) {

  const resolvedParams =
    use(params);

  const id =
    resolvedParams.id;

  const router = useRouter();

  const [status, setStatus] =
    useState("pending");

  const handleUpdate =
    async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/donation-requests/${id}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              status,
            }),
          }
        );

        const data =
          await res.json();

        console.log(data);

        alert(
          "Status Updated Successfully"
        );

        router.push(
          "/dashboard/volunteer/all-blood-donation-request"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Update Status"
        );

      }

    };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-red-700 mb-6">
          Update Donation Status
        </h1>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-3 mb-5"
        >
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

        <button
          onClick={
            handleUpdate
          }
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Update Status
        </button>

      </div>
    </div>
  );
}