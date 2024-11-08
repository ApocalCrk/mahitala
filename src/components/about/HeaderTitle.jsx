import React from "react";

const HeaderTitle = () => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl text-center font-bold text-white mb-2">
        Menginovasikan Pertanian
      </h1>
      <p className="text-xl text-center text-gray-300">
        Prediksi Cuaca Berbasis AI & Rekomendasi Tanaman
      </p>
    </div>
  );
};

export default HeaderTitle;
