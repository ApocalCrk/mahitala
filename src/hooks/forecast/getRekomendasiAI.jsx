import { API_URL } from "../../utils/Constants";

export const getRekomendasiAI = async ({ location }) => {
  const { latitude, longitude } = location;
  try {
    const res = await fetch(`${API_URL}/api/crop/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude, longitude }),
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};
