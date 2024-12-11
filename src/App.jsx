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

import { UserProvider } from "./utils/userContext";
import ProtectedRoute from "./utils/middleware";

import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <UserProvider>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={
              <>
                <Helmet>
                  <title>Mahitala - Agrikultur Berbasis Teknologi</title>
                  <meta name="title" content="Mahitala App" />
                  <meta name="description" content="Mahitala App adalah aplikasi penyedia solusi agrikultur berbasis teknologi yang membantu petani dalam perencanaan dan pengelolaan pertanian. Aplikasi ini menawarkan fitur seperti prediksi cuaca akurat, rekomendasi tanaman berbasis AI, serta analisis data pertanian untuk meningkatkan produktivitas dan efisiensi." />
                  <meta name="keywords" content="Mahitala App, aplikasi agrikultur, teknologi pertanian, prediksi cuaca, rekomendasi tanaman, AI untuk pertanian, analisis data pertanian, efisiensi pertanian, solusi agrikultur, produktivitas pertanian, inovasi teknologi pertanian, Infinite Learning, IL, Mahitala IL, Mahitala" />
                </Helmet>
                <ForecastDashboard />
              </>
            } />
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/tentang-kami" element={
                        <>
                          <Helmet>
                            <title>Mahitala - Tentang Kami</title>
                            <meta name="title" content="Tentang Kami - Mahitala" />
                            <meta name="description" content="Mahitala adalah aplikasi penyedia solusi agrikultur berbasis teknologi yang membantu petani dalam perencanaan dan pengelolaan pertanian. Aplikasi ini menawarkan fitur seperti prediksi cuaca akurat, rekomendasi tanaman berbasis AI, serta analisis data pertanian untuk meningkatkan produktivitas dan efisiensi." />
                            <meta name="keywords" content="Mahitala App, aplikasi agrikultur, teknologi pertanian, prediksi cuaca, rekomendasi tanaman, AI untuk pertanian, analisis data pertanian, efisiensi pertanian, solusi agrikultur, produktivitas pertanian, inovasi teknologi pertanian, Infinite Learning, IL, Mahitala IL, Mahitala" />
                          </Helmet>
                          <About />
                        </>
                      } />
                      <Route path="/forum" element={
                        <>
                          <Helmet>
                            <title>Mahitala - Forum Diskusi</title>
                            <meta name="title" content="Mahitala Forum Diskusi" />
                            <meta name="description" content="Forum diskusi Mahitala adalah tempat berbagi informasi, pengalaman, dan pengetahuan seputar pertanian. Bergabunglah dengan komunitas petani dan ahli pertanian lainnya untuk mendiskusikan topik-topik menarik seputar dunia pertanian." />
                            <meta name="keywords" content="Mahitala Forum Diskusi, forum diskusi pertanian, komunitas petani, diskusi pertanian, informasi pertanian, pengetahuan pertanian, pertanian Indonesia, komunitas pertanian, diskusi tanaman, diskusi hama, diskusi penyakit tanaman, diskusi teknologi pertanian" />
                          </Helmet>
                          <ForumDiskusi />
                        </>
                      } />
                      <Route
                        path="/forum/buat-diskusi"
                        element={
                          <ProtectedRoute>
                            <Helmet>
                              <title>Mahitala - Forum Diskusi</title>
                              <meta name="title" content="Mahitala Forum Diskusi" />
                              <meta name="description" content="Forum diskusi Mahitala adalah tempat berbagi informasi, pengalaman, dan pengetahuan seputar pertanian. Bergabunglah dengan komunitas petani dan ahli pertanian lainnya untuk mendiskusikan topik-topik menarik seputar dunia pertanian." />
                              <meta name="keywords" content="Mahitala Forum Diskusi, forum diskusi pertanian, komunitas petani, diskusi pertanian, informasi pertanian, pengetahuan pertanian, pertanian Indonesia, komunitas pertanian, diskusi tanaman, diskusi hama, diskusi penyakit tanaman, diskusi teknologi pertanian" />
                            </Helmet>
                            <BuatDiskusi />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/forum/diskusi-terakhir"
                        element={
                          <ProtectedRoute>
                            <Helmet>
                              <title>Mahitala - Forum Diskusi</title>
                              <meta name="title" content="Mahitala Forum Diskusi" />
                              <meta name="description" content="Forum diskusi Mahitala adalah tempat berbagi informasi, pengalaman, dan pengetahuan seputar pertanian. Bergabunglah dengan komunitas petani dan ahli pertanian lainnya untuk mendiskusikan topik-topik menarik seputar dunia pertanian." />
                              <meta name="keywords" content="Mahitala Forum Diskusi, forum diskusi pertanian, komunitas petani, diskusi pertanian, informasi pertanian, pengetahuan pertanian, pertanian Indonesia, komunitas pertanian, diskusi tanaman, diskusi hama, diskusi penyakit tanaman, diskusi teknologi pertanian" />
                            </Helmet>
                            <DiskusiTerakhir />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/forum/diskusi/:id"
                        element={
                          <>
                            <Helmet>
                              <title>Mahitala - Forum Diskusi</title>
                              <meta name="title" content="Mahitala Forum Diskusi" />
                              <meta name="description" content="Forum diskusi Mahitala adalah tempat berbagi informasi, pengalaman, dan pengetahuan seputar pertanian. Bergabunglah dengan komunitas petani dan ahli pertanian lainnya untuk mendiskusikan topik-topik menarik seputar dunia pertanian." />
                              <meta name="keywords" content="Mahitala Forum Diskusi, forum diskusi pertanian, komunitas petani, diskusi pertanian, informasi pertanian, pengetahuan pertanian, pertanian Indonesia, komunitas pertanian, diskusi tanaman, diskusi hama, diskusi penyakit tanaman, diskusi teknologi pertanian" />
                            </Helmet>
                            <DetailDiskusi />
                          </>
                        }
                      />
                      <Route path="/forum/kategori" element={
                        <>
                          <Helmet>
                            <title>Mahitala - Forum Diskusi</title>
                            <meta name="title" content="Mahitala Forum Diskusi" />
                            <meta name="description" content="Forum diskusi Mahitala adalah tempat berbagi informasi, pengalaman, dan pengetahuan seputar pertanian. Bergabunglah dengan komunitas petani dan ahli pertanian lainnya untuk mendiskusikan topik-topik menarik seputar dunia pertanian." />
                            <meta name="keywords" content="Mahitala Forum Diskusi, forum diskusi pertanian, komunitas petani, diskusi pertanian, informasi pertanian, pengetahuan pertanian, pertanian Indonesia, komunitas pertanian, diskusi tanaman, diskusi hama, diskusi penyakit tanaman, diskusi teknologi pertanian" />
                          </Helmet>
                          <KategoriDiskusi />
                        </>
                      } />
                      <Route
                        path="/forum/kategori/:id"
                        element={
                          <>
                            <Helmet>
                              <title>Mahitala - Forum Diskusi</title>
                              <meta name="title" content="Mahitala Forum Diskusi" />
                              <meta name="description" content="Forum diskusi Mahitala adalah tempat berbagi informasi, pengalaman, dan pengetahuan seputar pertanian. Bergabunglah dengan komunitas petani dan ahli pertanian lainnya untuk mendiskusikan topik-topik menarik seputar dunia pertanian." />
                              <meta name="keywords" content="Mahitala Forum Diskusi, forum diskusi pertanian, komunitas petani, diskusi pertanian, informasi pertanian, pengetahuan pertanian, pertanian Indonesia, komunitas pertanian, diskusi tanaman, diskusi hama, diskusi penyakit tanaman, diskusi teknologi pertanian" />
                            </Helmet>
                            <DetailKategori />
                          </>
                        }
                      />
                      <Route
                        path="/forum/diskusi-terbaru"
                        element={
                          <>
                            <Helmet>
                              <title>Mahitala - Forum Diskusi</title>
                              <meta name="title" content="Mahitala Forum Diskusi" />
                              <meta name="description" content="Forum diskusi Mahitala adalah tempat berbagi informasi, pengalaman, dan pengetahuan seputar pertanian. Bergabunglah dengan komunitas petani dan ahli pertanian lainnya untuk mendiskusikan topik-topik menarik seputar dunia pertanian." />
                              <meta name="keywords" content="Mahitala Forum Diskusi, forum diskusi pertanian, komunitas petani, diskusi pertanian, informasi pertanian, pengetahuan pertanian, pertanian Indonesia, komunitas pertanian, diskusi tanaman, diskusi hama, diskusi penyakit tanaman, diskusi teknologi pertanian" />
                            </Helmet>
                            <DiskusiTerbaruLayout />
                          </>
                        }
                      />
                      <Route
                        path="/forum/cari/:keyword"
                        element={
                          <>
                            <Helmet>
                              <title>Mahitala - Forum Diskusi</title>
                              <meta name="title" content="Mahitala Forum Diskusi" />
                              <meta name="description" content="Forum diskusi Mahitala adalah tempat berbagi informasi, pengalaman, dan pengetahuan seputar pertanian. Bergabunglah dengan komunitas petani dan ahli pertanian lainnya untuk mendiskusikan topik-topik menarik seputar dunia pertanian." />
                              <meta name="keywords" content="Mahitala Forum Diskusi, forum diskusi pertanian, komunitas petani, diskusi pertanian, informasi pertanian, pengetahuan pertanian, pertanian Indonesia, komunitas pertanian, diskusi tanaman, diskusi hama, diskusi penyakit tanaman, diskusi teknologi pertanian" />
                            </Helmet>
                            <CariDiskusiLayout />
                          </>
                        }
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
    </HelmetProvider>
  );
}

export default App;
