import React from "react";

const SorotanProyek = () => {
  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4">Sorotan Proyek</h2>
        <p className="text-gray-700">
          Hasil utama dan pencapaian yang diraih selama proyek ini.
        </p>
      </div>
      <div className="flex gap-6 pb-4 scrollbar-hide overflow-x-auto">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="min-w-[300px] bg-white rounded-lg p-6 border border-gray-200"
          >
            <p className="text-gray-700 mb-4">
              "Meningkatkan hasil panen hingga 20% melalui penjadwalan penanaman
              yang optimal!"
            </p>
            <h4 className="font-semibold text-gray-800">Hasil Proyek</h4>
            <p className="text-gray-500">Agustus 2024</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SorotanProyek;
