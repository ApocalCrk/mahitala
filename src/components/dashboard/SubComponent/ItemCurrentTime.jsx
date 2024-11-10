import React from "react";
import { 
    Wind,
    Droplets
  } from 'lucide-react';

const ItemCurrentTime = ({ weatherData, timestamp, location }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium">{location.city}, {location.province}</h2>
          <p className="text-sm text-gray-600">
            {timestamp.day}, {timestamp.date}{" "}
            {timestamp.month} {timestamp.year} <span className="text-gray-600 inline-flex md:hidden">| {timestamp.time} WIB </span>
          </p>
        </div>
        <p className="hidden md:inline-block text-sm text-gray-600">{timestamp.time} WIB</p>
      </div>
      <div className="flex flex-col  items-center gap-12">
        <div className="text-center">
          <h1 className="text-8xl font-light text-[#6C7D41]">
            {weatherData.current.temp}°
          </h1>
          <p className="mt-2 text-gray-600">{weatherData.current.condition}</p>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex items-center gap-2">
            <Wind className="w-6 h-6 text-[#6C7D41]" />
            <span className="text-sm text-gray-600">{weatherData.current.pressure}</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-[#6C7D41]" />
            <span className="text-sm text-gray-600">{weatherData.current.humidity}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-6 h-6 text-[#6C7D41]" />
            <span className="text-sm text-gray-600">{weatherData.current.windSpeed}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCurrentTime;
