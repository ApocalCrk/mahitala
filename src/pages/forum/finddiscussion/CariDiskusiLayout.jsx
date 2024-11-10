import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import ListDiskusiDicari from "../../../components/forum/finddiscussion/ListDiskusiDicari";
import DiskusiTrending from "../../../components/forum/finddiscussion/DiskusiTrending";
import PaginationDicari from "../../../components/forum/finddiscussion/PaginationDicari";
import HeadDiskusiDicari from "../../../components/forum/finddiscussion/HeadDiskusiDicari";

const CariDiskusiLayout = () => {
  const discussions = [
    {
      id: 1,
      title: "Cara Meningkatkan Produktivitas Tanaman Padi",
      readers: 134,
      replies: 20,
      categoryId: 1,
      author: "Ahmad S.",
      lastActive: "2 jam yang lalu",
    },
    {
      id: 2,
      title: "Inovasi Pertanian Berkelanjutan",
      readers: 134,
      replies: 15,
      categoryId: 1,
      author: "Budi W.",
      lastActive: "5 jam yang lalu",
    },
    {
      id: 3,
      title: "Penggunaan Teknologi Drone untuk Pertanian",
      readers: 134,
      replies: 18,
      categoryId: 1,
      author: "Clara D.",
      lastActive: "1 hari yang lalu",
    },
    {
      id: 4,
      title: "Ekonomi Pertanian dan Harga Pasar",
      readers: 134,
      replies: 22,
      categoryId: 1,
      author: "David R.",
      lastActive: "2 hari yang lalu",
    },
    {
      id: 5,
      title: "Pengendalian Hama Terpadu",
      readers: 134,
      replies: 30,
      categoryId: 1,
      author: "Elena M.",
      lastActive: "3 hari yang lalu",
    },
    {
      id: 6,
      title: "Teknik Irigasi Modern",
      readers: 134,
      replies: 10,
      categoryId: 1,
      author: "Fajar K.",
      lastActive: "4 hari yang lalu",
    },
    {
      id: 7,
      title: "Manfaat Kompos untuk Tanaman",
      readers: 134,
      replies: 25,
      categoryId: 1,
      author: "Gita P.",
      lastActive: "5 hari yang lalu",
    },
    {
      id: 8,
      title: "Sistem Pertanian Organik",
      readers: 134,
      replies: 5,
      categoryId: 1,
      author: "Hadi S.",
      lastActive: "1 minggu yang lalu",
    },
    {
      id: 9,
      title: "Pentingnya Konservasi Lahan",
      readers: 134,
      replies: 12,
      categoryId: 1,
      author: "Indah R.",
      lastActive: "2 minggu yang lalu",
    },
  ];

  const popularDiscussions = [
    {
      id: 1,
      title: "Pertanian Organik di Era Modern",
      readers: 85,
      replies: 12,
    },
    {
      id: 2,
      title: "Pemanfaatan Drone untuk Pertanian",
      readers: 60,
      replies: 7,
    },
    {
      id: 3,
      title: "Pengendalian Hama Terpadu",
      readers: 45,
      replies: 5,
    },
  ];

  const itemsPerPage = 6;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(discussions.length / itemsPerPage);
  const displayedDiscussions = discussions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const { keyword } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <HeadDiskusiDicari keyword={keyword} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ListDiskusiDicari displayedDiscussions={displayedDiscussions} />
          {totalPages > 1 && (
            <PaginationDicari
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
        <DiskusiTrending popularDiscussions={popularDiscussions} />
      </div>
    </motion.div>
  );
};

export default CariDiskusiLayout;
