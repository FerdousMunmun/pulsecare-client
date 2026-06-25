"use client";

import { useState } from "react";
import { useEffect } from "react";

import { authClient } from "@/lib/auth-client";
import { FaCamera } from "react-icons/fa";
import {
  getUserProfile,
  updateUserProfile,
} from "@/services/user";

import {
  getDistricts,
  getUpazilas,
} from "@/services/distric";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState("");

  const [formData, setFormData] = useState({});
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [imageFile, setImageFile] = useState(null);


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

  useEffect(() => {
    getDistricts()
      .then(setDistricts)
      .catch(console.error);
  }, []);

  useEffect(() => {

    if (
      !districts.length ||
      !formData.district
    )
      return;

    const loadUpazilas = async () => {

      const selectedDistrict =
        districts.find(
          (district) =>
            district.name ===
            formData.district
        );

      if (!selectedDistrict)
        return;

      const data =
        await getUpazilas(
          selectedDistrict.id
        );

      setUpazilas(data);

    };

    loadUpazilas();

  }, [
    districts,
    formData.district,
  ]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {

    let imageUrl = formData.image;

    if (imageFile) {

      const imageForm = new FormData();

      imageForm.append(
        "image",
        imageFile
      );

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
          method: "POST",
          body: imageForm,
        }
      );

      const uploadData =
        await uploadRes.json();

      imageUrl =
        uploadData.data.url;
    }

    await updateUserProfile(
      userId,
      {
        ...formData,
        image: imageUrl,
      }
    );

    setFormData({
      ...formData,
      image: imageUrl,
    });

    setIsEditing(false);

    alert(
      "Profile Updated Successfully"
    );

  };



  const handleDistrictChange = async (e) => {

    const districtId = e.target.value;

    const selectedDistrict = districts.find(
      (district) => district.id === districtId
    );

    if (!selectedDistrict) return;

    const data = await getUpazilas(districtId);

    setUpazilas(data);

    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict.name,
      upazila: "",
    }));
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

          <div className="relative">

            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : formData.image
              }
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-red-500 object-cover"
            />

            {isEditing && (
              <>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {

                    const file = e.target.files[0];

                    if (!file) return;

                    if (!file.type.startsWith("image/")) {
                      alert("Please select an image.");
                      return;
                    }

                    if (file.size > 5 * 1024 * 1024) {
                      alert("Image size must be less than 5 MB.");
                      return;
                    }

                    setImageFile(file);

                  }}
                  className="hidden"
                />

                <label
                  htmlFor="avatar"
                  className="absolute bottom-1 right-1 bg-red-600 hover:bg-red-700 hover:scale-110 transition-all duration-200 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                >

                  <FaCamera size={18} />
                
                </label>
              </>
            )}

          </div>
           

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

            <select
              value={
                districts.find(
                  (d) => d.name === formData.district
                )?.id || ""
              }
              onChange={handleDistrictChange}
              disabled={!isEditing}
              className="w-full border rounded-xl p-3"
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
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Upazila
            </label>

            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-xl p-3"
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

      </div>
    </div>
  );
}