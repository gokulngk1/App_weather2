import React from "react";
import "./WeatherDisplay.css";

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="weather-container">
      <div className="weather-box">
        <h2 className="city">
          {weather.name}, {weather.sys.country}
        </h2>

        <h1 className="temperature">{weather.main.temp}°C</h1>

        <p className="description">
          {weather.weather[0].description}
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
