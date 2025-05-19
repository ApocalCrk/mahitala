import axiosInstance from "../../utils/axiosInstance";

export const getForecastMingguan = async ({ location }) => {
  const { latitude, longitude } = location;
  try {
    const res = await axiosInstance.post(`/api/cuaca/weekly`, {
      latitude,
      longitude,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
