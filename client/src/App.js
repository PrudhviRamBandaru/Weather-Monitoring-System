import React, { useEffect, useState } from "react";
import {
  fetchWeatherData,
  fetchDailyRollups,
  fetchAlerts,
  getWeatherImage,
} from "./services/WeatherService";
import WeatherCard from "./components/WeatherCard";
import RollupsCard from "./components/RollupsCard";
import AlertsCard from "./components/AlertsCard";
import TemperatureChart from "./components/TemperatureChart";
import CityList from "./components/CityList";
import Modal from "./components/Modal";
import Footer from "./components/Footer";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [dailyRollups, setDailyRollups] = useState([]);
  const [alerts, setAlerts] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const weatherData = await fetchWeatherData();
        setWeatherData(weatherData);
        setSelectedCity(weatherData[0]?.city || null);
      } catch (err) {
        console.error("Error fetching weather data", err);
      }

      try {
        const rollups = await fetchDailyRollups();
        setDailyRollups(rollups);
      } catch (err) {
        console.error("Error fetching rollups", err);
      }

      try {
        const alerts = await fetchAlerts();
        setAlerts(alerts);
      } catch (err) {
        console.error("Error fetching alerts", err);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const currentWeather = weatherData.find((data) => data.city === selectedCity);
      if (currentWeather) {
        const imageUrl = getWeatherImage(currentWeather.main.toLowerCase());
        setBackgroundImage(imageUrl);

        const image = new Image();
        image.src = imageUrl;
        image.onload = () => console.log("Image loaded successfully!");
        image.onerror = () => console.error("Error loading image.");
      }
    }
  }, [selectedCity, weatherData]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const openChartModal = () => {
    setIsChartModalOpen(true);
  };

  const closeChartModal = () => {
    setIsChartModalOpen(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between items-center relative bg-gray-900 text-gray-100"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="text-center relative z-10">
        <h1 className="text-6xl font-extrabold tracking-tight m-20 text-white drop-shadow-md">
          🌤 Real-Time Weather Dashboard
        </h1>
        <CityList 
          weatherData={weatherData} 
          selectedCity={selectedCity} 
          onCitySelect={handleCitySelect} 
        />
      </header>

      <div className="grid gap-8 w-full max-w-6xl md:grid-cols-2 lg:grid-cols-3 relative z-10 p-6">
        {selectedCity && (
          <WeatherCard
            weatherData={weatherData.find((data) => data.city === selectedCity)}
            className="transition duration-300 ease-in-out transform hover:scale-105 shadow-lg rounded-lg backdrop-blur-xl bg-opacity-75 bg-gray-800 p-6"
          />
        )}
        <RollupsCard
          cityRollup={dailyRollups.find((rollup) => rollup._id.city === selectedCity)}
          className="transition duration-300 ease-in-out transform hover:scale-105 shadow-lg rounded-lg backdrop-blur-xl bg-opacity-75 bg-gray-800 p-6"
        />
        <AlertsCard
          alerts={alerts}
          className="transition duration-300 ease-in-out transform hover:scale-105 shadow-lg rounded-lg backdrop-blur-xl bg-opacity-75 bg-gray-800 p-6"
        />
      </div>

      <div className="relative z-10 mt-5">
        <button
          onClick={openChartModal}
          className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Show Temperature Chart
        </button>
      </div>

      <Modal isOpen={isChartModalOpen} onClose={closeChartModal}>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Temperature Chart</h2>
        <div className="max-h-screen overflow-auto p-4">
          <TemperatureChart weatherData={weatherData} />
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default App;
