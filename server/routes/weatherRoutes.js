const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');

const formatWeatherData = (data) => ({
  ...data,
  temp: parseFloat(data.temp.toFixed(1)),
  feels_like: parseFloat(data.feels_like.toFixed(1))
});

router.get('/data', async (_req, res) => {
  try {
    const latestWeatherData = await Weather.aggregate([
      {
        $group: {
          _id: "$city",
          latest: { $last: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$latest" }
      }
    ]);

    const formattedData = latestWeatherData.map(formatWeatherData);
    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching latest weather data:", error);
    res.status(500).json({ message: "Error fetching latest weather data" });
  }
});

router.get('/data/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const weatherData = await Weather.findOne({ city }).sort({ createdAt: -1 });
    
    if (!weatherData) {
      return res.status(404).json({ message: "City not found" });
    }

    const formattedWeatherData = formatWeatherData(weatherData);
    res.json(formattedWeatherData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving weather data", error });
  }
});

router.get('/rollups', async (_req, res) => {
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
    
    const formattedSummary = dailySummary.map(item => ({
      ...item,
      avgTemp: parseFloat(item.avgTemp.toFixed(1)),
      maxTemp: parseFloat(item.maxTemp.toFixed(1)),
      minTemp: parseFloat(item.minTemp.toFixed(1))
    }));
    
    res.json(formattedSummary);
  } catch (error) {
    res.status(500).json({ message: "Error calculating daily summary", error });
  }
});

router.get('/alerts', async (_req, res) => {
  try {
    const threshold = parseFloat(process.env.ALERT_THRESHOLD);
    const consecutiveUpdates = parseInt(process.env.ALERT_CONSECUTIVE_UPDATES);

    const recentData = await Weather.find().sort({ createdAt: -1 }).limit(consecutiveUpdates);
    const isAlertTriggered = recentData.length === consecutiveUpdates &&
                             recentData.every(data => data.temp > threshold);

    res.json({
      message: isAlertTriggered 
        ? `Alert: Temperature exceeded ${threshold}°C for ${consecutiveUpdates} consecutive updates.` 
        : "No alerts triggered.",
      data: recentData.map(formatWeatherData)
    });
  } catch (error) {
    res.status(500).json({ message: "Error checking alerts", error });
  }
});

module.exports = router;
