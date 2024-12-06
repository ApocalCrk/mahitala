import axios from "axios";
import { API_URL } from "../../../utils/Constants";
import { API_STATIC } from "../../../utils/Constants";

export const createDiskusi = async (data) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || !user.token) {
    return "401";
  }

  try {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("judul", data.judul);
    formData.append("id_kategori", data.id_kategori);
    formData.append("isi", data.isi);
    if (data.gambar) {
      formData.append("gambar", data.gambar);
    }

    const res = await axios.post(`${API_URL}/api/forum/diskusi`, formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDiskusi = async (id) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || !user.token) {
    return "401";
  }

  try {
    const res = await axios.delete(`${API_URL}/api/forum/diskusi/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailDiskusi = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/api/forum/diskusi/${id}`);
    const data = res.data[0];
    const dateObj = new Date(data.tgl_dibuat);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    data.tanggal = new Intl.DateTimeFormat("id-ID", options).format(dateObj);
    data.waktu = dateObj.toISOString().split("T")[1].split(".")[0];

    if (data.gambar) {
      data.gambar = `${API_STATIC}${data.gambar}`;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const balasDiskusi = async (id_diskusi, id_interact, id_reply, username, isi) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || !user.token) {
    return "401";
  }

  try {
    const res = await axios.post(
      `${API_URL}/api/forum/diskusi/reply`,
      {
        id_diskusi,
        id_interact,
        id_reply,
        username,
        isi,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMainReply = async (id) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || !user.token) {
    return "401";
  }

  try {
    const res = await axios.delete(
      `${API_URL}/api/forum/diskusi/reply/firstIn/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSubReply = async (id) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || !user.token) {
    return "401";
  }

  try {
    const res = await axios.delete(`${API_URL}/api/forum/diskusi/reply/secIn/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
