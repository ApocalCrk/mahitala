import React from "react";

const InputBalasDiskusi = ({
  replyReference,
  setReplyReference,
  newReplyContent,
  setNewReplyContent,
  replies,
  setReplies,
}) => {
  const handleReplySubmit = () => {
    if (newReplyContent.trim()) {
      const newReply = {
        id: replies.length + 1,
        user: "Anda",
        time: new Date().toLocaleTimeString(),
        content: newReplyContent,
        parentId: replyReference ? replyReference.id : null,
      };
      setReplies([...replies, newReply]);
      setNewReplyContent("");
      setReplyReference(null);
    }
  };
  return (
    <div className="mt-8 bg-white rounded-lg">
      <h3 className="text-lg font-semibold text-[#6C7D41]">Balas Diskusi</h3>
      {replyReference && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">
            <strong>Balasan ke:</strong> {replyReference.user} •{" "}
            {replyReference.time}
          </p>
          <p className="text-gray-700">{replyReference.content}</p>
          <button
            onClick={() => setReplyReference(null)}
            className="text-xs text-[#6C7D41] hover:underline mt-2"
          >
            Batal
          </button>
        </div>
      )}
      <div className="mt-4">
        <textarea
          value={newReplyContent}
          onChange={(e) => setNewReplyContent(e.target.value)}
          placeholder={
            replyReference ? "Balas komentar ini..." : "Tulis balasan..."
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6C7D41]"
          rows={5}
        />
        <button
          onClick={handleReplySubmit}
          className="px-4 py-2 mt-2 text-white bg-[#6C7D41] rounded-lg hover:bg-green-700"
        >
          Kirim Balasan
        </button>
      </div>
    </div>
  );
};

export default InputBalasDiskusi;
