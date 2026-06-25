




"use client";

import { useEffect, useState } from "react";

import {
    getFundings,
    createFunding,
} from "@/services/funding";


import {
  createCheckoutSession,

} from "@/services/funding";
import FundingModal from "@/components/FundingModel";
import { authClient } from "@/lib/auth-client";

export default function FundingPage() {


    const { data: session } =
        authClient.useSession();

    const user =
        session?.user;
    const [fundings, setFundings] =
        useState([]);

    const [isOpen, setIsOpen] =
        useState(false);

    useEffect(() => {
        loadFundings();
    }, []);

    const loadFundings =
        async () => {
            const data =
                await getFundings();

            setFundings(data);
        };

  const handleFunding =
  async (amount) => {

    localStorage.setItem(
      "fundingInfo",
      JSON.stringify({
        userName:
          user?.name,

        userEmail:
          user?.email,

        amount:
          Number(amount),
      })
    );

    const data =
      await createCheckoutSession({
        amount:
          Number(amount),

        email:
          user?.email,
      });

    window.location.href =
      data.url;
  };

    return (
        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold text-red-700">
                    Funding History
                </h1>

                <button
                    onClick={() =>
                        setIsOpen(true)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                    Give Fund
                </button>

            </div>

            <div className="bg-white rounded-2xl shadow overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-red-600 text-white">

                        <tr>
                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Amount
                            </th>

                            <th className="p-4 text-left">
                                Date
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {fundings.map(
                            (item) => (
                                <tr
                                    key={item._id}
                                    className="border-b"
                                >
                                    <td className="p-4">
                                        {item.userName}
                                    </td>

                                    <td className="p-4">
                                        {item.userEmail}
                                    </td>

                                    <td className="p-4">
                                        ${item.amount}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            item.fundingDate
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>

            <FundingModal
                isOpen={isOpen}
                onClose={() =>
                    setIsOpen(false)
                }
                onConfirm={
                    handleFunding
                }
            />

        </div>
    );
}