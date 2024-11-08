import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ItemKategoriTerkait = ({ discussion }) => {
  return (
    <Link to={`/forum/diskusi/${discussion.id}`} className="transition-all">
      <div className="transition-all cursor-pointer border border-gray-200 rounded-lg mt-2">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">
              Oleh {discussion.author}
            </span>
            <span className="text-sm text-gray-500">
              {discussion.lastActive}
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#6C7D41] mb-3 hover:text-[#536231] transition-colors">
            {discussion.title}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex space-x-4">
              <span className="text-gray-600 text-sm">👀 { discussion.readers } Pembaca</span>
              <span className="text-gray-600 text-sm">💬 { discussion.replies } Balasan</span>
            </div>
            <FaChevronRight size={18} className="text-gray-400 ml-auto" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemKategoriTerkait;
