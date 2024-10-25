import React from "react";
import Loader from "./Loader";

const RollupsCard = ({ cityRollup, isLoading }) => {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-md bg-opacity-70">
      <h2 className="text-2xl font-bold text-green-600">Daily Weather Summary</h2>
      {isLoading ? (
        <Loader />
      ) : (
        cityRollup ? (
        <div className="mt-4">
          <p className="font-semibold text-gray-800">{cityRollup.city}</p>
          <p className="text-gray-700">Avg Temp: {cityRollup.avgTemp.toFixed(1)} °C</p>
          <p className="text-gray-700">Max Temp: {cityRollup.maxTemp.toFixed(1)} °C</p>
          <p className="text-gray-700">Min Temp: {cityRollup.minTemp.toFixed(1)} °C</p>
          <p className="text-gray-700">Dominant Condition: {cityRollup.dominantCondition}</p>
        </div>
      ) : (
        <p className="text-gray-500">No data available.</p>
      ))}
    </div>
  );
};

export default RollupsCard;
