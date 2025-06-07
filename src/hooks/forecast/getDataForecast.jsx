import axios from "axios";
import { API_URL } from "../../utils/Constants";
import axiosInstance from "../../utils/axiosInstance";

export const getDataForecast = async ({ location }) => {
  const { latitude, longitude } = location;
  const token = localStorage.getItem("token");

  try {
    const res = await axiosInstance.get(`/api/cuaca/forecast`, {
      params: {
        latitude,
        longitude,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
