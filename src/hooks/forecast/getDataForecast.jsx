import axios from "axios";
import { API_URL } from "../../utils/Constants";
import axiosInstance from "../../utils/axiosInstance";

export const getDataForecast = async ({ location }) => {
  const { latitude, longitude } = location;

  try {
    const res = await axiosInstance.post(`/api/cuaca/forecast`, {
      latitude,
      longitude,
    });
    return res.data;
  } catch (error) {
    const res = await axios.get(`${API_URL}/api/cuaca/forecastNT`, {
      params: {
        latitude,
        longitude,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": API_URL,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      console.error("Error fetching forecast data:", res.statusText);
      return null;
    }
  }
};
