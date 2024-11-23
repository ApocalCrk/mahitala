import { API_URL } from "../../utils/Constants";

export const getRekomendasiTanaman = async ({ label }) => {
  try {
    const res = await fetch(`${API_URL}/api/crop/recommendation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label }),
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};
