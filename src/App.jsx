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

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="*" element={
            <div className="flex justify-center items-center h-96 w-full">
              <h1 className="text-4xl text-gray-500">Halaman tidak ditemukan</h1>
            </div>
          } />
          <Route path="/" element={<ForecastDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/forum" element={<ForumDiskusi />} />
          <Route path="/forum/buat-diskusi" element={<BuatDiskusi />} />
          <Route path="/forum/diskusi-terakhir" element={<DiskusiTerakhir />} />
          <Route path="/forum/diskusi/:id" element={<DetailDiskusi />} />
          <Route path="/forum/kategori" element={<KategoriDiskusi />} />
          <Route path="/forum/kategori/:id" element={<DetailKategori />} />
          <Route path="/forum/diskusi-terbaru" element={<DiskusiTerbaruLayout />} />
          <Route path="/forum/cari/:keyword" element={<CariDiskusiLayout />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
