import { useState } from "react";
import "./WeatherDisplay.css";
import UnitToggle from "../Navbar/UnitToggle/UnitToggle"; 


const WeatherDisplay = ({ weather, loading }) => {
   const [unit, setUnit] = useState("C");

  if (loading) return /* shimmer code here */;
  if (!weather) return <p className="status">Search a city to view weather</p>;

  const tempC = weather.main.temp;
  const tempF = (tempC * 9) / 5 + 32;

  return (
    <div className="weather-card">

     
         <h2>
        {weather.name}, {weather.sys.country}  
        </h2>
       <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather"
      />
    

      <h1>
        {unit === "C"
          ? `${Math.round(tempC)}°C`
          : `${Math.round(tempF)}°F`}
      </h1>

      <button
        className="unit-toggle"
        onClick={() => setUnit(unit === "C" ? "F" : "C")}
      >
        Switch to °{unit === "C" ? "F" : "C"}
      </button>

      <p className="desc">{weather.weather[0].description}</p>

      <div className="col d-flex info">
        <span>Humidity: {weather.main.humidity}%</span>
        <span>Wind: {weather.wind.speed} km/h</span>
      </div>
    </div>
  );
};

export default WeatherDisplay;


// import "./WeatherDisplay.css";
// import { useUnit } from "../../context/UnitContext";

// const WeatherDisplay = ({ weather, loading }) => {
//   const { unit } = useUnit(); // ⬅️ only read unit

//   if (loading) return null;
//   if (!weather) return <p className="status">Search a city to view weather</p>;

//   const tempC = weather.main.temp;
//   const tempF = (tempC * 9) / 5 + 32;

//   return (
//     <div className="weather-card">
//       <h2>
//         {weather.name}, {weather.sys.country}
//       </h2>

//       <img
//         src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//         alt="weather"
//       />

//       {/* ✅ Temperature stays synced */}
//       <h1>
//         {unit === "C"
//           ? `${Math.round(tempC)}°C`
//           : `${Math.round(tempF)}°F`}
//       </h1>

//       <p className="desc">{weather.weather[0].description}</p>

//       <div className="info">
//         <span>Humidity: {weather.main.humidity}%</span>
//         <span>Wind: {weather.wind.speed} km/h</span>
//       </div>
//     </div>
//   );
// };

// export default WeatherDisplay;
