import React from "react";
import { Cloud, Droplets, TreeDeciduous as Plant, ThermometerSun } from "lucide-react";

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
        <h4 className="text-sm font-medium mt-6">Rata-rata 3 Bulan Kedepan</h4>
        <div className="flex items-center mt-4 p-4 bg-gray-50 rounded-xl">
          <ThermometerSun className="w-14 h-14 text-[#6C7D41]" />
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">Suhu</h4>
            </div>
            <p className="text-sm font-medium text-[#6C7D41]">Sangat Ideal</p>
            <p className="text-xs text-gray-600 mt-1">
              Suhu rata-rata 3 bulan kedepan adalah <span className="font-bold">28°C</span>
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4 p-4 bg-gray-50 rounded-xl grid-cols-2">
          <Droplets className="w-14 h-14 text-yellow-600" />
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">Kelembaban</h4>
            </div>
            <p className="text-sm font-medium text-yellow-600">Mendekati Ideal</p>
            <p className="text-xs text-gray-600 mt-1">
              Kelembaban rata-rata 3 bulan kedepan adalah <span className="font-bold">75%</span>
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4 p-4 bg-gray-50 rounded-xl">
          <Cloud className="w-14 h-14 text-red-500" />
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">Curah Hujan</h4>
              <span className="text-sm">60%</span>
            </div>
            <p className="text-sm font-medium text-red-500">Tidak Ideal</p>
            <p className="text-xs text-gray-600 mt-1">
              Curah hujan rata-rata 3 bulan kedepan adalah <span className="font-bold">60%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekomendasiAI;
