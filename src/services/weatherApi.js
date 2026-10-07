import axios from "axios";

// Base URL for OpenWeatherMap API
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// API key — loaded from .env (VITE_API_KEY) with fallback hardcoded for dev
const API_KEY = import.meta.env.VITE_API_KEY || "42808cc9678e775a2257f2733bb98556";

/**
 * Fetch current weather data for a given city.
 * @param {string} city - City name entered by the user
 * @param {string} unit - "metric" (Celsius) or "imperial" (Fahrenheit)
 * @returns {Promise<Object>} Current weather data
 */
export const fetchCurrentWeather = async (city, unit = "metric") => {

  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: unit,
      appid: API_KEY,
    },
  });
  return response.data;
};

/**
 * Fetch 5-day / 3-hour forecast data for a given city.
 * We pick one reading per day (noon) to show a clean 5-day card list.
 * @param {string} city - City name entered by the user
 * @param {string} unit - "metric" (Celsius) or "imperial" (Fahrenheit)
 * @returns {Promise<Array>} Array of 5 daily forecast objects
 */
export const fetchForecast = async (city, unit = "metric") => {

  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units: unit,
      appid: API_KEY,
    },
  });

  // The API returns readings every 3 hours; filter to one per day (closest to 12:00)
  const daily = {};
  response.data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // "YYYY-MM-DD"
    const hour = item.dt_txt.split(" ")[1]; // "HH:MM:SS"
    if (!daily[date] || hour === "12:00:00") {
      daily[date] = item;
    }
  });

  // Return up to 5 days (skip today since current weather covers it)
  return Object.values(daily).slice(1, 6);
};
