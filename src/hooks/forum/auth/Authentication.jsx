import axios from "axios";
import { API_URL } from "../../../utils/Constants";

const setAuthHeader = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const loginAuth = async (data) => {
    try {
        const res = await axios.post(`${API_URL}/api/auth/login`, data);
        const { token } = res.data;
        localStorage.setItem("token", token);
        setAuthHeader(token);
        return res;
    } catch (error) {
        return error.response ? error.response.data : { message: "Unknown error" };
    }
};

export const registerAuth = async (data) => {
    try {
        const res = await axios.post(`${API_URL}/api/auth/register`, data);
        const { token } = res.data;
        localStorage.setItem("token", token);
        setAuthHeader(token);
        return res;
    } catch (error) {
        return error.response ? error.response.data : { message: "Unknown error" };
    }
};

export const logoutAuth = () => {
    delete axios.defaults.headers.common["Authorization"];
};
