import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

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

import { UserProvider } from "./utils/userContext";
import ProtectedRoute from "./utils/middleware";
import Peta from "./pages/Peta";
import { requestPermissionAndRegisterToken, onMessageListener } from "./utils/firebase";

function App() {
  useEffect(() => {
    requestPermissionAndRegisterToken();

    onMessageListener().then((payload) => {
      const { title, body } = payload.notification;
      new Notification(title, { body });
    });
  }, []);

  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<ForecastDashboard />} />
          <Route path="/peta" element={<Peta />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
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
                    <Route
                      path="/forum/diskusi/:id"
                      element={<DetailDiskusi />}
                    />
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
            }
          />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
