import React from "react";
import ItemDiskusiTerakhir from "./SubComponents/ItemDiskusiTerakhir";
import { Link } from "react-router-dom";

const DiskusiTerakhir = () => {
  const discussions = [
    {
      id: 1,
      title: "Diskusi Mengenai Pertanian Modern",
      user: "Pengguna A",
      time: "1 jam yang lalu",
      excerpt:
        "Bagaimana cara menerapkan teknologi pada pertanian modern di Indonesia?",
      readers: 134,
      replies: 18,
    },
    {
      id: 2,
      title: "Pentingnya Pengelolaan Air di Perkebunan",
      user: "Pengguna B",
      time: "3 jam yang lalu",
      excerpt:
        "Air menjadi sumber utama dalam perkebunan. Mari diskusi tentang solusi terbaik!",
      readers: 134,
      replies: 18,
    },
    {
      id: 3,
      title: "Teknologi dalam Peternakan",
      user: "Pengguna C",
      time: "5 jam yang lalu",
      excerpt:
        "Siapa yang punya pengalaman tentang otomatisasi dalam peternakan?",
      readers: 134,
      replies: 18,
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold text-[#6C7D41] mt-5 mb-4">
        Diskusi Terakhir
      </h2>
      <div className="p-6 bg-white border border-gray-200 rounded-lg space-y-6">
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <ItemDiskusiTerakhir key={discussion.id} discussion={discussion} />
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Link
            to="/forum/diskusi-terakhir"
            className="px-4 py-2 text-sm font-semibold text-white bg-[#6C7D41] rounded-lg hover:bg-[#5b6936] transition-all duration-200 transform hover:scale-105"
          >
            Lihat Semua
          </Link>
        </div>
      </div>
    </>
  );
};

export default DiskusiTerakhir;
