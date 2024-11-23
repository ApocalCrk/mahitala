import axios from "axios";
import { API_URL } from "../../utils/Constants";

export const getForecastMingguan = async ({ location }) => {
  const { latitude, longitude } = location;
  try {
    const res = await axios.post(`${API_URL}/api/cuaca/weekly`, {
      latitude,
      longitude,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
