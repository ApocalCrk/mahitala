import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import ForecastDashboard from "./pages/ForecastDashboard";
import About from "./pages/About";
import ForumDiskusi from "./pages/forum/ForumDiskusiLayout";
import BuatDiskusi from "./pages/forum/creatediscussion/BuatDiskusiLayout";
import DiskusiTerakhir from "./pages/forum/lastdiscussion/DiskusiTerakhirLayout";
import DetailDiskusi from "./pages/forum/detaildiscussion/DetailDiskusiLayout";
import KategoriDiskusi from "./pages/forum/categoryforum/KategoriLayout";
import DetailKategori from "./pages/forum/categoryforum/detailcategory/DetailKategoriLayout";
import DiskusiTerbaruLayout from "./pages/forum/newsdiscussion/DiskusiTerbaruLayout";
import CariDiskusiLayout from "./pages/forum/finddiscussion/CariDiskusiLayout";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserProvider } from "./utils/userContext";
import ProtectedRoute from "./utils/middleware";

const ROUTES = [
  {
    path: "/",
    element: <ForecastDashboard />,
    helmet: {
      title: "Mahitala - Agrikultur Berbasis Teknologi",
      description:
        "Mahitala App adalah aplikasi penyedia solusi agrikultur berbasis teknologi yang membantu petani dalam perencanaan dan pengelolaan pertanian. Aplikasi ini menawarkan fitur seperti prediksi cuaca akurat, rekomendasi tanaman berbasis AI, serta analisis data pertanian untuk meningkatkan produktivitas dan efisiensi.",
      keywords:
        "Mahitala App, aplikasi agrikultur, teknologi pertanian, prediksi cuaca, rekomendasi tanaman, AI untuk pertanian, analisis data pertanian, efisiensi pertanian, solusi agrikultur, produktivitas pertanian, inovasi teknologi pertanian, Infinite Learning, IL, Mahitala IL, Mahitala",
    },
  },
  {
    path: "/tentang-kami",
    element: <About />,
    helmet: {
      title: "Mahitala - Tentang Kami",
      description:
        "Mahitala adalah aplikasi penyedia solusi agrikultur berbasis teknologi yang membantu petani dalam perencanaan dan pengelolaan pertanian. Aplikasi ini menawarkan fitur seperti prediksi cuaca akurat, rekomendasi tanaman berbasis AI, serta analisis data pertanian untuk meningkatkan produktivitas dan efisiensi.",
      keywords:
        "Mahitala App, aplikasi agrikultur, teknologi pertanian, prediksi cuaca, rekomendasi tanaman, AI untuk pertanian, analisis data pertanian, efisiensi pertanian, solusi agrikultur, produktivitas pertanian, inovasi teknologi pertanian, Infinite Learning, IL, Mahitala IL, Mahitala",
    },
  },
  {
    path: "/forum",
    element: <ForumDiskusi />,
    helmet: {
      title: "Mahitala - Forum Diskusi",
      description:
        "Forum diskusi Mahitala adalah tempat berbagi informasi, pengalaman, dan pengetahuan seputar pertanian. Bergabunglah dengan komunitas petani dan ahli pertanian lainnya untuk mendiskusikan topik-topik menarik seputar dunia pertanian.",
      keywords:
        "Mahitala Forum Diskusi, forum diskusi pertanian, komunitas petani, diskusi pertanian, informasi pertanian, pengetahuan pertanian, pertanian Indonesia, komunitas pertanian, diskusi tanaman, diskusi hama, diskusi penyakit tanaman, diskusi teknologi pertanian",
    },
  },
  { path: "/forum/buat-diskusi", element: <ProtectedRoute><BuatDiskusi /></ProtectedRoute> },
  { path: "/forum/diskusi-terakhir", element: <ProtectedRoute><DiskusiTerakhir /></ProtectedRoute> },
  { path: "/forum/diskusi/:id", element: <DetailDiskusi /> },
  { path: "/forum/kategori", element: <KategoriDiskusi /> },
  { path: "/forum/kategori/:id", element: <DetailKategori /> },
  { path: "/forum/diskusi-terbaru", element: <DiskusiTerbaruLayout /> },
  { path: "/forum/cari/:keyword", element: <CariDiskusiLayout /> },
];

function App() {
  return (
    <HelmetProvider>
      <UserProvider>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {ROUTES.map(({ path, element, helmet }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <>
                    {helmet && (
                      <Helmet>
                        <title>{helmet.title}</title>
                        <meta name="description" content={helmet.description} />
                        <meta name="keywords" content={helmet.keywords} />
                      </Helmet>
                    )}
                    {path !== "/" && <Header />}
                    <main className="flex-grow">{element}</main>
                    {path !== "/" && <Footer />}
                  </>
                }
              />
            ))}
          </Routes>
        </div>
      </UserProvider>
    </HelmetProvider>
  );
}

export default App;
