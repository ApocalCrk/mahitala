import React from "react";

const SorotanProyek = () => {
  const data = [
    {
      description: "Data cuaca terintegrasi secara real-time menggunakan API BMKG.",
      title: "Integrasi API",
      date: "Oktober 2024"
    },
    {
      description: "92% pengguna merasa kemudahan akses dengan desain dashboard yang interaktif.",
      title: "Penggunaan Dashboard",
      date: "November 2024"
    },
    {
      description: "Lebih dari 90% akurasi prediksi cuaca melalui teknologi AI canggih.",
      title: "Akurasi AI",
      date: "Desember 2024"
    }
  ];

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4">Sorotan Proyek</h2>
        <p className="text-gray-700">
          Hasil utama dan pencapaian yang diraih selama proyek ini.
        </p>
      </div>
      <div className="flex gap-6 pb-4 scrollbar-hide overflow-x-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white rounded-lg p-6 border border-gray-200"
          >
            <p className="text-gray-700 mb-4">{item.description}</p>
            <h4 className="font-semibold text-gray-800">{item.title}</h4>
            <p className="text-gray-500">{item.date}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SorotanProyek;
