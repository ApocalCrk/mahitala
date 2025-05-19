import axiosInstance from "../../utils/axiosInstance";

export const getDataForecast = async ({ location }) => {
    const { latitude, longitude } = location;
    try {
        const res = await axiosInstance.post(`/api/cuaca/forecast`, {latitude, longitude});
        return res.data;
    } catch (error) {
        return error;
    }
}