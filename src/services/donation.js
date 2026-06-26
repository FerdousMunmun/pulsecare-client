
const API_URL = process.env.NEXT_PUBLIC_API_URL;





export const updateDonationStatus =
  async (id, status) => {
    const res = await fetch(
      `${API_URL}/donation-requests/${id}/status`,
      {
        method: "PATCH",

        credentials: "include",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    return res.json();
  };