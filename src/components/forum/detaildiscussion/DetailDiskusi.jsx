import React, { useState } from "react";
import { Link } from "react-router-dom";
import ItemBalasanDiskusi from "./SubComponents/ItemBalasanDiskusi";
import InputBalasDiskusi from "./SubComponents/InputBalasDiskusi";
import ItemDiskusiPopuler from "./SubComponents/ItemDiskusiPopuler";

const DetailDiskusi = () => {
  const [replies, setReplies] = useState([
    {
      id: 1,
      user: "Pengguna B",
      time: "10:45 AM",
      content: "Sangat setuju!",
      parentId: null,
    },
    {
      id: 2,
      user: "Pengguna C",
      time: "11:15 AM",
      content: "Saya punya pandangan berbeda.",
      parentId: null,
    },
  ]);
  const [newReplyContent, setNewReplyContent] = useState("");
  const [replyReference, setReplyReference] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-[#6C7D41]">
          Teknologi dalam Pertanian Modern
        </h2>
        <p className="text-gray-500 mb-4">
          Oleh Pengguna A • 02 November 2024 10:30 AM
        </p>
        <p className="text-gray-700 mb-6">
          Dengan perkembangan teknologi, kita bisa meningkatkan produktivitas
          pertanian dengan cara yang lebih efisien dan ramah lingkungan...
        </p>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#6C7D41]">Balasan</h3>
          <div className="space-y-6 mt-4">
            {replies
              .filter((reply) => reply.parentId === null)
              .map((reply) => (
                <ItemBalasanDiskusi
                  key={reply.id}
                  reply={reply}
                  replies={replies}
                  setReplyReference={setReplyReference}
                />
              ))}
          </div>
        </div>
        <InputBalasDiskusi
          newReplyContent={newReplyContent}
          setNewReplyContent={setNewReplyContent}
          replyReference={replyReference}
          setReplyReference={setReplyReference}
          replies={replies}
          setReplies={setReplies}
        />
      </div>
      <div className="p-4 bg-white rounded-lg">
        <h3 className="text-lg font-semibold text-[#6C7D41] mb-4">
          Diskusi Populer
        </h3>
        <ul className="space-y-3">
          {[
            {
              id: 1,
              title: "Pertanian Organik di Era Modern",
              readers: 85,
              replies: 12,
            },
            {
              id: 2,
              title: "Pemanfaatan Drone untuk Pertanian",
              readers: 60,
              replies: 7,
            },
            {
              id: 3,
              title: "Inovasi Teknologi pada Sektor Pertanian",
              readers: 110,
              replies: 20,
            },
          ].map((discussion, index) => (
            <ItemDiskusiPopuler key={index} discussion={discussion} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailDiskusi;
