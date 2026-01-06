import React from "react";
import "./tabs.css";

export default function WeatherTabs({ activeTab, setActiveTab }) {
  const tabs = [
    "Overview",
    "Wind",
    "Air Quality",
    "Humidity",
    "Visibility",
  ];

  return (
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
  );
}
