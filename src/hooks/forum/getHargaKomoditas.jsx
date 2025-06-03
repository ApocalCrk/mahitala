import axios from "axios";
import { API_URL } from "../../utils/Constants";

export const getHargaKomoditas = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/forum/harga-komoditas`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": API_URL,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
