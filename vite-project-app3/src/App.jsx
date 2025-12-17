// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Navbar from './components/Navbar/Navbar.jsx';


// function App() {
//   return (
//     <div className="App">
//       <Navbar  onSearch={() => {}} />
//       {/* Your other application content */}
//     </div>
//   );
// }

// export default App


// import React, { useState } from "react";
// import "./App.css";
// import Navbar from "./components/Navbar/Navbar";
// import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";

// const API_KEY = "4e8a86f79d5484ae4cda8af753e9e97f";

// function App() {
//   const [weather, setWeather] = useState(null);

//   // Fetch API
//   const handleSearch = async (city) => {
//     if (!city) return;

//     try {
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
//       const res = await fetch(url);
//       const data = await res.json();

//       if (data.cod !== 200) {
//         alert("City not found");
//         return;
//       }

//       setWeather(data);
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <Navbar onSearch={handleSearch} />
//       <WeatherDisplay weather={weather} />
//     </div>
//   );
// }

// export default App;

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
    </>
  );
}

export default App;

