import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;





export const updateDonationStatus =
  async (id, status) => {
    const { data: token } = await authClient.token();
    const res = await fetch(
      `${API_URL}/donation-requests/${id}/status`,
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