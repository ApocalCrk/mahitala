import React from "react";
import ItemCurrentTime from "./SubComponent/ItemCurrentTime";
import ItemForecast from "./SubComponent/ItemForecastSelective";
import ItemStatusForecast from "./SubComponent/ItemStatusForecast";
import { findNearestTimestamp, humidityRecommendation, rainRecommendation, tempRecommendation, windRecommendation } from "../../utils/Constants";
import { Cloud, Droplets, ThermometerSun, Wind } from "lucide-react";

const ForecastHariIni = ({ timestamp, location, data }) => {
  const firstStampWeatherData = data.weatherData[0];

  const nearestData = findNearestTimestamp(firstStampWeatherData);

  return (
    <div className="w-full lg:w-3/5 space-y-6">
      <div className="rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-100 p-4 bg-[#F4F7F4] rounded-t-xl">
          <h2 className="text-lg font-medium text-[#6C7D41]">Cuaca Hari Ini</h2>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            <ItemCurrentTime
              timestamp={timestamp}
              location={location}
              nearestData={nearestData}
            />

            <div className="flex-1 bg-gray-50 rounded-2xl p-6 w-full">
              <p className="mb-4 text-sm font-medium">
                Perkiraan Cuaca Hari Ini
              </p>
              <div className="flex overflow-x-auto space-x-4 scroll-smooth scrollbar-hide">
                {data.weatherData[0].map((forecast, i) => (
                  <div key={i} className="min-w-[120px]">
                    <ItemForecast forecast={forecast} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ItemStatusForecast key="Indeks Suhu" title="Indeks Suhu" description={tempRecommendation(nearestData.t)} metric={nearestData.t} Icon={ThermometerSun} format="°C" />
        <ItemStatusForecast key="Tingkat Kelembaban" title="Tingkat Kelembaban" description={humidityRecommendationRecommendation(nearestData.hu)} metric={nearestData.hu} Icon={Droplets} format="%" />
        <ItemStatusForecast key="Kecepatan Angin" title="Kecepatan Angin" description={windRecommendation(nearestData.ws)} metric={nearestData.ws} Icon={Wind} format="km/j" />
        <ItemStatusForecast key="Pengendapan Hujan" title="Pengendapan Hujan" description={rainRecommendation(nearestData.tp)} metric={nearestData.tp} Icon={Cloud} format="%" />
      </div>
    </div>
  );
};

export default ForecastHariIni;
