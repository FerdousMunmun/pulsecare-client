const API_URL = "http://localhost:5000";

export const getDonationRequests =
  async () => {
    const res = await fetch(
      `${API_URL}/donation-requests`
    );

    return res.json();
  };

export const createDonationRequest =
  async (data) => {
    const res = await fetch(
      `${API_URL}/donation-requests`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  };