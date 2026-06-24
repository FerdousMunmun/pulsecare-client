"use client";

import { useState } from "react";

export default function FundingModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  const [amount, setAmount] =
    useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-2">
          Make a Contribution
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter the amount you wish to donate
        </p>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full border rounded-xl p-3 mb-5"
        />

        <button
          onClick={() =>
            onConfirm(amount)
          }
          className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold"
        >
          Confirm Funding
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-500"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}