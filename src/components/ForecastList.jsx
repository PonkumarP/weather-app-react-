import ForecastItem from "./ForecastItem";
import "../styles/ForecastList.css";

/**
 * ForecastList – renders the horizontal row of 5-day forecast cards.
 * Props:
 *   forecast – array of up to 5 daily forecast objects
 *   unit     – "metric" | "imperial"
 */
const ForecastList = ({ forecast, unit }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <section className="forecast-list" aria-label="5-day forecast">
      <h3 className="forecast-list__title">5-Day Forecast</h3>
      <div className="forecast-list__grid">
        {forecast.map((item) => (
          // dt (unix timestamp) is a stable, unique key for each day
          <ForecastItem key={item.dt} item={item} unit={unit} />
        ))}
      </div>
    </section>
  );
};

export default ForecastList;
