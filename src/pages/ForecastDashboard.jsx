import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ForecastHariIni from "../components/dashboard/ForecastHariIni";
import RekomendasiAI from "../components/dashboard/RekomendasiAI";
import ForecastKedepan from "../components/dashboard/ForecastKedepan";

import useCurrentTimestamp from "../utils/getCurrentTimestamp";

const ForecastDashboard = ({ location, data }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto min-h-screen bg-white p-6"
    >
    <div className="flex flex-col lg:flex-row gap-6 mx-auto">
      <ForecastHariIni timestamp={timestamp} location={location} data={data} />

      <div className="w-full lg:w-2/5 space-y-6">
        <RekomendasiAI location={location} />

        <ForecastKedepan location={location} />
      </div>
    </div>
    </motion.div>
  );
};

export default ForecastDashboard;
