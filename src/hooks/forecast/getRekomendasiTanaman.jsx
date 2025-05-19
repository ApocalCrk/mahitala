import axiosInstance from "../../utils/axiosInstance";

export const getRekomendasiTanaman = async ({ label }) => {
  try {
    const res = await axiosInstance.post(`/api/crop/recommendation`, {
      label,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
