import "../styles/ErrorMessage.css";

/**
 * ErrorMessage – displays a styled error banner.
 * Props:
 *   message – the error string to display (e.g. "City not found")
 */
const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-message" role="alert" aria-live="assertive">
      <span className="error-icon">⚠️</span>
      <p className="error-text">{message}</p>
    </div>
  );
};

export default ErrorMessage;
