// import "./WeatherDisplay.css";
// import { useUnit } from "../../context/UnitContext";

// const WeatherDisplay = ({ weather, loading }) => {
//   const { unit } = useUnit(); // ✅ global unit

//   if (loading) return <p>Loading...</p>;
//   if (!weather) return <p className="status">Search a city to view weather</p>;

//   const tempC = weather.main.temp;
//   const tempF = (tempC * 9) / 5 + 32;

//   return (
//     <div className="weather-card ">
//       <h2>
//         {weather.name}, {weather.sys.country}
//       </h2>
//       <div className="backgroun">
        
//       </div>
//     <div className="weathecard">
//         <img
//         src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//         alt="weather"
//       />

//       <h1>
//         {unit === "C"
//           ? `${Math.round(tempC)}°C`
//           : `${Math.round(tempF)}°F`}
//       </h1>
//       <div className="temp-details">
//           <p className="weather-type">{current.weather[0].description}</p>
//           <p className="feels-like">
//             Feels like {Math.round(current.main.feels_like)}°{unit}
//           </p>
//         </div>
    

//     </div>
//       <div className="info">
//         <span>{weather.weather[0].description}</span>
//         <span>Humidity: {weather.main.humidity}%</span>
//         <span>Wind: {weather.wind.speed} km/h</span>
//       </div>
//     </div>
    
//   );
// };

// export default WeatherDisplay;


import "./WeatherDisplay.css";
import { useUnit } from "../../context/UnitContext";

const WeatherDisplay = ({ weather, loading }) => {
  const { unit } = useUnit(); // ✅ global unit

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

  if (loading) return <p>Loading...</p>;
  if (!weather) return <p className="status">Search a city to view weather</p>;

  const tempC = weather.main.temp;
  const tempF = (tempC * 9) / 5 + 32;

  const feelsLikeC = weather.main.feels_like;
  const feelsLikeF = (feelsLikeC * 9) / 5 + 32;

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
        {/* <p>{getAQIText(current.air?.main?.aqi)} ({current.air?.main?.aqi})</p> */}
        <span>Humidity: {weather.main.humidity}%</span>
        <span>Wind: {weather.wind.speed} km/h</span>
      </div>
    </div>
  );
};

export default WeatherDisplay;
