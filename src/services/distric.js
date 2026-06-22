const API_URL = "http://localhost:5000";

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