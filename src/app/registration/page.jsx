"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
Button,
Description,
Fieldset,
Form,
Input,
Label,
Surface,
TextField,
} from "@heroui/react";

export default function RegistrationPage() {
const [districts, setDistricts] = useState([]);
const [upazilas, setUpazilas] = useState([]);
const [loading, setLoading] = useState(false);

// Load Districts From Backend
useEffect(() => {
fetch("http://localhost:5000/districts")
.then((res) => res.json())
.then((data) => setDistricts(data))
.catch(console.error);
}, []);

// Load Upazila By District
const handleDistrictChange = async (e) => {
const districtId = e.target.value;


const res = await fetch(
  `http://localhost:5000/districts/${districtId}/upazilas`
);

const data = await res.json();

setUpazilas(data);


};

const onSubmit = async (e) => {
e.preventDefault();
setLoading(true);

```
try {
  const formData = new FormData(e.currentTarget);

  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Image Upload
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

    const uploadData = await uploadRes.json();

    imageUrl = uploadData.data.url;
  }

  const result = await authClient.signUp.email({
    name: formData.get("name"),
    email: formData.get("email"),
    password,

    image: imageUrl,
    bloodGroup: formData.get("bloodGroup"),
    district: formData.get("district"),
    upazila: formData.get("upazila"),

    role: "donor",
    status: "active",
    plan: "free",
  });

  if (result?.error) {
    alert(result.error.message);
    return;
  }

  alert("Registration Successful");
  window.location.href = "/";
} catch (error) {
  console.log(error);
  alert("Something went wrong");
} finally {
  setLoading(false);
}
```

};

return ( <div className="max-w-3xl mx-auto mt-10 border rounded-3xl p-8 shadow-lg"> <Surface> <Form onSubmit={onSubmit}> <Fieldset className="w-full">


        <Fieldset.Legend className="text-center text-3xl font-bold">
          Blood Donation Registration
        </Fieldset.Legend>

        <Description className="text-center mb-6">
          Join as a blood donor and save lives
        </Description>

        <div className="space-y-4">

          <TextField isRequired name="name">
            <Label>Name</Label>
            <Input />
          </TextField>

          <TextField isRequired type="email" name="email">
            <Label>Email</Label>
            <Input />
          </TextField>

          <div>
            <Label>Avatar</Label>

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
              <option value="">Select Blood Group</option>

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
              onChange={handleDistrictChange}
              className="w-full border p-3 rounded-lg"
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
            <Label>Upazila</Label>

            <select
              name="upazila"
              required
              className="w-full border p-3 rounded-lg"
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

          <TextField isRequired name="password">
            <Label>Password</Label>
            <Input type="password" />
          </TextField>

          <TextField isRequired name="confirmPassword">
            <Label>Confirm Password</Label>
            <Input type="password" />
          </TextField>

        </div>

        <Button
          type="submit"
          isDisabled={loading}
          className="w-full mt-5 bg-red-600 text-white"
        >
          {loading ? "Creating Account..." : "Register"}
        </Button>

      </Fieldset>
    </Form>
  </Surface>
</div>


);
}
