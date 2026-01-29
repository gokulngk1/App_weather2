import { useEffect, useState } from "react";
import { fetchWeatherByCity } from "../../../api/weatherApi";
import { API_CONFIG } from "../../../api/config";
import { useUnit } from "../../../context/UnitContext";
import "./Majorcity.css";

const MajorCity = ({ onSearch }) => {
  const [weatherList, setWeatherList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { unit } = useUnit();

  /**
   * Convert unit from context to API units
   */
  const getApiUnit = () => {
    return unit === "C" ? "metric" : "imperial";
  };

  /**
   * Fetch weather for all major cities
   */
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await Promise.all(
          API_CONFIG.MAJOR_CITIES.map((city) => 
            fetchWeatherByCity(city, getApiUnit())
          )
        );
        setWeatherList(data.filter((item) => item !== null));
      } catch (err) {
        console.error("Failed to load major cities weather", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [unit]); // Re-fetch when unit changes

  /**
   * Handle city click to display its weather
   */
  const handleCityClick = (weather) => {
    if (weather && onSearch) {
      onSearch(weather);
    }
  };

  if (loading) {
    return <p className="text-center">Loading cities...</p>;
  }

  if (weatherList.length === 0) {
    return <p className="text-center">Failed to load major cities</p>;
  }

  return (
    <div className="major-cities-container mt-2">
      {weatherList.map((weather, index) => (
        <div 
          className="current-weather-box" 
          key={weather?.id || index}
          onClick={() => handleCityClick(weather)}
          style={{ cursor: 'pointer' }}
          title={`Click to view ${weather?.name} weather`}
        >
          <span className="location-name">
            {weather?.name}{" "}
            {weather?.weather?.[0]?.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description || "weather"}
                width="20"
                style={{ verticalAlign: "middle" }}
              />
            )}{" "}
            {Math.round(weather?.main?.temp)}°
          </span>
        </div>
      ))}
    </div>
  );
};

export default MajorCity;
