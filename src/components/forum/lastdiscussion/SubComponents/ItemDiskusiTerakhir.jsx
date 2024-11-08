import React from "react";
import { Link } from "react-router-dom";

const ItemDiskusiTerakhir = ({ discussion }) => {
  return (
    <Link
      to={`/forum/diskusi/${discussion.id}`}
      className="transition-all p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 md:mt-0 mt-2"
    >
      <h3 className="text-sm font-semibold text-[#6C7D41] mb-1">
        {discussion.title}
      </h3>
      <p className="text-xs text-gray-500 mb-1">
        {discussion.user} • {discussion.time}
      </p>
      <p className="text-sm text-gray-600 line-clamp-2 mb-1">
        {discussion.content}
      </p>
      <div className="flex items-center text-xs text-gray-500 space-x-2 mt-2">
        <span className="px-2 py-0.5 bg-[#6C7D41] text-white rounded-full">
          {discussion.category}
        </span>
        <span className="flex items-center space-x-1">
          <span>👀</span> <span>{discussion.readers}</span>
        </span>
        <span className="flex items-center space-x-1">
          <span>💬</span> <span>{discussion.replies}</span>
        </span>
      </div>
    </Link>
  );
};

export default ItemDiskusiTerakhir;
