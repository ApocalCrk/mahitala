import { API_URL } from "../../utils/Constants";
import axios from "axios";

export const getDataForecast = async ({ location }) => {
    const { latitude, longitude } = location;
    try {
        const res = await axios.post(`${API_URL}/api/cuaca/nearest`, {latitude, longitude});
        return res.data;
    } catch (error) {
        return error;
    }
}