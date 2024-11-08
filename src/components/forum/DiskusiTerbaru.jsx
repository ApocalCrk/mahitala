import React from "react";
import ItemDiskusiTerbaru from "./SubComponents/ItemDiskusiTerbaru";

const DiskusiTerbaru = () => {
  const discussions = [
    {
      id: 1,
      title: "Judul Diskusi 1",
      user: "Nama Pengguna 1",
      time: "2 jam yang lalu",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      readers: 134,
      replies: 18,
    },
    {
      id: 2,
      title: "Judul Diskusi 2",
      user: "Nama Pengguna 2",
      time: "5 jam yang lalu",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
      readers: 134,
      replies: 18,
    },
    {
      id: 3,
      title: "Judul Diskusi 3",
      user: "Nama Pengguna 3",
      time: "1 hari yang lalu",
      content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.",
      readers: 134,
      replies: 18,
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold text-[#6C7D41] mb-5">Diskusi Terbaru</h2>
      <div className="p-6 bg-white border border-gray-200 rounded-lg space-y-6">
        {discussions.map((discussion) => (
          <ItemDiskusiTerbaru key={discussion.id} discussion={discussion} />
        ))}
        <div className="flex justify-end mt-6">
          <button 
            className="px-4 py-2 text-sm font-semibold text-white bg-[#6C7D41] rounded-xl hover:bg-[#5b6936] transition-all duration-200 shadow-md transform hover:scale-105"
            onClick={() => window.location.href = '/forum/diskusi-terbaru'}
          >
            Lihat Semua
          </button>
        </div>
      </div>
    </>
  );
};

export default DiskusiTerbaru;
