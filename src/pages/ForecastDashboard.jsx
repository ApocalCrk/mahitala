import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ForecastHariIni from "../components/dashboard/ForecastHariIni";
import RekomendasiAI from "../components/dashboard/RekomendasiAI";
import ForecastKedepan from "../components/dashboard/ForecastKedepan";

import getLocation from "../utils/getLocationAccess";
import { getDataForecast } from "../hooks/forecast/getDataForecast";
import { OctagonAlert } from "lucide-react";

import useCurrentTimestamp from "../utils/getCurrentTimestamp";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ForecastDashboard = () => {
  const { day, date, month, year, time } = useCurrentTimestamp();

  const timestamp = {
    day,
    date,
    month,
    year,
    time,
  };

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const loc = await getLocation(latitude, longitude);
            loc.latitude = latitude;
            loc.longitude = longitude;
            const res = await getDataForecast({ location: loc });
            setData(res);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      { location && data ? (
          // location.province !== "Daerah Istimewa Yogyakarta" ? (
          //   <div className="flex items-center justify-center h-screen">
          //     <div className="grid grid-cols-1 gap-4 text-center">
          //       <OctagonAlert className="w-16 h-16 text-red-500 animate-pulse flex items-center justify-center mx-auto" />
          //       <p className="text-gray-500 text-lg">
          //         Maaf, layanan ini hanya tersedia untuk wilayah Daerah Istimewa
          //         Yogyakarta
          //       </p>
          //       <span className="text-[#6C7D41] text-lg font-medium">
          //         Butuh bantuan? Hubungi kami di{" "}
          //         <a
          //           href="https://wa.me/081234567890"
          //           target="_blank"
          //           rel="noreferrer"
          //           className="text-[#6C7D41] underline"
          //         >
          //           081234567890
          //         </a>
          //       </span>
          //     </div>
          //   </div>
          // ) : (
            <>
              <Header />
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
              <Footer />
            </>
          // )
          ) : error ? (
            <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">{error}</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-screen"
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
    </>
  );
};

export default ForecastDashboard;
