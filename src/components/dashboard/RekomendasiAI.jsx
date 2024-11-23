import React, { useEffect, useState } from "react";
import {
  Cloud,
  Droplets,
  TreeDeciduous as Plant,
  ThermometerSun,
} from "lucide-react";

import {
  checkIdeal,
  colorRecommendation,
  rainfallRecommendation,
  cropIdeal,
  cropIdealDescription,
} from "../../utils/Constants";

import { getRekomendasiAI } from "../../hooks/forecast/getRekomendasiAI";
import { getRekomendasiTanaman } from "../../hooks/forecast/getRekomendasiTanaman";
import { capitalizeFirstLetter } from "../../utils/Constants";

const RekomendasiAI = ({ location }) => {
  const [prediction, setPrediction] = useState({});
  const [cropRecommendation, setCropRecommendation] = useState({});

  useEffect(() => {
    getRekomendasiAI({ location }).then((res) => {
      setPrediction(res[0]);
      getRekomendasiTanaman(res[0].predicted).then((res) => {
        setCropRecommendation(res[0]);
      });
    });
  }, [location]);

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm">
      <div className="border-b border-gray-100 p-4 bg-[#F4F7F4] rounded-t-xl">
        <h2 className="text-lg font-medium text-[#6C7D41]">Rekomendasi AI</h2>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600">
          Tanaman yang cocok untuk ditanam periode ini adalah{" "}
          <strong>{prediction.predicted}</strong>. Silahkan mempertimbangkan
          untuk menanam tanaman tersebut. Anda juga harus melakukan pengecekan
          kondisi tanah terlebih dahulu sebelum menanam.
        </p>
        <div className="flex items-center mt-4 p-4 bg-gray-50 rounded-xl">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-[#6C7D41] font-medium">
                {capitalizeFirstLetter(prediction.predicted)}
              </h4>
              <span className="text-sm">
                {cropIdeal(
                  checkIdeal(
                    prediction.temperature,
                    cropRecommendation.min_range_temperature,
                    cropRecommendation.max_range_temperature
                  ),
                  checkIdeal(
                    prediction.humidity,
                    cropRecommendation.min_range_humidity,
                    cropRecommendation.max_range_humidity
                  ),
                  checkIdeal(
                    prediction.rainfall,
                    cropRecommendation.min_range_rainfall,
                    500
                  )
                )}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {cropIdealDescription(
                checkIdeal(
                  prediction.temperature,
                  cropRecommendation.min_range_temperature,
                  cropRecommendation.max_range_temperature
                ),
                checkIdeal(
                  prediction.humidity,
                  cropRecommendation.min_range_humidity,
                  cropRecommendation.max_range_humidity
                ),
                checkIdeal(
                  prediction.rainfall,
                  cropRecommendation.min_range_rainfall,
                  500
                )
              )}
            </p>
          </div>
        </div>
        <h4 className="text-sm font-medium mt-6">Rata-rata 3 Bulan Kedepan</h4>
        <div className="flex items-center mt-4 p-4 bg-gray-50 rounded-xl">
          <ThermometerSun
            className={`w-14 h-14 ${colorRecommendation(prediction.temperature, cropRecommendation.min_range_temperature, cropRecommendation.max_range_temperature)}`}
          />
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">Suhu</h4>
            </div>
            <p
              className={`text-sm font-medium ${colorRecommendation(prediction.temperature, cropRecommendation.min_range_temperature, cropRecommendation.max_range_temperature)}`}
            >
              {checkIdeal(
                prediction.temperature,
                cropRecommendation.min_range_temperature,
                cropRecommendation.max_range_temperature
              )}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Suhu rata-rata 3 bulan kedepan adalah{" "}
              <span className="font-bold">
                {parseInt(prediction.temperature)}°C
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4 p-4 bg-gray-50 rounded-xl grid-cols-2">
          <Droplets
            className={`w-14 h-14 ${colorRecommendation(prediction.humidity, cropRecommendation.min_range_humidity, cropRecommendation.max_range_humidity)}`}
          />
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">Kelembaban</h4>
            </div>
            <p
              className={`text-sm font-medium ${colorRecommendation(prediction.humidity, cropRecommendation.min_range_humidity, cropRecommendation.max_range_humidity)}`}
            >
              {checkIdeal(
                prediction.humidity,
                cropRecommendation.min_range_humidity,
                cropRecommendation.max_range_humidity
              )}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Kelembaban rata-rata 3 bulan kedepan adalah{" "}
              <span className="font-bold">
                {parseInt(prediction.humidity)}%
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4 p-4 bg-gray-50 rounded-xl">
          <Cloud
            className={`w-14 h-14 ${colorRecommendation(prediction.rainfall, cropRecommendation.min_range_rainfall, 500)}`}
          />
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">Curah Hujan</h4>
            </div>
            <p
              className={`text-sm font-medium ${colorRecommendation(prediction.rainfall, cropRecommendation.min_range_rainfall, 500)}`}
            >
              {checkIdeal(
                prediction.rainfall,
                cropRecommendation.min_range_rainfall,
                500
              )}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Curah hujan rata-rata 3 bulan kedepan adalah{" "}
              <span className="font-bold">
                {parseInt(prediction.rainfall)} mm
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4 p-4 bg-gray-50 rounded-xl grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">Rekomendasi Curah Hujan</h4>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {rainfallRecommendation(prediction.rainfall)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekomendasiAI;
