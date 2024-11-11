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

const ForecastDashboard = ({ location, error }) => {
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
    <div className="flex flex-col lg:flex-row gap-6 mx-auto">
      <ForecastHariIni weatherData={weatherData} timestamp={timestamp} location={location} />

      <div className="w-full lg:w-2/5 space-y-6">
        <RekomendasiAI />

        <ForecastKedepan weatherData={weatherData} />
      </div>
    </div>
    </motion.div>
  );
};

export default ForecastDashboard;
