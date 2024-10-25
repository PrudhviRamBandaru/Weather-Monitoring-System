import React from "react";

const CityList = ({ weatherData, selectedCity, onCitySelect }) => {
  return (
    <div className="overflow-x-auto mb-5">
      <div className="flex justify-center space-x-4 p-4 rounded-lg">
        {weatherData.map((data) => (
          <button
            key={data.city}
            className={`px-6 py-3 rounded-full text-white font-semibold transition duration-300 transform ${
              selectedCity === data.city
                ? 'bg-blue-600 scale-105'
                : 'bg-blue-400 hover:bg-blue-500'
            }`}
            onClick={() => onCitySelect(data.city)}
          >
            {data.city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityList;
