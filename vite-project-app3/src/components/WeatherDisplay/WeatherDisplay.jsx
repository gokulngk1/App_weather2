import "./WeatherDisplay.css";
import { useUnit } from "../../context/UnitContext";

const WeatherDisplay = ({ weather, loading }) => {
  const { unit } = useUnit(); // ✅ global unit

  if (loading) return <p>Loading...</p>;
  if (!weather) return <p className="status">Search a city to view weather</p>;

  const tempC = weather.main.temp;
  const tempF = (tempC * 9) / 5 + 32;

  return (
    <div className="weather-card flex-column-center">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
    <div className="weathecard">
        <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather"
      />

      <h1>
        {unit === "C"
          ? `${Math.round(tempC)}°C`
          : `${Math.round(tempF)}°F`}
      </h1>

    </div>
      <div className="info">
        <span>{weather.weather[0].description}</span>
        <span>Humidity: {weather.main.humidity}%</span>
        <span>Wind: {weather.wind.speed} km/h</span>
      </div>
    </div>
    
  );
};

export default WeatherDisplay;
