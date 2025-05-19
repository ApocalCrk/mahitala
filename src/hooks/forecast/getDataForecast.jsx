import axios from "axios";
import { API_URL } from "../../utils/Constants";

export const getDataForecast = async ({ location }) => {
    const { latitude, longitude } = location;
    try {
        const res = await axios.post(API_URL+`/api/cuaca/forecast`, {latitude, longitude});
        return res.data;
    } catch (error) {
        return error;
    }
}