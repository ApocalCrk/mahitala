export const API_URL = "https://mahitala.noturminesv.my.id";
export const API_STATIC = "https://mahitala.noturminesv.my.id/static/";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

export const Icon = ({ icon, className }) => {
  let Icon;
  switch (icon) {
    case "Cerah" || 0 || 100:
      Icon = Sun;
      break;
    case "Cerah Berawan" || 1 || 101 || 2 || 102:
      Icon = Cloud;
      break;
    case "Berawan" || 3 || 103:
      Icon = CloudRain;
      break;
    case "Berawan Tebal" || 4 || 104:
      Icon = CloudRain;
      break;
    case "Udara Kabur" || 5:
      Icon = Wind;
      break;
    case "Asap" || 10:
      Icon = Wind;
      break;
    case "Kabut" || 45:
      Icon = Wind;
      break;
    case "Hujan Ringan" || 60:
      Icon = CloudRain;
      break;
    case "Hujan Sedang" || 61:
      Icon = CloudRain;
      break;
    case "Hujan Lebat" || 63:
      Icon = CloudRain;
      break;
    case "Hujan Lokal" || 80:
      Icon = CloudRain;
      break;
    case "Hujan Petir" || 85 || 97:
      Icon = CloudRain;
      break;
    default:
      Icon = Sun;
      break;
  }

  return <Icon className={className} />;
};

