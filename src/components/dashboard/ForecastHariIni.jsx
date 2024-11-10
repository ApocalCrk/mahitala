import React from "react";
import ItemCurrentTime from "./SubComponent/ItemCurrentTime";
import ItemForecast from "./SubComponent/ItemForecastSelective";
import ItemStatusForecast from "./SubComponent/ItemStatusForecast";

const ForecastHariIni = ({ weatherData, timestamp, location }) => {
  

  return (
    <div className="w-full lg:w-3/5 space-y-6">
      <div className="rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-100 p-4 bg-[#F4F7F4] rounded-t-xl">
          <h2 className="text-lg font-medium text-[#6C7D41]">Cuaca Hari Ini</h2>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            <ItemCurrentTime weatherData={weatherData} timestamp={timestamp} location={location} />

            <div className="flex-1 bg-gray-50 rounded-2xl p-6 w-full">
              <p className="mb-4 text-sm font-medium">
                Perkiraan Cuaca Hari Ini
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {weatherData.hourlyForecast.map((forecast, i) => {
                  const Icon = forecast.icon;
                  return (
                    <ItemForecast key={i} forecast={forecast} Icon={Icon} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weatherData.statusMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return <ItemStatusForecast key={i} metric={metric} Icon={Icon} />;
        })}
      </div>
    </div>
  );
};

export default ForecastHariIni;
