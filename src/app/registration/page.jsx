"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  Fieldset,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import {
  getDistricts,
  getUpazilas,
} from "@/services/distric";

export default function RegistrationPage() {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [districtName, setDistrictName] = useState("");





  useEffect(() => {
    const loadDistricts = async () => {
      try {
        const data = await getDistricts();
        console.log("Districts:", data);
        setDistricts(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadDistricts();
  }, []);




  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;

    const selectedDistrict = districts.find(
      (district) => district.id === districtId
    );

    setDistrictName(selectedDistrict?.name || "");

    try {
      const data = await getUpazilas(districtId);
      setUpazilas(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const password = formData.get("password");
      const confirmPassword =
        formData.get("confirmPassword");

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }

      // Upload Image To ImageBB
      const imageFile = formData.get("image");

      let imageUrl = "";

      if (imageFile && imageFile.size > 0) {
        const imageForm = new FormData();

        imageForm.append("image", imageFile);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          {
            method: "POST",
            body: imageForm,
          }
        );

        const uploadData =
          await uploadRes.json();

        imageUrl = uploadData.data.url;
      }

      const result = await authClient.signUp.email({
        email: formData.get("email"),
        password,
        name: formData.get("name"),

        image: imageUrl,

        role: formData.get("role"),
        status: "active",

        bloodGroup: formData.get("bloodGroup"),
        district: districtName,
        upazila: formData.get("upazila"),
      });

      if (result?.error) {
        alert(result.error.message);
        return;
      }







      alert("Registration Successful");

      const role = formData.get("role");

      if (role === "donor") {
        window.location.href =
          "/dashboard/donor";
      } else if (
        role === "volunteer"
      ) {
        window.location.href =
          "/dashboard/volunteer";
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
    console.log(result);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 border rounded-3xl p-6 shadow-lg bg-white">
      <Surface>
        <form onSubmit={onSubmit}>
          <Fieldset className="w-full">

            <Fieldset.Legend className="text-center text-3xl font-bold text-red-700">
              Registration
            </Fieldset.Legend>

            <Description className="text-center mb-6">
              Create your donor account
            </Description>

            <div className="space-y-4">

              <TextField isRequired name="name">
                <Label>Name</Label>
                <Input />
              </TextField>

              <TextField
                isRequired
                type="email"
                name="email"
              >
                <Label>Email</Label>
                <Input />
              </TextField>

              <div>
                <Label>Role</Label>

                <select
                  name="role"
                  required
                  className="w-full border p-3 rounded-lg"
                >
                  <option value="">Select Role</option>
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>

                </select>
              </div>

              <div>
                <Label>Image</Label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  className="w-full border p-3 rounded-lg"
                />
              </div>

              <div>
                <Label>Blood Group</Label>

                <select
                  name="bloodGroup"
                  required
                  className="w-full border p-3 rounded-lg"
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
              </div>

              <div>
                <Label>District</Label>

                <select
                  name="district"
                  required
                  onChange={
                    handleDistrictChange
                  }
                  className="w-full border rounded-lg p-3"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select District
                  </option>

                  {districts.map(
                    (district) => (
                      <option
                        key={district.id}
                        value={district.id}
                      >
                        {district.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <Label>Upazila</Label>

                <select
                  name="upazila"
                  required
                  className="w-full border p-3 rounded-lg"
                >
                  <option value="">
                    Select Upazila
                  </option>

                  {upazilas.map(
                    (upazila) => (
                      <option
                        key={upazila.id}
                        value={upazila.name}
                      >
                        {upazila.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              <TextField
                isRequired
                name="password"
              >
                <Label>Password</Label>
                <Input type="password" />
              </TextField>

              <TextField
                isRequired
                name="confirmPassword"
              >
                <Label>
                  Confirm Password
                </Label>
                <Input type="password" />
              </TextField>

            </div>

            <Button
              type="submit"
              isDisabled={loading}
              className="w-full mt-5 bg-red-800 text-white"
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </Button>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-red-600 font-semibold hover:underline"
              >
                Login
              </a>
            </p>

          </Fieldset>
        </form>
      </Surface>
    </div>
  );
}