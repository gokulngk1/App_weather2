// import React from 'react'

// function Majorcity() {

//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Majorcity


// useState -  to store empty array 
// useEffect - to call the api when the component loads
// fetch - to call the api
// map - to iterate through the array and display the data


// -------------------------------------------------------------


import { useEffect, useState } from "react";
import { fetchWeatherByCity } from '../../../api/weatherApi'; // adjust path if needed
import "./Majorcity.css";

const cities = ["London", "Paris", "Tokyo", "Delhi"];

const MajorCity = () => {
  const [weatherList, setWeatherList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await Promise.all(
          cities.map((city) => fetchWeatherByCity(city))
        );
        setWeatherList(data);
      } catch (err) {
        console.error("Failed to load major cities weather", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
  <div className="d-flex ">
    <div className="major-cities-container d-flex row gap-3">
      {weatherList.map((weather, index) => (
        <div className="current-weather-box" key={cities[index]}>
          <span className="location-name">
            {cities[index]}{" "}
            <span role="img" aria-label="weather">
              {weather?.weather?.[0]?.main === "Clear" ? "☀️" : "☁️"}
            </span>{" "}
            {Math.round(weather?.main?.temp)}°
          </span>

          <button className="more-options-btn">
            <span className="ellipsis">...</span>
          </button>
        </div>
      ))}
    </div>
  </div>
);

};

export default MajorCity;
