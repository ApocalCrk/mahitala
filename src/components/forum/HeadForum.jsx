import React, { useState } from "react";
import { FaSearch, FaPlus, FaList } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeadForum = () => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full md:px-0 space-y-4 md:space-y-0">
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center w-full md:w-auto">
          <div className="relative w-full">
            <div className="flex items-center px-4 py-2 transition-all duration-300 rounded-lg bg-gray-200 focus-within:bg-gray-300">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Cari diskusi"
                value={searchText}
                onChange={handleInputChange}
                className="pl-4 text-gray-700 w-full focus:outline-none bg-transparent"
              />
            </div>
          </div>
          {searchText && (
            <button className="ml-2 px-4 py-2 text-md font-semibold text-white bg-[#6C7D41] rounded-lg hover:bg-[#5b6936] transition-all duration-300"
              onClick={() => {
                window.location.href = `/forum/cari/${searchText}`;
              }
            }>
              Cari
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
        <Link to={'/forum/buat-diskusi'} className="flex items-center justify-center px-4 py-2 text-md font-semibold text-[#6C7D41] hover:text-white bg-transparent border border-[#6C7D41] rounded-lg hover:bg-[#6C7D41] transition-all duration-300 w-full md:w-auto">
          <FaPlus className="mr-2" /> Buat Diskusi
        </Link>
        <Link to={'/forum/diskusi-terakhir'} className="flex items-center justify-center px-4 py-2 text-md font-semibold text-[#6C7D41] hover:text-white bg-transparent border border-[#6C7D41] rounded-lg hover:bg-[#6C7D41] transition-all duration-300 w-full md:w-auto">
          <FaList className="mr-2" /> Diskusi Terakhir
        </Link>
      </div>
    </div>
  );
};

export default HeadForum;
