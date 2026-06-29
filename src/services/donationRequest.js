import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDonationRequests =
  async () => {
    const res = await fetch(
      `${API_URL}/donation-requests`,
      {

        cache: "no-store",
      }
    );

    return res.json();
  };

export const createDonationRequest =
  async (data) => {
    const { data: token } = await authClient.token()
    const res = await fetch(
      `${API_URL}/donation-requests`,
      {
        method: "POST",


        headers: {
          "Content-Type":
            "application/json",
          authorization: `Bearer ${token?.token}`
        },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  };


export const deleteDonationRequest = async (id) => {
  const { data: token } = await authClient.token()
  const res = await fetch(
    `${API_URL}/donation-requests/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token?.token}`
      }

    }
  );

  return res.json();
};


export const getDonationRequestById = async (
  id
) => {
  
  const res = await fetch(
    `${API_URL}/donation-requests/${id}`,
    
    
  );

  return res.json();
};


export const updateDonationRequest = async (
  id,
  data
) => {
  const { data: token } = await authClient.token()
  const res = await fetch(
    `${API_URL}/donation-requests/${id}`,
    {
      method: "PATCH",


      headers: {
        "Content-Type":
          "application/json",
          authorization: `Bearer ${token?.token}`
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
};


export const donateRequest =
  async (id, donorInfo) => {
    const { data: token } = await authClient.token()

    const res = await fetch(
      `${API_URL}/donation-requests/${id}/donate`,
      {
        method: "PATCH",



        headers: {
          "Content-Type":
            "application/json",
            authorization: `Bearer ${token?.token}`
        },

        body: JSON.stringify(donorInfo),
      }
    );

    return res.json();

  };

export const getMyDonationRequests =
  async (email) => {
    const { data: token } = await authClient.token();

    const res =
      await fetch(
        `${API_URL}/my-donation-requests/${email}`,
    {
       headers: {
          
            authorization: `Bearer ${token?.token}`
        },
    }

      );


    return res.json();

  };
