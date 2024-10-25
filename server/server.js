const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');
const Weather = require('./models/Weather');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];
const apiKey = process.env.API_KEY;

const kelvinToCelsius = (kelvin) => kelvin - 273.15;

const fetchWeatherData = async () => {
  try {
    const weatherData = await Promise.all(
      cities.map(async (city) => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const { main, temp, feels_like, dt } = response.data.main;
        const weather = new Weather({
          city,
          main: response.data.weather[0].main,
          temp: kelvinToCelsius(temp),
          feels_like: kelvinToCelsius(feels_like),
          dt: response.data.dt
        });
        await weather.save();
        return weather;
      })
    );
    console.log("Weather data updated.");
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const rollupWeatherData = async () => {
  try {
    const dailySummary = await Weather.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            city: "$city"
          },
          avgTemp: { $avg: "$temp" },
          maxTemp: { $max: "$temp" },
          minTemp: { $min: "$temp" },
          dominantCondition: { $first: "$main" }
        }
      },
      { $sort: { "_id.day": -1 } }
    ]);
    console.log("Daily summary calculated:", dailySummary);
  } catch (error) {
    console.error("Error calculating daily summary:", error);
  }
};

const checkAlerts = async () => {
  try {
    const threshold = parseFloat(process.env.ALERT_THRESHOLD);
    const consecutiveUpdates = parseInt(process.env.ALERT_CONSECUTIVE_UPDATES);

    const recentData = await Weather.find().sort({ createdAt: -1 }).limit(consecutiveUpdates);
    if (recentData.length === consecutiveUpdates && recentData.every(data => data.temp > threshold)) {
      console.log(`Alert: Temperature exceeded ${threshold}°C for ${consecutiveUpdates} consecutive updates.`);
    }
  } catch (error) {
    console.error("Error checking alerts:", error);
  }
};

fetchWeatherData();
checkAlerts();

const updateInterval = parseInt(process.env.UPDATE_INTERVAL) * 60 * 1000; // Convert minutes to milliseconds
setInterval(() => {
  fetchWeatherData();
  checkAlerts();
}, updateInterval);

setInterval(rollupWeatherData, 24 * 60 * 60 * 1000); // 24 hours

app.use('/api/weather', weatherRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
