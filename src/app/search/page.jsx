"use client";


import { useEffect, useState } from "react";
import { searchDonors } from "@/services/user";
import { FaPhoneAlt } from "react-icons/fa";

import {
  getDistricts,
  getUpazilas,
} from "@/services/distric";
export default function SearchPage() {



  const [bloodGroup, setBloodGroup] = useState("");

  const [districts, setDistricts] = useState([]);

  const [upazilas, setUpazilas] = useState([]);

  const [district, setDistrict] = useState("");

  const [upazila, setUpazila] = useState("");
  const [donors, setDonors] = useState([]);


  useEffect(() => {
    getDistricts()
      .then(setDistricts)
      .catch(console.error);
  }, []);


  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;

    const selectedDistrict = districts.find(
      (item) => item.id === districtId
    );

    setDistrict(selectedDistrict?.name || "");

    setUpazila("");

    const data = await getUpazilas(districtId);

    setUpazilas(data);
  };
  const handleSearch = async () => {
    console.log({
      bloodGroup,
      district,
      upazila,
    });

    const data = await searchDonors(
      bloodGroup,
      district,
      upazila
    );



    setDonors(data);
  };
  return (
    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold text-red-600 mb-8">
        Search Blood Donors
      </h1>
      <div className="bg-white shadow-lg rounded-2xl p-8 mt-8">

        <div className="grid md:grid-cols-4 gap-4">

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="border p-3 rounded-xl"
          >

            <option value="">
              Blood Group
            </option>

            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>

          </select>


          <select
            onChange={handleDistrictChange}
            className="border p-3 rounded-xl"
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
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="border p-3 rounded-xl"
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



          <button
            onClick={handleSearch}

            className="bg-red-600 text-white rounded-xl font-semibold"
          >
            Search
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {donors.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No donors found.
          </p>
        ) : (
          donors.map((donor) => (
            <div
              key={donor._id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="h-24 bg-red-100 relative">
                <img
                  src={donor.image}
                  alt={donor.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg absolute left-6 top-12 object-cover"
                />
              </div>

              {/* Body */}
              <div className="pt-16 px-6 pb-6">

                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {donor.name}
                  </h2>

                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {donor.bloodGroup}
                  </span>
                </div>

                <p className="text-gray-400  text-xs  mt-1">
                  Blood Donor
                </p>

                <div className="mt-6 space-y-3">

                  <div>
                    <p className="text-gray-400 text-xs">
                      District
                    </p>

                    <p className="font-medium">
                      {donor.district}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">
                      Upazilla
                    </p>

                    <p className="font-medium">
                      {donor.upazila}
                    </p>
                  </div>

                </div>

                <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  Contact Now
                  <FaPhoneAlt className="text-black" />
                </button>

              </div>
            </div>
          ))
        )}
      </div>





    </div>
  );
}