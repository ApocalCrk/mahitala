import axiosInstance from "../../utils/axiosInstance";

export const getRekomendasiAI = async ({ location }) => {
  const { latitude, longitude } = location;
  try {
    const res = await axiosInstance.post(`/api/crop/predict`,
      {
        latitude,
        longitude,
      }
    );
    
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
