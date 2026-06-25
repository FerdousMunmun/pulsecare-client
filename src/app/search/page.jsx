"use client";


import { useEffect, useState } from "react";
import { searchDonors } from "@/services/user";

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

  console.log(data);

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
      onChange={(e)=>setBloodGroup(e.target.value)}
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

      {districts.map((district)=>(

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
      onChange={(e)=>setUpazila(e.target.value)}
      className="border p-3 rounded-xl"
    >

      <option value="">
        Select Upazila
      </option>

      {upazilas.map((upazila)=>(

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
 {/* 👇 এই জায়গায় বসাবে */}
    <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {donors.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">
          No donors found.
        </p>
      ) : (
        donors.map((donor) => (
          <div
            key={donor._id}
            className="bg-white shadow-lg rounded-2xl p-6"
          >
            <img
              src={donor.image}
              alt={donor.name}
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-red-500"
            />

            <h2 className="text-xl font-bold text-center mt-4">
              {donor.name}
            </h2>

            <p className="text-center text-red-600 font-semibold">
              {donor.bloodGroup}
            </p>

            <p className="text-center">
              {donor.district}
            </p>

            <p className="text-center">
              {donor.upazila}
            </p>
          </div>
        ))
      )}

    </div>

 
);


    </div>
  );
}