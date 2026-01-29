import React, { useState, useCallback, useRef } from "react";
import "./SearchCity.css";
import { fetchWeatherByCity, fetchCitySuggestions } from "../../api/weatherApi";
import { useUnit } from "../../context/UnitContext";

const SearchCity = ({ onResult }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const { unit } = useUnit();

  const debounceRef = useRef(null);

  /**
   * Convert unit from context to API units
   */
  const getApiUnit = () => {
    return unit === "C" ? "metric" : "imperial";
  };

  /**
   * Handle input change with debounced suggestions
   */
  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);

      clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        if (!value.trim()) {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }

        setLoading(true);
        const cities = await fetchCitySuggestions(value);
        setSuggestions(cities);
        setShowSuggestions(cities.length > 0);
        setLoading(false);
      }, 500);
    },
    []
  );

  /**
   * Handle search button click
   */
  const handleSearchClick = async () => {
    if (!query.trim()) return;

    setShowSuggestions(false);
    setLoading(true);

    const data = await fetchWeatherByCity(query, getApiUnit());
    if (data && onResult) {
      onResult(data);
      setQuery("");
    } else {
      alert("City not found. Please try again.");
    }
    setLoading(false);
  };

  /**
   * Handle suggestion click
   */
  const handleSuggestionClick = async (city) => {
    const cityName = `${city.name}${city.state ? ", " + city.state : ""}, ${
      city.country
    }`;

    setQuery(cityName);
    setShowSuggestions(false);
    setLoading(true);

    const data = await fetchWeatherByCity(city.name, getApiUnit());
    if (data && onResult) {
      onResult(data);
      setQuery("");
    }
    setLoading(false);
  };

  /**
   * Handle keyboard press (Enter to search)
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="msn-search-wrapper">
      <div className="msn-search-box">
        <input
          type="text"
          value={query}
          placeholder="Search for a city"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="msn-search-input"
          disabled={loading}
        />
        <button
          className="msn-search-btn"
          onClick={handleSearchClick}
          aria-label="Search city"
          disabled={loading}
        >
          {loading ? "..." : "🔍"}
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="msn-suggestions">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSuggestionClick(city)}>
              {city.name}
              {city.state ? `, ${city.state}` : ""}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCity;



