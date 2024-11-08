import React from "react";
import { FaSearch } from "react-icons/fa";

const HeadKategori = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-[#6C7D41] mb-8">
        Kategori Diskusi
      </h1>
      <div className="w-full md:w-1/3 flex items-center px-4 py-2 transition-all duration-300 rounded-lg bg-gray-200 focus-within:bg-gray-300 mb-6">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Cari diskusi"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-4 text-gray-700 w-full focus:outline-none bg-transparent"
        />
      </div>
    </>
  );
};

export default HeadKategori;
