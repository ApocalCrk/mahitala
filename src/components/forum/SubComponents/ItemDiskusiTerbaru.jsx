import React from "react";
import { Link } from "react-router-dom";

const ItemDiskusiTerbaru = ({ discussion }) => {
  return (
    <Link to={`/forum/diskusi/${discussion.id}`}>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors mb-5">
        <h3 className="text-lg font-semibold text-[#6C7D41]">
          {discussion.title}
        </h3>
        <p className="text-sm text-gray-600">
          {discussion.user} • {discussion.time}
        </p>
        <p className="text-gray-700 mt-2">{discussion.content}</p>
        <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
          <div className="flex space-x-4">
            <span>👀 {discussion.readers} Pembaca</span>
            <span>💬 {discussion.replies} Balasan</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemDiskusiTerbaru;
