const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDonationRequests =
  async () => {
    const res = await fetch(
      `${API_URL}/donation-requests`,
       {
      credentials: "include",
      cache: "no-store",
    }
    );

    return res.json();
  };

export const createDonationRequest =
  async (data) => {
    const res = await fetch(
      `${API_URL}/donation-requests`,
      {
        method: "POST",

        credentials: "include",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  };


export const deleteDonationRequest = async (id) => {
  const res = await fetch(
    `${API_URL}/donation-requests/${id}`,
    {
      method: "DELETE",

      credentials: "include",
    }
  );

  return res.json();
};


export const getDonationRequestById = async (
  id
) => {
  const res = await fetch(
    `${API_URL}/donation-requests/${id}`
  );

  return res.json();
};


export const updateDonationRequest = async (
  id,
  data
) => {
  const res = await fetch(
    `${API_URL}/donation-requests/${id}`,
    {
      method: "PATCH",

      credentials: "include",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
};


export const donateRequest =
  async (id, donorInfo) => {

    const res = await fetch(
      `${API_URL}/donation-requests/${id}/donate`,
      {
        method: "PATCH",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(donorInfo),
      }
    );

    return res.json();

  };

export const getMyDonationRequests =
  async (email) => {

    const res =
      await fetch(
        `${API_URL}/my-donation-requests/${email}`,
         {
    credentials: "include",
  }
      );


    return res.json();

  };
