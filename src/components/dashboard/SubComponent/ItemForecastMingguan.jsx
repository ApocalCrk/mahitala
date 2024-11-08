import React from "react";

const ItemForecastMingguan = ({ forecast, Icon }) => {
  return (
    <div
      className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-xl"
    >
      <p className="text-sm">{forecast.day}</p>
      <div className="flex items-center gap-2">
        <Icon className="w-6 h-6 text-[#6C7D41]" />
        <p className="font-medium text-gray-700">{forecast.temp}°</p>
      </div>
    </div>
  );
};

export default ItemForecastMingguan;
