import "../styles/WeatherCard.css";

/**
 * WeatherCard – displays current weather details.
 * Props:
 *   weather  – current weather object from OpenWeatherMap API
 *   unit     – "metric" | "imperial" (to display the correct symbol)
 *   onToggle – callback to switch between C and F
 */
const WeatherCard = ({ weather, unit, onToggle }) => {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity },
    wind: { speed },
    weather: [{ description, icon }],
  } = weather;

  // Unit label shown on the toggle button and temperature display
  const unitLabel = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  // OpenWeatherMap icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card">
      {/* City + country heading */}
      <div className="weather-card__location">
        <h2>
          {name}, {country}
        </h2>
        {/* Unit toggle sits inside the card for quick access */}
        <button className="unit-toggle" onClick={onToggle} aria-label="Toggle temperature unit">
          Switch to {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>

      {/* Weather icon + temperature */}
      <div className="weather-card__main">
        <img src={iconUrl} alt={description} className="weather-icon" />
        <span className="temperature">
          {Math.round(temp)}
          {unitLabel}
        </span>
      </div>

      {/* Description (e.g. "clear sky") */}
      <p className="weather-description">{description}</p>

      {/* Detail grid: feels like, humidity, wind */}
      <div className="weather-card__details">
        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <span className="detail-label">Feels like</span>
          <span className="detail-value">
            {Math.round(feels_like)}
            {unitLabel}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <span className="detail-label">Wind</span>
          <span className="detail-value">
            {speed} {windUnit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
