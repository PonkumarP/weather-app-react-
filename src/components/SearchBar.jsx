import { useState } from "react";
import "../styles/SearchBar.css";

/**
 * SearchBar – controlled input + submit button.
 * Props:
 *   onSearch(city) – callback fired when user submits a city name
 *   lastCity       – pre-fills the input with the last searched city
 */
const SearchBar = ({ onSearch, lastCity = "" }) => {
  // Local state for the input value (lifted up only on submit, not on every key)
  const [inputValue, setInputValue] = useState(lastCity);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="search-input"
        placeholder="Search city… e.g. London"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="City name"
      />
      <button type="submit" className="search-btn" aria-label="Search">
        🔍 Search
      </button>
    </form>
  );
};

export default SearchBar;
