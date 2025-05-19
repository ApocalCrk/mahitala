import axios from "axios";

export const getDataForecast = async ({ location }) => {
    const { latitude, longitude } = location;
    try {
        const res = await axios.post(`/api/cuaca/forecast`, {latitude, longitude});
        return res.data;
    } catch (error) {
        return error;
    }
}