import React from 'react';
import { Calendar } from 'lucide-react';
import ItemForecastSekarang from './SubComponent/ItemForecastSekarang';
import ItemForecastMingguan from './SubComponent/ItemForecastMingguan';

const ForecastKedepan = ({ weatherData }) => {
    return (
        <div className="rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#6C7D41]" />
                  <h3 className="font-medium">Sekarang</h3>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {weatherData.hourlyForecast.map((forecast, i) => {
                    const Icon = forecast.icon;
                    return (
                      <ItemForecastSekarang key={i} forecast={forecast} Icon={Icon} />
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#6C7D41]" />
                  <h3 className="font-medium">Perkiraan Mingguan</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {weatherData.dailyForecast.map((forecast, i) => {
                    const Icon = forecast.icon;
                    return (
                      <ItemForecastMingguan key={i} forecast={forecast} Icon={Icon} />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
    );
}

export default ForecastKedepan;