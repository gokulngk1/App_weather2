import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";

function App() {
  const [weather, setWeather] = useState(null);
  // const [unit, setUnit] = useState("C");

  // 🔥 receives weather object directly
  const handleWeatherResult = (data) => {
    setWeather(data);
  };

  return (
    <>
      <Navbar onSearch={handleWeatherResult} />
      <WeatherDisplay weather={weather}  />
    </>
  );
}

export default App;
