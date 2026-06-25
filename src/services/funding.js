const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const getFundings =
  async () => {
    const res = await fetch(
      `${API_URL}/fundings`
    );

    return res.json();
  };

export const createFunding =
  async (data) => {
    const res = await fetch(
      `${API_URL}/fundings`,
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

  export const createCheckoutSession =
  async (data) => {
    const res = await fetch(
      `${API_URL}/create-checkout-session`,
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