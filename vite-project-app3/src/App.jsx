// import { useState } from "react";
// import Navbar from "./components/Navbar/Navbar";
// import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
// import "./App.css";
// import WeatherTabs from "./tab/Tabs";


// function App() {
//   const [weather, setWeather] = useState(null);
//   const [unit, setUnit] = useState("C");

//   // receives weather object from Navbar
//   const handleWeatherResult = (data) => {
//     setWeather(data);
//   };
//   const [activeTab, setActiveTab] = useState("Overview");
//   return (
//     <div>
//       <Navbar onSearch={handleWeatherResult} />

//       {/* ⬇️ Content below navbar */}
//       <div className="content-area">
//         <WeatherDisplay
//           weather={weather}
//           unit={unit}
//           setUnit={setUnit}
//         />
//       </div>
//       {/* <WeatherTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import HourlyWeatherGraph from "./components/HourlyForecast/HourlyForecast";
import "./App.css";
import WeatherTabs from "./tab/Tabs";
import { fetchForecastByCity } from "./api/weatherApi";
import { useUnit } from "./context/UnitContext";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const { unit } = useUnit();

  // 🔹 Fetch weather (used for both default & search)
  const handleWeatherResult = async (dataOrCity) => {
    try {
      setLoading(true);
      setError(null);

      // If Navbar already sends weather object
      if (typeof dataOrCity === "object" && dataOrCity.name) {
        setWeather(dataOrCity);
        // Fetch forecast for the city
        const forecastData = await fetchForecastByCity(dataOrCity.name);
        if (forecastData) {
          setForecast(forecastData);
        }
      }
    } catch (err) {
      console.error("Failed to load weather", err);
      setError("Failed to load weather data");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 DEFAULT CITY → Chennai
  useEffect(() => {
    const loadDefaultCity = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Chennai&units=metric&appid=4e8a86f79d5484ae4cda8af753e9e97f`
        );
        
        if (!res.ok) throw new Error("Failed to fetch weather");
        
        const data = await res.json();
        if (data.cod === 200) {
          setWeather(data);
          
          // Fetch forecast for default city
          const forecastData = await fetchForecastByCity("Chennai");
          if (forecastData) {
            setForecast(forecastData);
          }
        }
      } catch (err) {
        console.error("Default city load failed", err);
        setError("Failed to load default weather");
      } finally {
        setLoading(false);
      }
    };

    loadDefaultCity();
  }, []);

  return (
    <div>
      <Navbar onSearch={handleWeatherResult} />

      {/* ⬇️ Content below navbar */}
      <div className="content-area">
        {error && <div className="error-message">{error}</div>}
        <WeatherDisplay
          weather={weather}
          loading={loading}
        />
      </div>
      
      {weather && (
        <>
          <WeatherTabs weather={weather} activeTab={activeTab} setActiveTab={setActiveTab} />
          {forecast && forecast.list && (
            <HourlyWeatherGraph 
              hourly={forecast.list.slice(0, 8).map((item) => ({
                time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                temp: unit === "C" ? item.main.temp : (item.main.temp * 9) / 5 + 32,
                precipitation: Math.round(item.pop * 100),
                icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
              }))}
              unit={unit}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;

