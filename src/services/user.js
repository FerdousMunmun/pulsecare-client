import { authClient } from "@/lib/auth-client";



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {

const { data: token } = await authClient.token();
  
  const res = await fetch(`${API_URL}/users`, {
    headers: {
  authorization: `Bearer ${token?.token}`,
}
    
  });

  return res.json();
};

export const updateUserRole = async (
  id,
  role
) => {
  const { data: token } = await authClient.token();
  const res = await fetch(
    `${API_URL}/users/${id}/role`,
    {
      method: "PATCH",
      
      headers: {
        "Content-Type":
          "application/json",
            authorization: `Bearer ${token?.token}`,
      },
      body: JSON.stringify({ role }),
    }
  );

  return res.json();
};

export const updateUserStatus =
  async (id, status) => {
    const { data: token } = await authClient.token();
    const res = await fetch(
      `${API_URL}/users/${id}/status`,
      {
        method: "PATCH",
        
        headers: {
          "Content-Type":
            "application/json",
            authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    return res.json();
  };

export const getUserProfile = async (
  email
) => {
  const res = await fetch(
    `${API_URL}/users/${email}`
  );

  return res.json();
};

export const updateUserProfile =
  async (id, updatedData) => {
    const { data: token } = await authClient.token();
    const res = await fetch(
      `${API_URL}/users/${id}`,
      {
        method: "PATCH",
       
        headers: {
          "Content-Type":
            "application/json",
            authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify(
          updatedData
        ),
      }
    );

    return res.json();
  };


export const searchDonors = async (
  bloodGroup,
  district,
  upazila
) => {
  const params = new URLSearchParams();

  if (bloodGroup) params.append("bloodGroup", bloodGroup);
  if (district) params.append("district", district);
  if (upazila) params.append("upazila", upazila);

  console.log("API:", `${API_URL}/search-donors?${params.toString()}`);

  const res = await fetch(
    `${API_URL}/search-donors?${params.toString()}`
  );

  const data = await res.json();

  console.log("Response:", data);

  return data;
}
