// import { useState } from "react";
// import Navbar from "./components/Navbar/Navbar";
// import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";

// function App() {
//   const [weather, setWeather] = useState(null);
//   const [unit, setUnit] = useState("C");

//   // 🔥 receives weather object directly
//   const handleWeatherResult = (data) => {
//     setWeather(data);
//   };

//   return (
//     <>
//       <Navbar onSearch={handleWeatherResult} />
//       <WeatherDisplay weather={weather} unit={unit} />
//     </>
//   );
// }

// export default App;


import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");

  // receives weather object from Navbar
  const handleWeatherResult = (data) => {
    setWeather(data);
  };

  return (
    <div className="app-root">
      <Navbar onSearch={handleWeatherResult} />

      {/* ⬇️ Content below navbar */}
      <div className="content-area">
        <WeatherDisplay
          weather={weather}
          unit={unit}
          setUnit={setUnit}
        />
      </div>
    </div>
  );
}

export default App;
