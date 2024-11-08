import React from "react";
import { TreeDeciduous as Plant } from "lucide-react";

const RekomendasiAI = () => {
  return (
    <div className="rounded-xl border border-gray-200 shadow-sm">
      <div className="border-b border-gray-100 p-4 bg-[#F4F7F4] rounded-t-xl">
        <h2 className="text-lg font-medium text-[#6C7D41]">Rekomendasi AI</h2>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600">
          Tanaman yang cocok ditanam periode ini adalah padi. Kami
          merekomendasikan Anda untuk mempertimbangkannya dalam proses
          penanaman.
        </p>
        <div className="flex items-center mt-4 p-4 bg-gray-50 rounded-xl">
          <Plant className="w-14 h-14 text-[#6C7D41]" />
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <h4 className="text-[#6C7D41] font-medium">Padi</h4>
              <span className="text-sm">Sangat Ideal</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Rata-rata kelembaban di lokasi Anda saat ini ideal untuk menanam
              padi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekomendasiAI;
