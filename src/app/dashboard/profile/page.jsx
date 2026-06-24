"use client";

import { useState } from "react";
import { useEffect } from "react";

import { authClient } from "@/lib/auth-client";

import {
  getUserProfile,
  updateUserProfile,
} from "@/services/user";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState("");

  const [formData, setFormData] = useState({});

  //   useEffect বসবে

  useEffect(() => {
    authClient
      .getSession()
      .then(async (res) => {
        const email =
          res.data?.user?.email;

        if (!email) return;

        const user =
          await getUserProfile(
            email
          );

        setUserId(user._id);

        setFormData({
          name: user.name || "",
          email: user.email || "",
          bloodGroup:
            user.bloodGroup || "",
          district:
            user.district || "",
          upazila:
            user.upazila || "",
          image:
            user.image || "",
        });
      });
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    // backend call later

    setIsEditing(false);

    alert("Profile Updated Successfully");
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-red-700">
              My Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your personal information
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2 rounded-xl"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* Avatar */}

        <div className="flex justify-center mb-10">

          <img
            src={formData.image}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-red-500"
          />

        </div>

        {/* Form */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full border rounded-xl p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Blood Group
            </label>

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-xl p-3"
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              District
            </label>

            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Upazila
            </label>

            <input
              type="text"
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-xl p-3"
            />
          </div>

        </div>

      </div>
    </div>
  );
}