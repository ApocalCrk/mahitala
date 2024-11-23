import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import ForecastDashboard from "./pages/ForecastDashboard";
import About from "./pages/About";
import Header from "./components/Header";

import ForumDiskusi from "./pages/forum/ForumDiskusiLayout";
import BuatDiskusi from "./pages/forum/creatediscussion/BuatDiskusiLayout";
import DiskusiTerakhir from "./pages/forum/lastdiscussion/DiskusiTerakhirLayout";
import DetailDiskusi from "./pages/forum/detaildiscussion/DetailDiskusiLayout";
import KategoriDiskusi from "./pages/forum/categoryforum/KategoriLayout";
import DetailKategori from "./pages/forum/categoryforum/detailcategory/DetailKategoriLayout";

import Footer from "./components/Footer";
import DiskusiTerbaruLayout from "./pages/forum/newsdiscussion/DiskusiTerbaruLayout";
import CariDiskusiLayout from "./pages/forum/finddiscussion/CariDiskusiLayout";

import getLocation from "./utils/getLocationAccess";
import { OctagonAlert } from "lucide-react";
import { UserProvider } from "./utils/userContext";
import ProtectedRoute from "./utils/middleware";

import { getDataForecast } from "./hooks/forecast/getDataForecast";

function App() {
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

  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        {location && data ? (
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
            <main className="flex-grow">
              <Routes>
                <Route
                  path="*"
                  element={
                    <div className="flex justify-center items-center h-96 w-full text-center">
                      <h1 className="text-4xl text-gray-500">
                        Halaman tidak ditemukan
                      </h1>
                    </div>
                  }
                />
                <Route
                  path="/"
                  element={
                    <ForecastDashboard location={location} data={data} />
                  }
                />
                <Route path="/tentang-kami" element={<About />} />
                <Route path="/forum" element={<ForumDiskusi />} />
                <Route
                  path="/forum/buat-diskusi"
                  element={
                    <ProtectedRoute>
                      <BuatDiskusi />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forum/diskusi-terakhir"
                  element={
                    <ProtectedRoute>
                      <DiskusiTerakhir />
                    </ProtectedRoute>
                  }
                />
                <Route path="/forum/diskusi/:id" element={<DetailDiskusi />} />
                <Route path="/forum/kategori" element={<KategoriDiskusi />} />
                <Route
                  path="/forum/kategori/:id"
                  element={<DetailKategori />}
                />
                <Route
                  path="/forum/diskusi-terbaru"
                  element={<DiskusiTerbaruLayout />}
                />
                <Route
                  path="/forum/cari/:keyword"
                  element={<CariDiskusiLayout />}
                />
              </Routes>
            </main>
            <Footer />
          </>
        ) : // )
        error ? (
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
      </div>
    </UserProvider>
  );
}

export default App;
