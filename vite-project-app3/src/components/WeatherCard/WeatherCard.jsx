import { useEffect, useState } from "react";
import { fetchWeatherByCity } from "../../api/weatherApi";
import "./WeatherCard.css";

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    const handleSearch = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchWeatherByCity(city);
        setWeather(data);
      } catch (err) {
        setError("City not found");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [city]);

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!weather) return null;

  return (
    <div className="weather-card">
      <h2 className="city-name">
        {weather.name}, {weather.sys?.country}
      </h2>

      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <span className="temp">
          {Math.round(weather.main.temp)}°
        </span>
      </div>

      <p className="description">
        {weather.weather[0].description}
      </p>

      <div className="weather-details">
        <span>Humidity: {weather.main.humidity}%</span>
        <span>Wind: {weather.wind.speed} m/s</span>
      </div>
    </div>
  );
};

export default WeatherCard;
