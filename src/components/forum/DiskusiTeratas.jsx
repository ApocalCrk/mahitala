import React, { useState, useEffect, useRef } from "react";
import ItemDiskusiTeratas from "./SubComponents/ItemDiskusiTeratas";

const DiskusiTeratas = () => {
  const discussions = [
    {
      id: 1,
      user: "Pengguna A",
      date: "02 November 2024",
      time: "10:30",
      title: "Teknologi dalam Pertanian Modern",
      content:
        "Dengan perkembangan teknologi, kita bisa meningkatkan produktivitas...",
      category: "Pertanian",
      readers: 120,
      replies: 15,
    },
    {
      id: 2,
      user: "Pengguna B",
      date: "02 November 2024",
      time: "12:00",
      title: "Pengelolaan Sumber Daya Air",
      content:
        "Pengelolaan air sangat penting untuk menjaga keberlanjutan perkebunan...",
      category: "Perkebunan",
      readers: 89,
      replies: 8,
    },
    {
      id: 3,
      user: "Pengguna C",
      date: "02 November 2024",
      time: "15:15",
      title: "Otomatisasi dalam Peternakan",
      content:
        "Dengan otomatisasi, kita dapat memantau kesehatan hewan ternak...",
      category: "Peternakan",
      readers: 76,
      replies: 12,
    },
    {
      id: 4,
      user: "Pengguna D",
      date: "02 November 2024",
      time: "11:00",
      title: "Inovasi Pupuk Organik",
      content:
        "Pupuk organik memainkan peran penting dalam mempertahankan kesuburan...",
      category: "Pertanian",
      readers: 102,
      replies: 7,
    },
    {
      id: 5,
      user: "Pengguna E",
      date: "02 November 2024",
      time: "11:45",
      title: "Pengelolaan Limbah Peternakan",
      content:
        "Mengelola limbah peternakan dengan baik bisa berdampak besar pada lingkungan...",
      category: "Peternakan",
      readers: 110,
      replies: 11,
    },
    {
      id: 6,
      user: "Pengguna F",
      date: "02 November 2024",
      time: "17:20",
      title: "Hidroponik untuk Pemula",
      content:
        "Hidroponik menjadi alternatif bagi yang ingin bercocok tanam di lahan terbatas...",
      category: "Pertanian",
      readers: 134,
      replies: 18,
    },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaginated, setIsPaginated] = useState(false);
  const topRef = useRef(null);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentItems = discussions.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(discussions.length / itemsPerPage);

  useEffect(() => {
    if (isPaginated && topRef.current) {
      const offsetTop = topRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setIsPaginated(false);
    }
  }, [isPaginated]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setIsPaginated(true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setIsPaginated(true);
    }
  };

  return (
    <>
      <h2 ref={topRef} className="text-2xl font-semibold text-[#6C7D41] mb-6">
        Diskusi Teratas
      </h2>
      <div className="space-y-4">
        {currentItems.map((discussion, index) => (
          <ItemDiskusiTeratas key={index} discussion={discussion} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ease-in-out ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#6C7D41] text-white hover:bg-[#5b6936]"
          } shadow-sm`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-500 text-sm">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ease-in-out ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#6C7D41] text-white hover:bg-[#5b6936]"
          } shadow-sm`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default DiskusiTeratas;
