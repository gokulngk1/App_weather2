import "./WeatherDisplay.css";
import { useUnit } from "../../context/UnitContext";

const WeatherDisplay = ({ weather, loading }) => {
  const { unit } = useUnit(); // ✅ global unit

  const kmhToMph = (kmh) => kmh / 1.60934;

  function getAQIText(aqi) {
  if (aqi == null) return "--";
  switch (Number(aqi)) {
    case 1: return "Good";
    case 2: return "Fair";
    case 3: return "Moderate";
    case 4: return "Poor";
    case 5: return "Very Poor";
    default: return String(aqi);
  }
  
}

const getWindDescription = (speedKmh) => {
  const mph = kmhToMph(speedKmh);

  if (mph >= 4 && mph <= 7)
    return `Light breeze – (4–7 mph)\nWind felt on face – leaves rustle, wind vane moved by wind`;

  if (mph >= 1 && mph <= 3)
    return `Light air – (1–3 mph)\nSmoke drifts – still wind vane`;

  if (mph >= 8 && mph <= 12)
    return `Gentle breeze – (8–12 mph)\nLeaves and small twigs in constant motion`;

  if (mph >= 13 && mph <= 18)
    return `Moderate breeze – (13–18 mph)\nDust and loose paper raised`;

  return `Windy – (${mph} mph)\nStrong noticeable movement in trees`;
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

 const getDewPointDescription = (dewPoint) => {
  if (dewPoint < 50) return `Very Comfortable – Dry air`;
  if (dewPoint < 60) return `Comfortable – Slight humidity`;
  if (dewPoint < 65) return `Slightly Humid`;
  if (dewPoint < 70) return `Humid – Muggy air`;
  if (dewPoint < 75) return `Very Humid – Sticky`;
  return `Extremely Humid – Very muggy`;
};





  if (loading) return <p>Loading...</p>;
  if (!weather) return <p className="status">Search a city to view weather</p>;

  const tempC = weather.main.temp;
  const tempF = (tempC * 9) / 5 + 32;

  const feelsLikeC = weather.main.feels_like;
  const feelsLikeF = (feelsLikeC * 9) / 5 + 32;

  console.log("weather", weather);
  const formatTime = (timestamp) => {
  if (!timestamp) return "--";
  return new Date(timestamp * 1000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
  

  return (
    <div className="weather-card">
      {/* City */}
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>

      {/* Main weather row */}
      <div className="weather-header">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather"
        />

        <div>
          <h1>
            {unit === "C"
              ? `${Math.round(tempC)}°C`
              : `${Math.round(tempF)}°F`}
          </h1>

          <div className="temp-details">
            <p className="weather-type">
              {weather.weather[0].description}
            </p>
            <p className="feels-like">
              Feels like{" "}
              {unit === "C"
                ? `${Math.round(feelsLikeC)}°C`
                : `${Math.round(feelsLikeF)}°F`}
            </p>
          </div>
          
        </div>
      </div>

      {/* Extra info */}
      <div className="info">
         <div> <span>🌅 Sun Rise : </span>
         <span>{formatTime(weather.sys?.sunrise)}</span>
        </div>
        <div className=""><span>Visibility</span>
        <span>{getVisibilityDescription(weather.visibility)}</span>
        </div>
         <div className=""> <span>Dew Point</span>
        <span>{getDewPointDescription(weather.main.dew_point)}</span>
       </div>
        <div className="">   <span>Humidity: {weather.main.humidity}%</span></div>
        <div className=""></div>
        <span>Wind: {weather.wind.speed} km/h</span>
        <div> 
        <span> 🌇 Sun set : </span>
        <span>{formatTime(weather.sys?.sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
