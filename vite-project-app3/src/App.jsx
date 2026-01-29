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
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import "./App.css";
import WeatherTabs from "./tab/Tabs";
import { fetchWeatherByCity, fetchForecastByCity } from "./api/weatherApi";
import { API_CONFIG } from "./api/config";
import { useUnit } from "./context/UnitContext";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const { unit } = useUnit();

  /**
   * Convert unit from context to API units
   */
  const getApiUnit = () => {
    return unit === "C" ? "metric" : "imperial";
  };

  /**
   * Fetch weather and forecast for a given city
   */
  const fetchCityWeather = async (cityName) => {
    try {
      setLoading(true);
      setError(null);

      const weatherData = await fetchWeatherByCity(cityName, getApiUnit());
      if (!weatherData) {
        setError(`Could not find weather for ${cityName}`);
        return;
      }

      setWeather(weatherData);

      // Fetch forecast for the city
      const forecastData = await fetchForecastByCity(cityName, getApiUnit());
      if (forecastData) {
        setForecast(forecastData);
      }
    } catch (err) {
      console.error("Failed to load weather", err);
      setError("Failed to load weather data");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle weather result from search/navbar
   */
  const handleWeatherResult = async (dataOrCity) => {
    // If it's already a weather object (from navbar buttons)
    if (typeof dataOrCity === "object" && dataOrCity.name) {
      await fetchCityWeather(dataOrCity.name);
    } else if (typeof dataOrCity === "string") {
      // If it's a city name string
      await fetchCityWeather(dataOrCity);
    }
  };

  /**
   * Load default city on app mount
   */
  useEffect(() => {
    fetchCityWeather(API_CONFIG.DEFAULT_CITY);
  }, []);

  /**
   * Re-fetch weather when unit changes
   */
  useEffect(() => {
    if (weather?.name) {
      fetchCityWeather(weather.name);
    }
  }, [unit]);

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
                temp: item?.main?.temp || 0,
                precipitation: Math.round(item.pop * 100),
                icon: item.weather[0].icon,
                wind: Math.round(item?.wind?.speed) || 0,
                humidity: item?.main?.humidity || 0,
                visibility: Math.round((item?.visibility || 0) / 1000),
              }))}
              unit={unit}
              activeTab={activeTab}
            />
          )}
          <WeatherDetails weather={weather} forecast={forecast} />        </>
      )}
    </div>
  );
}

export default App;