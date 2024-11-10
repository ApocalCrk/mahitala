import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  ThermometerSun,
} from "lucide-react";

import ForecastHariIni from "../components/dashboard/ForecastHariIni";
import RekomendasiAI from "../components/dashboard/RekomendasiAI";
import ForecastKedepan from "../components/dashboard/ForecastKedepan";

import useCurrentTimestamp from "../utils/getCurrentTimestamp";
import getLocation from "../utils/getLocationAccess";

const ForecastDashboard = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const { day, date, month, year, time } = useCurrentTimestamp();

  const timestamp = {
    day,
    date,
    month,
    year,
    time,
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const loc = await getLocation(latitude, longitude);
            setLocation(loc);
          } catch (error) {
            setError(error.message);
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation tidak didukung oleh browser ini.");
    }
  }, []);

  useEffect(() => {
    scrollToTop();
  }, []);

  const weatherData = {
    location: "Sleman, Daerah Istimewa Yogyakarta",
    date: {
      day: "Senin",
      date: "8",
      month: "November",
      year: "2024",
      time: "14:30",
    },
    current: {
      temp: 17,
      condition: "Sebagian Cerah",
      pressure: "720hpa",
      humidity: "87%",
      windSpeed: "4km/j",
    },
    hourlyForecast: [
      { time: "15:00", temp: 22, icon: Sun },
      { time: "16:00", temp: 21, icon: CloudRain },
      { time: "17:00", temp: 20, icon: Cloud },
      { time: "18:00", temp: 19, icon: Cloud },
    ],
    statusMetrics: [
      {
        icon: ThermometerSun,
        value: "28°C",
        status: "Suhu",
        title: "Indeks Suhu",
        description: "Suhu saat ini normal dan cocok untuk pertanian",
      },
      {
        icon: Droplets,
        value: "75%",
        status: "Kelembaban",
        title: "Tingkat Kelembaban",
        description: "Kelembaban optimal untuk pertumbuhan tanaman",
      },
      {
        icon: Wind,
        value: "4km/j",
        status: "Angin",
        title: "Kecepatan Angin",
        description: "Kecepatan angin normal untuk aktivitas pertanian",
      },
      {
        icon: Cloud,
        value: "60%",
        status: "Mendung",
        title: "Curah Hujan",
        description: "Kemungkinan hujan dalam waktu dekat",
      },
    ],
    dailyForecast: [
      { day: "Selasa", temp: 23, icon: Sun },
      { day: "Rabu", temp: 22, icon: CloudRain },
      { day: "Kamis", temp: 21, icon: Cloud },
      { day: "Jumat", temp: 20, icon: Sun },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto min-h-screen bg-white p-6"
    >
      {location ? (
        <div className="flex flex-col lg:flex-row gap-6 mx-auto">
          <ForecastHariIni weatherData={weatherData} timestamp={timestamp} location={location} />

          <div className="w-full lg:w-2/5 space-y-6">
            <RekomendasiAI />

            <ForecastKedepan weatherData={weatherData} />
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">{error}</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center h-96"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-gray-600 text-xl font-semibold animate-pulse">
              Mengambil lokasi...
            </p>
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gradient-to-r from-[#6C7D41] to-[#4A5D23]"></div>
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-[#f8f8f8]"></div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ForecastDashboard;
