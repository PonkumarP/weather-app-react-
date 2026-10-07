import "../styles/Loader.css";

/**
 * Loader – animated spinner shown while data is being fetched.
 * No props needed; visibility is controlled by the parent via conditional render.
 */
const Loader = () => {
  return (
    <div className="loader-wrapper" role="status" aria-live="polite" aria-label="Loading weather data">
      <div className="spinner"></div>
      <p className="loader-text">Fetching weather data…</p>
    </div>
  );
};

export default Loader;
