import React from "react";
import Loader from "./Loader";

const WeatherCard = ({ weatherData, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-md bg-opacity-60">
      <h2 className="text-2xl font-bold text-indigo-600">Current Weather</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-4">
              <div className=" py-2">
                <p className="font-semibold text-gray-800">{weatherData.city}</p>
                <p className="text-gray-700">Temperature: {weatherData.temp} °C</p>
                <p className="text-gray-700">Feels Like: {weatherData.feels_like} °C</p>
                <p className="text-gray-700">Condition: {weatherData.main}</p>
              </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
