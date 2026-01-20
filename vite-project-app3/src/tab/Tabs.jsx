import React from "react";
import "./tabs.css";
import { useUnit } from "../context/UnitContext";

export default function WeatherTabs({ weather, activeTab, setActiveTab }) {
  const { unit } = useUnit();
  const tabs = [
    "Overview",
    "Wind",
    "Air Quality",
    "Humidity",
    "Visibility",
  ];

  if (!weather) return null;

  const tempC = weather.main.temp;
  const tempF = (tempC * 9) / 5 + 32;
  const feelsLikeC = weather.main.feels_like;
  const feelsLikeF = (feelsLikeC * 9) / 5 + 32;

  // Helper functions
  const getAQIText = (aqi) => {
    if (aqi == null) return "--";
    switch (Number(aqi)) {
      case 1: return "Good";
      case 2: return "Fair";
      case 3: return "Moderate";
      case 4: return "Poor";
      case 5: return "Very Poor";
      default: return String(aqi);
    }
  };

  const kmhToMph = (kmh) => kmh / 1.60934;

  const getWindDescription = (speedKmh) => {
    const mph = kmhToMph(speedKmh);
    if (mph >= 4 && mph <= 7)
      return `Light breeze – (4–7 mph)\nWind felt on face – leaves rustle`;
    if (mph >= 1 && mph <= 3)
      return `Light air – (1–3 mph)\nSmoke drifts – still wind vane`;
    if (mph >= 8 && mph <= 12)
      return `Gentle breeze – (8–12 mph)\nLeaves in constant motion`;
    if (mph >= 13 && mph <= 18)
      return `Moderate breeze – (13–18 mph)\nDust raised`;
    return `Windy – (${mph} mph)\nStrong movement in trees`;
  };

  const getHumidityDescription = (humidity) => {
    if (humidity <= 30) return `${humidity}% – Dry\nAir may feel dry.`;
    if (humidity <= 50) return `${humidity}% – Comfortable\nIdeal humidity.`;
    if (humidity <= 60) return `${humidity}% – Slightly Humid`;
    if (humidity <= 70) return `${humidity}% – Humid`;
    if (humidity <= 80) return `${humidity}% – Very Humid`;
    return `${humidity}% – Extremely Humid\nAir feels heavy.`;
  };

  const getVisibilityDescription = (visibilityMeters) => {
    const mi = visibilityMeters / 1609.34;
    if (mi > 10) return `Excellent visibility (>10 mi)`;
    if (mi > 6) return `Good visibility (6–10 mi)`;
    if (mi > 3) return `Moderate visibility (3–5 mi)`;
    if (mi >= 1) return `Poor visibility (1–2 mi)`;
    return `Very poor visibility (<1 mi)`;
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="tab-content">
            <div className="tab-item">
              <span className="label">Temperature</span>
              <span className="value">
                {unit === "C" ? `${Math.round(tempC)}°C` : `${Math.round(tempF)}°F`}
              </span>
            </div>
            <div className="tab-item">
              <span className="label">Feels Like</span>
              <span className="value">
                {unit === "C" ? `${Math.round(feelsLikeC)}°C` : `${Math.round(feelsLikeF)}°F`}
              </span>
            </div>
            <div className="tab-item">
              <span className="label">Condition</span>
              <span className="value">{weather.weather[0].description}</span>
            </div>
            <div className="tab-item">
              <span className="label">Pressure</span>
              <span className="value">{weather.main.pressure} hPa</span>
            </div>
          </div>
        );

      case "Wind":
        return (
          <div className="tab-content">
            <div className="tab-item">
              <span className="label">Wind Speed</span>
              <span className="value">{weather.wind.speed} km/h</span>
            </div>
            <div className="tab-item">
              <span className="label">Wind Direction</span>
              <span className="value">{weather.wind.deg}°</span>
            </div>
            <div className="tab-item">
              <span className="label">Wind Description</span>
              <span className="value" style={{whiteSpace: 'pre-wrap'}}>
                {getWindDescription(weather.wind.speed)}
              </span>
            </div>
            {weather.wind.gust && (
              <div className="tab-item">
                <span className="label">Wind Gust</span>
                <span className="value">{weather.wind.gust} km/h</span>
              </div>
            )}
          </div>
        );

      case "Air Quality":
        return (
          <div className="tab-content">
            <div className="tab-item">
              <span className="label">Air Quality Index</span>
              <span className="value">
                {getAQIText(weather.air?.main?.aqi)} ({weather.air?.main?.aqi || "N/A"})
              </span>
            </div>
            <div className="tab-item">
              <span className="label">Note</span>
              <span className="value">Air Quality data requires additional API call</span>
            </div>
          </div>
        );

      case "Humidity":
        return (
          <div className="tab-content">
            <div className="tab-item">
              <span className="label">Humidity</span>
              <span className="value">{weather.main.humidity}%</span>
            </div>
            <div className="tab-item">
              <span className="label">Description</span>
              <span className="value" style={{whiteSpace: 'pre-wrap'}}>
                {getHumidityDescription(weather.main.humidity)}
              </span>
            </div>
          </div>
        );

      case "Visibility":
        return (
          <div className="tab-content">
            <div className="tab-item">
              <span className="label">Visibility</span>
              <span className="value">{(weather.visibility / 1000).toFixed(1)} km</span>
            </div>
            <div className="tab-item">
              <span className="label">Description</span>
              <span className="value">
                {getVisibilityDescription(weather.visibility)}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="weather-tabs-container">
      <div className="weather-tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
