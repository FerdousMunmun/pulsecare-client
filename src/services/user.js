


  const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const updateUserRole = async (
  id,
  role
) => {
  const res = await fetch(
    `${API_URL}/users/${id}/role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({ role }),
    }
  );

  return res.json();
};

export const updateUserStatus =
  async (id, status) => {
    const res = await fetch(
      `${API_URL}/users/${id}/status`,
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
    const res = await fetch(
      `${API_URL}/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          updatedData
        ),
      }
    );

    return res.json();
  };