export const extractHour = (time) => {
  const date = new Date(time);
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hours}:${minutes}`;
};

export function findNearestTimestamp(data) {
  const currentTime = new Date();

  return data.reduce((nearest, item) => {
    const itemTime = new Date(item.datetime);
    const nearestTime = new Date(nearest.datetime);

    return Math.abs(itemTime - currentTime) <
      Math.abs(nearestTime - currentTime)
      ? item
      : nearest;
  }, data[0]);
}

export const tempRecommendation = (temp) => {
  if (temp < 20) {
    return "Suhu saat ini kurang optimal untuk pertanian. Pertimbangkan perlindungan tanaman atau penanaman di lokasi yang lebih hangat.";
  }
  if (temp >= 20 && temp <= 25) {
    return "Suhu ini sangat ideal untuk sebagian besar tanaman, mendukung pertumbuhan yang baik dan produktivitas optimal.";
  }
  if (temp > 25) {
    return "Suhu terlalu panas untuk sebagian besar tanaman. Pertimbangkan penggunaan irigasi tambahan atau tanaman tahan panas.";
  }
};

export const humidityRecommendation = (humidity) => {
  if (humidity < 60) {
    return "Kelembaban terlalu rendah. Pertimbangkan penggunaan irigasi atau penyiraman untuk menjaga kelembaban tanah.";
  }
  if (humidity >= 60 && humidity <= 80) {
    return "Kelembaban saat ini sangat ideal untuk sebagian besar tanaman, mendukung pertumbuhan optimal.";
  }
  if (humidity > 80) {
    return "Kelembaban terlalu tinggi, berisiko menyebabkan penyakit tanaman. Pantau tanaman dengan cermat dan pastikan sirkulasi udara yang baik.";
  }
};

export const windRecommendation = (wind) => {
  if (wind < 5) {
    return "Kecepatan angin saat ini cukup rendah. Pastikan sirkulasi udara untuk mencegah stagnasi di sekitar tanaman.";
  }
  if (wind >= 5 && wind <= 15) {
    return "Kecepatan angin ideal untuk pertanian, membantu sirkulasi udara yang sehat tanpa merusak tanaman.";
  }
  if (wind > 15) {
    return "Kecepatan angin terlalu tinggi dan dapat merusak tanaman. Pertimbangkan penahan angin atau perlindungan untuk tanaman.";
  }
};

export const rainRecommendation = (rain) => {
  if (rain < 50) {
    return "Kemungkinan hujan rendah. Pastikan irigasi cukup untuk menjaga kelembaban tanah.";
  }
  if (rain >= 50 && rain <= 70) {
    return "Kemungkinan hujan sedang. Ini dapat membantu mengurangi kebutuhan irigasi, tetapi tetap pantau kelembaban tanah.";
  }
  if (rain > 70) {
    return "Kemungkinan hujan tinggi. Pastikan drainase yang baik untuk mencegah genangan air di sekitar tanaman.";
  }
};

export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const checkIdeal = (prediction, min, max) => {
  if (prediction >= min && prediction <= max) {
    return "Sangat Ideal";
  } else if (
    (prediction >= min - 5 && prediction < min) ||
    (prediction > max && prediction <= max + 5)
  ) {
    return "Mendekati Ideal";
  } else {
    return "Tidak Ideal";
  }
};

export const colorRecommendation = (prediction, min, max) => {
  if (prediction >= min && prediction <= max) {
    return "text-[#6C7D41]";
  } else if (
    (prediction >= min - 5 && prediction < min) ||
    (prediction > max && prediction <= max + 5)
  ) {
    return "text-yellow-600";
  } else {
    return "text-red-600";
  }
};

export const rainfallRecommendation = (rain) => {
  if (rain < 50) {
    return "Curah hujan terlalu rendah. Tanaman padi mungkin membutuhkan irigasi tambahan untuk mendukung pertumbuhan.";
  }
  if (rain >= 50 && rain < 200) {
    return "Curah hujan sedang. Cocok untuk tanaman padi dengan dukungan drainase yang baik untuk menghindari kekeringan pada fase kritis.";
  }
  if (rain >= 200 && rain <= 300) {
    return "Curah hujan ideal untuk budidaya padi. Pastikan distribusi air merata agar pertumbuhan optimal.";
  }
  if (rain > 300 && rain <= 500) {
    return "Curah hujan tinggi. Pastikan sistem drainase sawah dapat mengelola kelebihan air untuk mencegah genangan atau banjir.";
  }
  if (rain > 500) {
    return "Curah hujan sangat tinggi. Ada risiko banjir yang dapat merusak tanaman. Pertimbangkan langkah mitigasi seperti peninggian tanggul atau pengalihan air.";
  }
};

export const cropIdeal = (temp, hum, rain) => {
  if (
    (temp === "Sangat Ideal" &&
      hum === "Sangat Ideal" &&
      rain === "Sangat Ideal") ||
    (temp === "Sangat Ideal" && hum === "Sangat Ideal") ||
    (hum === "Sangat Ideal" && rain === "Sangat Ideal") ||
    (temp === "Sangat Ideal" && rain === "Sangat Ideal")
  ) {
    return "Sangat Ideal";
  } else if (
    (temp === "Mendekati Ideal" &&
      hum === "Mendekati Ideal" &&
      rain === "Mendekati Ideal") ||
    (temp === "Mendekati Ideal" && hum === "Mendekati Ideal") ||
    (hum === "Mendekati Ideal" && rain === "Mendekati Ideal") ||
    (temp === "Mendekati Ideal" && rain === "Mendekati Ideal")
  ) {
    return "Mendekati Ideal";
  } else {
    return "Tidak Ideal";
  }
};

export const cropIdealDescription = (temp, hum, rain) => {
  if (
    temp === "Sangat Ideal" &&
    hum === "Sangat Ideal" &&
    rain === "Sangat Ideal"
  ) {
    return "Kondisi tanaman sangat ideal untuk pertumbuhan dan produktivitas optimal.";
  }
  if (
    temp === "Mendekati Ideal" &&
    hum === "Mendekati Ideal" &&
    rain === "Mendekati Ideal"
  ) {
    return "Kondisi tanaman mendekati ideal, namun perlu perhatian ekstra untuk mempertahankan kondisi optimal.";
  }
  if (
    temp === "Tidak Ideal" ||
    hum === "Tidak Ideal" ||
    rain === "Tidak Ideal"
  ) {
    return "Kondisi tanaman tidak ideal, pertimbangkan langkah-langkah perbaikan untuk mendukung pertumbuhan tanaman.";
  }
};

export const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export const checkWaktu = (waktu) => {
  const now = new Date();
  const date = new Date(waktu);
  const duration = Math.abs(now - date);
  const durationMinutes = Math.floor(duration / (1000 * 60));
  const durationHours = Math.floor(duration / (1000 * 60 * 60));

  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (durationHours < 24) {
    if (durationHours === 0) {
      if (durationMinutes < 1) {
        return "Kurang dari 1 menit yang lalu";
      } else if (durationMinutes === 1) {
        return "1 menit yang lalu";
      } else {
        return `${durationMinutes} menit yang lalu`;
      }
    } else {
      return `${durationHours} jam yang lalu`;
    }
  } else {
    return `${formattedDate} • ${formattedTime} WIB`;
  }
};
