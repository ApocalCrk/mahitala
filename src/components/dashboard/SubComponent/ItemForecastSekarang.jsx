import React from "react";

const ItemForecastSekarang = ({ forecast, Icon }) => {
  return (
    <div className="min-w-[112px] bg-gray-50 rounded-xl p-4 text-center">
      <p className="text-sm text-gray-700">{forecast.time}</p>
      <Icon className="w-10 h-10 mx-auto my-2 text-[#6C7D41]" />
      <p className="font-medium text-gray-700">{forecast.temp}°</p>
    </div>
  );
};

export default ItemForecastSekarang;
