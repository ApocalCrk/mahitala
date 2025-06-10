import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ForecastHariIni from "../components/dashboard/ForecastHariIni";
import RekomendasiAI from "../components/dashboard/RekomendasiAI";
import ForecastKedepan from "../components/dashboard/ForecastKedepan";

import getLocation from "../utils/getLocationAccess";
import { getDataForecast, getNowForecast } from "../hooks/forecast/getDataForecast";
import { getHargaKomoditas } from "../hooks/forum/getHargaKomoditas";
import { LogIn, OctagonAlert, UserPlus2Icon } from "lucide-react";

import useCurrentTimestamp from "../utils/getCurrentTimestamp";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Modal, LoginForm, RegisterForm } from "../components/auth/ModalAuth";
import { loginAuth, registerAuth } from "../hooks/auth/Authentication";
import { getForecastMingguan } from "../hooks/forecast/getForecastMingguan";

import { useUser } from "../utils/userContext";

import HargaKomoditas from "../components/dashboard/HargaKomoditas";
import DashboardData from "../components/dashboard/DashboardData";
import WaspadaCuaca from "../components/dashboard/WaspadaCuaca";


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
  const [nowData, setNowData] = useState(null);
  const [hargaKomoditas, setHargaKomoditas] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useUser();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerToken] = useState(Math.random().toString(36).substring(2, 9));

  const [dataMingguan, setDataMingguan] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleLoginModal = useCallback(() => {
    setIsError(false);
    setIsLoginOpen((prev) => !prev);
  }, []);

  const toggleRegisterModal = useCallback(() => {
    setIsError(false);
    setIsRegisterOpen((prev) => !prev);
  }, []);

  const handleLogin = useCallback(async (formData) => {
    try {
      if (!formData.username || !formData.token) {
        setIsError(true);
        setErrorMessage("Username dan token harus diisi");
        return;
      }

      const res = await loginAuth(formData);
      if (res.status === 200) {
        setIsAuthenticated(true);
        setIsLoginOpen(false);
        window.location.reload();
      } else {
        setIsError(true);
        setErrorMessage(res.message || "Terjadi kesalahan, silahkan coba lagi");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Terjadi kesalahan, silahkan coba lagi");
    }
  }, []);

  const handleRegister = useCallback(async (formData) => {
    try {
      if (!formData.username) {
        setIsError(true);
        setErrorMessage("Username harus diisi");
        return;
      }

      const res = await registerAuth(formData);

      if (res.status === 200) {
        setIsAuthenticated(true);
        setIsRegisterOpen(false);
        window.location.reload();
      } else {
        setIsError(true);
        setErrorMessage(res.message || "Terjadi kesalahan, silahkan coba lagi");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Terjadi kesalahan, silahkan coba lagi");
    }
  }, []);

  const fetchDataForLocation = useCallback(async (locCoords) => {
    try {
      const loc = await getLocation(locCoords.latitude, locCoords.longitude);
      loc.latitude = locCoords.latitude;
      loc.longitude = locCoords.longitude;
      
      const res = await getDataForecast({ location: loc });
      const nowRes = await getNowForecast({ location: loc });

      setLocation(loc);
      setData(res);
      setNowData(nowRes);
    } catch (error) {
      console.error("Error fetching location/data:", error);
      setError("Gagal mengambil data dari cache. Pastikan Anda pernah online sebelumnya.");
    }
  }, []);


  useEffect(() => {
    const handleSuccess = (position) => {
      const currentLoc = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      localStorage.setItem('lastKnownLocation', JSON.stringify(currentLoc));
      
      fetchDataForLocation(currentLoc);
    };

    const handleError = (error) => {
      console.error("Geolocation error:", error);
      const savedLocString = localStorage.getItem('lastKnownLocation');

      if (savedLocString) {
        console.log("Geolocation gagal, menggunakan lokasi terakhir yang tersimpan.");
        const savedLoc = JSON.parse(savedLocString);
        fetchDataForLocation(savedLoc);
      } else {
        setError("Gagal mendapatkan lokasi. Harap aktifkan koneksi internet setidaknya sekali untuk menyimpan lokasi Anda.");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error("Geolocation tidak didukung oleh browser ini.");
      setError("Geolocation tidak didukung oleh browser ini.");
    }
  }, [fetchDataForLocation]);


  useEffect(() => {
    if (location) {
      const fetchHargaKomoditas = async () => {
        try {
          const res = await getHargaKomoditas({ location });
          setHargaKomoditas(res);
        } catch (error) {
          console.error("Error fetching harga komoditas:", error);
        }
      };
      fetchHargaKomoditas();
    }
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchForecastMingguan = async () => {
        try {
          const res = await getForecastMingguan({ location });
          setDataMingguan(res);
        } catch (error) {
          console.error("Error fetching forecast mingguan:", error);
        }
      };
      fetchForecastMingguan();
    }
  }, [location]);

  return (
    <>
      {location && data ? (
        location.province
          .toLowerCase()
          .includes("Daerah Istimewa Yogyakarta") ? (
          <div className="flex items-center justify-center h-screen">
            <div className="grid grid-cols-1 gap-4 text-center">
              <OctagonAlert className="w-16 h-16 text-red-500 animate-pulse flex items-center justify-center mx-auto" />
              <p className="text-gray-500 text-lg">
                Maaf, layanan ini hanya tersedia untuk wilayah Daerah Istimewa
                Yogyakarta
              </p>
              <span className="text-[#6C7D41] text-lg font-medium">
                Butuh bantuan? Hubungi kami di{" "}
                <a
                  href="https://wa.me/081234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#6C7D41] underline"
                >
                  081234567890
                </a>
              </span>
            </div>
          </div>
        ) : (
          <>
            <Header />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto min-h-screen bg-white p-6"
            >
              {!isAuthenticated && (
                <div className="md:flex justify-between md:space-x-4">
                  <div
                    className="flex justify-between bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded relative mb-4 w-full"
                    role="alert"
                  >
                    <span className="block sm:inline">
                      <strong className="font-bold">Peringatan!</strong> Akses
                      data terbatas, silahkan masuk untuk mendapatkan akses
                      penuh.
                    </span>
                    <OctagonAlert className="w-6 h-6 text-red-500 hidden sm:block" />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={toggleLoginModal}
                      className="flex px-8 py-2 mb-4 text-md font-semibold items-center justify-center text-[#6C7D41] bg-transparent border border-[#6C7D41] rounded-lg hover:bg-[#6C7D41] hover:text-white transition-all duration-300 w-full md:w-auto"
                    >
                      <LogIn className="w-5 h-5 mr-2" />
                      Masuk
                    </button>
                    <button
                      onClick={toggleRegisterModal}
                      className="flex px-8 py-2 mb-4 text-md font-semibold items-center justify-center text-[#6C7D41] bg-transparent border border-[#6C7D41] rounded-lg hover:bg-[#6C7D41] hover:text-white transition-all duration-300 w-full md:w-auto"
                    >
                      <UserPlus2Icon className="w-5 h-5 mr-2" />
                      Daftar
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col lg:flex-row gap-6 mx-auto">
                <div className="w-full lg:w-3/5 space-y-6">
                  <ForecastHariIni
                    timestamp={timestamp}
                    location={location}
                    data={data}
                    nowData={nowData}
                    dataMingguan={dataMingguan}
                  />

                  <DashboardData />

                  <HargaKomoditas dataHargaKomoditas={hargaKomoditas} />
                </div>

                <div className="w-full lg:w-2/5 space-y-6">
                  <WaspadaCuaca />
                  <RekomendasiAI location={location} />

                  <ForecastKedepan location={location} />
                </div>
              </div>
            </motion.div>
            <Footer modalLogin={toggleLoginModal} modalRegister={toggleRegisterModal} />

            <Modal
              isOpen={isLoginOpen}
              onClose={toggleLoginModal}
              isError={isError}
              errorMessage={errorMessage}
              title="Selamat Datang"
              description="Silahkan masuk untuk mengakses fitur dan data yang lebih lengkap"
            >
              <LoginForm onSubmit={handleLogin} />
            </Modal>

            <Modal
              isOpen={isRegisterOpen}
              onClose={toggleRegisterModal}
              isError={isError}
              errorMessage={errorMessage}
              title="Buat Akun"
              description="Silahkan buat akun untuk mendapatkan fitur dan data yang lebih lengkap"
            >
              <RegisterForm
                onSubmit={handleRegister}
                initialToken={registerToken}
              />
            </Modal>
          </>
        )
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