import React from "react";

const ItemBalasanDiskusi = ({ reply, replies, setReplyReference }) => {
  const renderReplies = (parentId) => {
    return replies
      .filter((reply) => reply.parentId === parentId)
      .map((reply) => (
        <div
          key={reply.id}
          className="p-4 bg-gray-50 rounded-md shadow-sm ml-8"
        >
          <p className="text-gray-600 font-semibold">
            {reply.user} • {reply.time}
          </p>
          <p className="text-gray-700">{reply.content}</p>
          {parentId === null && (
            <div className="mt-2">
              <button
                onClick={() => setReplyReference(reply)}
                className="text-xs text-[#6C7D41] hover:underline"
              >
                Balas
              </button>
            </div>
          )}
        </div>
      ));
  };
  return (
    <div key={reply.id} className="p-4 bg-gray-50 rounded-md shadow-sm">
      <p className="text-gray-600 font-semibold">
        {reply.user} • {reply.time}
      </p>
      <p className="text-gray-700">{reply.content}</p>
      <div className="mt-2">
        <button
          onClick={() => setReplyReference(reply)}
          className="text-xs text-[#6C7D41] hover:underline"
        >
          Balas
        </button>
      </div>
      {renderReplies(reply.id)}
    </div>
  );
};

export default ItemBalasanDiskusi;
