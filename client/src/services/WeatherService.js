import axios from "axios";

const API_URL = process.env.API_URL || 'http://localhost:5000/api/weather';
const WEATHER_IMAGES = {
  clear: 'https://img.freepik.com/premium-photo/happy-sunny-background-blue-sky-with-real-sun-light-clouds-good-day-warm-weather-big-size_638259-344.jpg?semt=ais_hybrid',
  rain: 'https://media.istockphoto.com/id/503284599/photo/rainy-weather.jpg?s=612x612&w=0&k=20&c=pV38CVp0CLArYEZ6OUWnaqo6J5mo4JpbEZd61Vxr_I4=',
  clouds: 'https://media.istockphoto.com/id/157527872/photo/storm-cloud.jpg?s=612x612&w=0&k=20&c=wsK-fd2hBm9SGlV_lnKYqFCAS3-_sk-f9GFAUbT6H40=',
  snow: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg2hojM5R-Cjp0gabew6K0w0x68fHnUjJHRw&s',
  mist: 'https://img.freepik.com/free-photo/empty-road-dark-atmosphere_23-2150914154.jpg?semt=ais_hybrid',
  haze: 'https://img.freepik.com/free-photo/empty-road-dark-atmosphere_23-2150914154.jpg?semt=ais_hybrid',
  default: ''
};

export const fetchWeatherData = async () => {
  const res = await axios.get(`${API_URL}/data`);
  return res.data;
};

export const fetchDailyRollups = async () => {
  const res = await axios.get(`${API_URL}/rollups`);
  return res.data;
};

export const fetchAlerts = async () => {
  const res = await axios.get(`${API_URL}/alerts`);
  return res.data;
};

export const getWeatherImage = (condition) => {
  return WEATHER_IMAGES[condition] || WEATHER_IMAGES.default;
};
