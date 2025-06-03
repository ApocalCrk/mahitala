import axios from "axios";
import { API_URL } from "../../utils/Constants";
import axiosInstance from "../../utils/axiosInstance";

export const getDataForecast = async ({ location }) => {
 console.log('Fetching weather data - attempt:', Date.now());
  const { latitude, longitude } = location;
  const token = localStorage.getItem("token");

  try {
    if (token) {
      const res = await axiosInstance.post(`/api/cuaca/forecast`, {
        latitude,
        longitude,
      });
      return res.data;
    } else {
      const res = await axios.get(API_URL + `/api/cuaca/forecastNT`, {
        params: { latitude, longitude },
      });
      console.log('Response status:', res.status);
    console.log('Response headers:', [...res.headers.entries()]);
      return res.data;
    }
  } catch (error) {
    return error;
  }
};
