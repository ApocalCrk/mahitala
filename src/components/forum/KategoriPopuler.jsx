import React from "react";
import Perkebunan from "../../assets/Images/perkebunan.png";
import Perbuahan from "../../assets/Images/perbuahan.jpg";
import Obat from "../../assets/Images/obat.jpeg";
import { Link } from "react-router-dom";

import ItemKategori from "./SubComponents/ItemKategori";

const KategoriPopuler = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[#6C7D41] mb-5">Kategori Populer</h2>
        <Link to="/forum/kategori" className="text-[#6C7D41] font-semibold hover:text-[#5b6936] transition-all duration-300">Lihat Semua</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { id: 1, src: Perkebunan, title: "Pertanian", desc: "Diskusi seputar pertanian" },
          { id: 2, src: Perbuahan, title: "Perikanan", desc: "Diskusi seputar perikanan" },
          { id: 3, src: Obat, title: "Peternakan", desc: "Diskusi seputar peternakan" },
        ].map((item, index) => (
          <ItemKategori key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default KategoriPopuler;
