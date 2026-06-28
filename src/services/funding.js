import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const getFundings =
  async () => {
    const { data: token } = await authClient.token();
    const res = await fetch(
      `${API_URL}/fundings`,
      {
    headers: {
      authorization: `Bearer ${token?.token}`,
    },
  }

    );

    return res.json();
  };

export const createFunding =
  async (data) => {
    const { data: token } = await authClient.token();
    const res = await fetch(
      `${API_URL}/fundings`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
            authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  };

export const createCheckoutSession =
  async (data) => {
    const res = await fetch(
      "/api/subscription",
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

export const subscription = async (data) => {
  const res = await fetch(`${API_URL}/subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};