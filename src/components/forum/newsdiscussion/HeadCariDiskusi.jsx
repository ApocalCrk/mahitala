import React from "react";
import { FaSearch } from "react-icons/fa";

const HeadCariDiskusi = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-3xl font-bold text-[#6C7D41]">Diskusi Terbaru</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center justify-between lg:col-span-2">
          <div className="relative w-full md:w-1/2">
            <div className="flex items-center px-4 py-2 transition-all duration-300 rounded-lg bg-gray-200 focus-within:bg-gray-300">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Cari diskusi"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 text-gray-700 w-full focus:outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadCariDiskusi;
