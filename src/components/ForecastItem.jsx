import "../styles/ForecastItem.css";

/**
 * ForecastItem – a single day's forecast card.
 * Props:
 *   item – one entry from the 5-day forecast array
 *   unit – "metric" | "imperial"
 */
const ForecastItem = ({ item, unit }) => {
  const {
    dt_txt,
    main: { temp, humidity },
    weather: [{ description, icon }],
    wind: { speed },
  } = item;

  const unitLabel = unit === "metric" ? "°C" : "°F";
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // Format "YYYY-MM-DD HH:MM:SS" → readable weekday + date
  const date = new Date(dt_txt.replace(" ", "T"));
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div className="forecast-item">
      <p className="forecast-day">{dayName}</p>
      <p className="forecast-date">{dateStr}</p>
      <img src={iconUrl} alt={description} className="forecast-icon" />
      <p className="forecast-temp">
        {Math.round(temp)}
        {unitLabel}
      </p>
      <p className="forecast-desc">{description}</p>
      <div className="forecast-meta">
        <span>💧 {humidity}%</span>
        <span>💨 {speed} {unit === "metric" ? "m/s" : "mph"}</span>
      </div>
    </div>
  );
};

export default ForecastItem;
