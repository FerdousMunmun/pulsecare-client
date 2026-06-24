
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDashboardStats = async () => {
  const res = await fetch(
    `${API_URL}/dashboard-stats`
  );

  return res.json();
};



export const updateDonationStatus =
  async (id, status) => {
    const res = await fetch(
      `${API_URL}/donation-requests/${id}/status`,
      {
        method: "PATCH",
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