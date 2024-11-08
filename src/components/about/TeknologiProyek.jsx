import React from "react";
import ItemKomponenTeknologi from "./SubComponents/ItemKomponenTeknologi";

const TeknologiProyek = () => {
  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4">Teknologi Kami</h2>
        <p className="text-gray-700">
          Temukan teknologi yang mendukung rekomendasi berbasis AI kami.
        </p>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {["Pembelajaran Mesin", "Integrasi API Cuaca", "Analisis Data"].map(
          (tech, i) => (
            <ItemKomponenTeknologi key={i} tech={tech} />
          )
        )}
      </div>
    </>
  );
};

export default TeknologiProyek;
