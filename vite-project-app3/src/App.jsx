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
    <div>
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



// import { useEffect, useState } from "react";
// import Navbar from "./components/Navbar/Navbar";
// import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
// import "./App.css";

// const API_KEY = "4e8a86f79d5484ae4cda8af753e9e97f";

// function App() {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ Load Chennai by default
//   useEffect(() => {
//     fetchWeather("Chennai");
//   }, []);

//   const fetchWeather = async (city) => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       const data = await res.json();
//       setWeather(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar onSearch={fetchWeather} />

//       <div className="content-area">
//         <WeatherDisplay weather={weather} loading={loading} />
//       </div>
//     </div>
//   );
// }

// export default App;
