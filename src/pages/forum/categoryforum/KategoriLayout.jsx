import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Perkebunan from "../../../assets/Images/perkebunan.png";
import Perbuahan from "../../../assets/Images/perbuahan.jpg";
import Obat from "../../../assets/Images/obat.jpeg";
import HeadKategori from "../../../components/forum/categoryforum/HeadKategori";
import KategoriForum from "../../../components/forum/categoryforum/KategoriForum";

const CategoriesPage = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: 1, name: "Pertanian Modern", discussions: 25, imageUrl: Perbuahan },
    { id: 2, name: "Teknologi & Inovasi", discussions: 18, imageUrl: Obat },
    { id: 3, name: "Pertanian Organik", discussions: 12, imageUrl: Perkebunan },
    { id: 4, name: "Ekonomi Pertanian", discussions: 30, imageUrl: Perbuahan },
    { id: 5, name: "Manajemen Lahan", discussions: 10, imageUrl: Obat },
    { id: 6, name: "Perkebunan", discussions: 22, imageUrl: Perkebunan },
    { id: 7, name: "Peternakan", discussions: 15, imageUrl: Perbuahan },
    { id: 8, name: "Perikanan", discussions: 8, imageUrl: Obat },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <HeadKategori searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <KategoriForum categories={categories} searchTerm={searchTerm} />
    </motion.div>
  );
};

export default CategoriesPage;
