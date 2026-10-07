import { useState, useEffect, useCallback } from "react";
import { fetchCurrentWeather, fetchForecast } from "../services/weatherApi";

// localStorage key for persisting the last searched city
const LAST_CITY_KEY = "weather_last_city";

/**
 * Custom hook that handles all weather data fetching logic.
 *
 * useState  – stores weather data, forecast, loading state, error message,
 *             the active city query, and the unit toggle (C/F).
 * useEffect – auto-fetches weather when the component mounts if a city was
 *             previously saved in localStorage (restores last search).
 * useCallback – memoises the search function so child components that receive
 *               it as a prop don't re-render unnecessarily.
 *
 * @returns {Object} All state values + the search trigger function
 */
const useWeather = () => {
  // Current weather data returned by the API
  const [weather, setWeather] = useState(null);

  // 5-day forecast array
  const [forecast, setForecast] = useState([]);

  // True while an API request is in-flight
  const [loading, setLoading] = useState(false);

  // Holds a human-readable error string or null when there's no error
  const [error, setError] = useState(null);

  // "metric" = Celsius, "imperial" = Fahrenheit
  const [unit, setUnit] = useState("metric");

  // The city the user most recently searched for (drives the search)
  const [city, setCity] = useState(() => {
    // useState lazy initialiser: read localStorage once on first render
    return localStorage.getItem(LAST_CITY_KEY) || "";
  });

  /**
   * Fetch both current weather and 5-day forecast for `cityName`.
   * Wrapped in useCallback so the function reference stays stable across
   * re-renders (only changes when `unit` changes).
   */
  const searchCity = useCallback(
    async (cityName) => {
      const trimmed = cityName.trim();
      if (!trimmed) return;

      setLoading(true);
      setError(null);
      setWeather(null);
      setForecast([]);

      try {
        // Run both requests in parallel for speed
        const [weatherData, forecastData] = await Promise.all([
          fetchCurrentWeather(trimmed, unit),
          fetchForecast(trimmed, unit),
        ]);

        setWeather(weatherData);
        setForecast(forecastData);

        // Persist the successfully searched city so it survives page reloads
        localStorage.setItem(LAST_CITY_KEY, trimmed);
        setCity(trimmed);
      } catch (err) {
        const status = err.response?.status;
        if (status === 404) {
          setError(`City "${trimmed}" not found. Please check the spelling and try again.`);
        } else if (status === 401) {
          setError("Invalid API key. Add your key to the .env file and restart the dev server.");
        } else if (!err.response) {
          setError("Network error. Please check your internet connection and try again.");
        } else {
          setError(`Something went wrong (status ${status}). Please try again later.`);
        }
      } finally {
        setLoading(false);
      }
    },
    [unit] // re-create only when unit changes so results stay in correct unit
  );

  /**
   * Toggle between Celsius and Fahrenheit.
   * After toggling, re-fetch the current city so displayed values update.
   */
  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  }, []);

  /**
   * useEffect – re-fetch when the unit changes (if a city is already set)
   * or on initial mount when localStorage has a saved city.
   */
  useEffect(() => {
    if (city) {
      searchCity(city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]); // intentionally only depends on `unit` to avoid infinite loops

  // Initial mount: fetch if there's a saved city in localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LAST_CITY_KEY);
    if (saved) {
      searchCity(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty array = run once on mount

  return {
    weather,
    forecast,
    loading,
    error,
    unit,
    city,
    searchCity,
    toggleUnit,
  };
};

export default useWeather;
