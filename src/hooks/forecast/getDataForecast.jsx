import axios from "axios";
import { API_URL } from "../../utils/Constants";
import axiosInstance from "../../utils/axiosInstance";

export const getDataForecast = async ({ location }) => {
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
      const res = await axios.get("https://cuaca.bmkg.go.id/api/df/v1/forecast/coord?lon=" + longitude + "&lat=" + latitude);
      
      const dataCuaca = res.data.data[0];

      return {
        nearestLocation: dataCuaca.lokasi,
        weatherData: dataCuaca.cuaca
      }
    }
  } catch (error) {
    return error;
  }
};
