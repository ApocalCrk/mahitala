import React, { useEffect, useState } from "react";
import {
  Cloud,
  Droplets,
  ThermometerSun,
} from "lucide-react";

import {
  checkIdeal,
  colorRecommendation,
  rainfallRecommendation
} from "../../utils/Constants";

import { getRekomendasiAI } from "../../hooks/forecast/getRekomendasiAI";
import { getRekomendasiTanaman } from "../../hooks/forecast/getRekomendasiTanaman";

import PredictionCarousel from "./SubComponents/ItemRecomCrop";

const RekomendasiAI = ({ location }) => {
  const [prediction, setPrediction] = useState({});
  const [cropRecommendation, setCropRecommendation] = useState({});

  useEffect(() => {
    getRekomendasiAI({ location }).then((res) => {
      res[0].predicted = JSON.parse(res[0].predicted);
      setPrediction(res[0]);
    });
  }, [location]);

  useEffect(() => {
    if (prediction.predicted) {
      getRekomendasiTanaman({ label: prediction.predicted[0].nama }).then(
        (res) => {
          setCropRecommendation(res[0]);
        }
      );
    }
  }, [prediction]);

  return (
    <>
      <div className="rounded-xl border border-gray-200 shadow-sm">
        <div className="flex border-b border-gray-100 p-4 bg-[#F4F7F4] rounded-t-xl">
          <h2 className="text-lg font-medium text-[#6C7D41]">Rekomendasi AI</h2>
        </div>
        <div className="p-6">
          <PredictionCarousel prediction={prediction} />
          <h4 className="text-sm font-medium mt-6">
            Rata-rata 3 Bulan Kedepan
          </h4>
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
    </>
  );
};

export default RekomendasiAI;
