import React from "react";

const ItemStatusForecast = ({ metric, Icon }) => {
  return (
    <div className="border border-gray-200 shadow-sm rounded-xl">
      <div className="p-4 flex gap-4">
        <div className="text-center">
          <Icon className="w-14 h-14 mx-auto mb-2 text-[#6C7D41]" />
          <p className="text-[#6C7D41] font-medium">{metric.value}</p>
          <p className="text-xs text-gray-700">{metric.status}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">{metric.title}</h4>
          <p className="text-xs text-gray-700">{metric.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemStatusForecast;
