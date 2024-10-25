const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  main: { type: String, required: true },
  temp: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  dt: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Weather = mongoose.model('Weather', WeatherSchema);
module.exports = Weather;
