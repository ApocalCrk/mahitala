import React from "react";

const TujuanProyek = () => {
  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4">Proyek Terbaru Kami</h2>
        <p className="text-gray-700">
          Menggunakan AI untuk memberikan prediksi cuaca yang akurat dan
          merekomendasikan waktu penanaman yang optimal untuk meningkatkan
          produktivitas pertanian.
        </p>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="w-full md:w-1/4 bg-white rounded-lg p-8 border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Tujuan Proyek</h3>
          <p className="text-gray-700">
            Proyek ini bertujuan untuk memberdayakan petani dengan wawasan
            berbasis data mengenai pola cuaca dan kecocokan tanaman untuk
            mengoptimalkan hasil panen.
          </p>
        </div>
        <div className="w-full md:w-1/4 bg-white rounded-lg p-8 border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">
            Teknologi yang Digunakan
          </h3>
          <p className="text-gray-700">
            Memanfaatkan AI dan pembelajaran mesin dengan data cuaca dari BMKG,
            kami memprediksi jendela penanaman yang sesuai dan memberikan
            rekomendasi yang dapat ditindaklanjuti.
          </p>
        </div>
        <div className="w-full md:w-1/4 bg-white rounded-lg p-8 border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">
            Dampak pada Keberlanjutan
          </h3>
          <p className="text-gray-700">
            Dengan mendukung pertanian berkelanjutan, proyek ini membantu
            mengurangi pemborosan sumber daya dan mempromosikan praktik ramah
            lingkungan.
          </p>
        </div>
      </div>
    </>
  );
};

export default TujuanProyek;
