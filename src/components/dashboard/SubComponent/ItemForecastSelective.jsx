import React from "react";

const ItemForecastSelective = ({ forecast, Icon }) => {
  return (
    <div className="text-center">
      <Icon className="w-10 h-10 mx-auto mb-2 text-[#6C7D41]" />
      <p className="text-sm text-gray-700">{forecast.temp}°</p>
      <p className="text-xs text-gray-500">{forecast.time}</p>
    </div>
  );
};

export default ItemForecastSelective;
