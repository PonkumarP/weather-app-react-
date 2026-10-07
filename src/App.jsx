import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import "./styles/App.css";

/**
 * App – root component that composes all UI pieces.
 *
 * All data logic lives in the useWeather hook; App is purely presentational.
 */
const App = () => {
  const { weather, forecast, loading, error, unit, city, searchCity, toggleUnit } =
    useWeather();

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app__header">
        <h1 className="app__title">
          <span className="app__title-icon">⛅</span> WeatherNow
        </h1>
        <p className="app__subtitle">Real-time weather at your fingertips</p>
      </header>

      {/* ── Search ── */}
      <main className="app__main">
        <SearchBar onSearch={searchCity} lastCity={city} />

        {/* Loading spinner */}
        {loading && <Loader />}

        {/* Error banner (city not found / network failure) */}
        {!loading && error && <ErrorMessage message={error} />}

        {/* Current weather card */}
        {!loading && !error && weather && (
          <WeatherCard weather={weather} unit={unit} onToggle={toggleUnit} />
        )}

        {/* 5-day forecast */}
        {!loading && !error && forecast.length > 0 && (
          <ForecastList forecast={forecast} unit={unit} />
        )}

        {/* Empty state – shown before any search */}
        {!loading && !error && !weather && (
          <div className="app__empty">
            <p>🌍 Enter a city name above to get the current weather and 5-day forecast.</p>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="app__footer">
        <p>
          Powered by{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenWeatherMap
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
