import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../utils/Constants";

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
      const res = await axios.post(
        API_URL + `/api/cuaca/forecastNT`,
        { latitude, longitude },
        { withCredentials: true }
      );
      return res.data;
    }
  } catch (error) {
    return error;
  }
};
