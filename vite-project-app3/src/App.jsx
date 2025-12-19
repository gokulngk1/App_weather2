import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import { fetchWeatherByCity } from "./api/weatherApi";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <WeatherDisplay weather={weather} loading={loading} />
      {/* <WeatherCard weather={weather} loading={loading} error={error} /> */}

    </>
  );
}

export default App;

