import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import HeadDetailKategori from "../../../../components/forum/categoryforum/detailcategory/HeadDetailKategori";
import ListKategoriTerkait from "../../../../components/forum/categoryforum/detailcategory/ListKategoriTerkait";
import DiskusiTrending from "../../../../components/forum/categoryforum/detailcategory/DiskusiTrending";
import PaginationKategori from "../../../../components/forum/categoryforum/detailcategory/PaginationKategori";

const CategoryDiscussionsPage = () => {
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

  const categories = [
    { id: 1, name: "Pertanian Modern" },
    { id: 2, name: "Teknologi & Inovasi" },
    { id: 3, name: "Ekonomi Pertanian" },
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const itemsPerPage = 6;
  const numericCategoryId = parseInt(id, 10);

  if (isNaN(numericCategoryId)) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">ID kategori tidak valid.</p>
      </div>
    );
  }

  const category = categories.find((cat) => cat.id === numericCategoryId);

  const filteredDiscussions = discussions
    .filter((discussion) => discussion.categoryId === numericCategoryId)
    .filter((discussion) =>
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredDiscussions.length / itemsPerPage);
  const displayedDiscussions = filteredDiscussions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <HeadDetailKategori
        category={category}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ListKategoriTerkait displayedDiscussions={displayedDiscussions} />

        <DiskusiTrending popularDiscussions={popularDiscussions} />
      </div>

      {totalPages > 1 && (
        <PaginationKategori
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </motion.div>
  );
};

export default CategoryDiscussionsPage;
