import React from "react";
import { Link } from "react-router-dom";
import { checkWaktu, truncateText } from "../../../../utils/Constants";
import { deleteDiskusi } from "../../../../hooks/forum/diskusi/cDiskusi";

const ItemDiskusiTerakhir = ({ discussion, setDiscussion }) => {
  const handleDelete = async () => {
    const res = await deleteDiskusi(discussion.id_diskusi);
    if (res) {
      setDiscussion((prevState) => prevState.filter((item) => item.id_diskusi !== discussion.id_diskusi));
    }
  };
  return (
    <div
      className="transition-all p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 md:mt-0 mt-2"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-[#6C7D41] mb-1">
          {discussion.judul}
        </h3>
        <div className="flex items-center space-x-2">
          <Link to={`/forum/diskusi/${discussion.id_diskusi}`} className="text-xs text-white bg-[#6c7d41b3] px-2 py-0.5 rounded-full">Lihat</Link>
          <button className="text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded-full" onClick={handleDelete}>Hapus</button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-1">
        {discussion.username} • {checkWaktu(discussion.tgl_dibuat)}
      </p>
      <p className="text-sm text-gray-600 line-clamp-2 mb-1" dangerouslySetInnerHTML={{ __html: truncateText(discussion.isi, 150) }}></p>
      <div className={`flex items-center text-xs text-gray-500 space-x-2 mt-2 ${discussion.isi.length > 100 ? 'mt-2' : 'mt-8'}`}>
        <span className="px-2 py-0.5 bg-[#6C7D41] text-white rounded-full">
          {discussion.kategori.nama}
        </span>
        <span className="flex items-center space-x-1">
          <span>👀</span> <span>{discussion.jumlah_pembaca}</span>
        </span>
        <span className="flex items-center space-x-1">
          <span>💬</span> <span>{discussion.jumlah_replies}</span>
        </span>
      </div>
    </div>
  );
};

export default ItemDiskusiTerakhir;
