const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDistricts =
  async () => {
    const res = await fetch(
      `${API_URL}/districts`
    );

    return res.json();
  };

export const getUpazilas =
  async (districtId) => {
    const res = await fetch(
      `${API_URL}/districts/${districtId}/upazilas`
    );

    return res.json();
  };