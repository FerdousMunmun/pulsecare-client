const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const getDashboardStats =
  async () => {
      console.log("Dashboard API Called");

    const res = await fetch(
      `${API_URL}/dashboard-stats`,
      {
        cache: "no-store",
         
      }
    );
  console.log(res.status);
    return res.json();
  };

 

export const getStatistics = async () => {
  const res = await fetch(`${API_URL}/statistics`);
  return res.json();
};