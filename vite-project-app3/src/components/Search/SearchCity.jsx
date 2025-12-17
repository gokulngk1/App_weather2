// import React,{useState} from 'react';
// import { fetchWeatherByCity } from '../../api/weatherApi';
// import"../Navbar/Navbar.css";

// const SearchCity = ({onChange})=>{
//    const [searchQuery, setSearchQuery] = useState('');

//    const handleSearchClick = () => {
//     if (searchQuery.trim() !== "") {
//       onSearch(searchQuery);
//     }
//   };
// console.log(fetchWeatherByCity("Chennai"));

// // Fetch API
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

//     return (
//       <div className="navbar-group search-location-group">

//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search for location"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="search-input"
//           />

//           <button className="search-icon-btn" onClick={handleSearch}>
//             🔍
//           </button>
//         </div>
//         </div>
//     )
//   }

// export default SearchCity


// import React, { useState, useCallback, useRef } from "react";
// import "./SearchCity.css";

// /* ===============================
//    STATIC CITY SUGGESTIONS
// ================================ */
// const citySuggestions = [
//   "Chennai",
//   "Coimbatore",
//   "Madurai",
//   "Tiruchirappalli",
//   "Salem",
//   "Bangalore",
//   "Hyderabad",
//   "Mumbai",
// ];

// const SearchCity = ({ onSearch }) => {
//   const [query, setQuery] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const debounceRef = useRef(null);

//   /* ===============================
//      DEBOUNCED SEARCH (useCallback)
//   =============================== */
//   const debouncedSearch = useCallback(
//     (value) => {
//       if (debounceRef.current) {
//         clearTimeout(debounceRef.current);
//       }

//       debounceRef.current = setTimeout(() => {
//         if (value.trim()) {
//           onSearch(value.trim());
//         }
//       }, 600);
//     },
//     [onSearch]
//   );

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     setShowSuggestions(true);
//     debouncedSearch(value);
//   };

//   const handleSuggestionClick = (city) => {
//     setQuery(city);
//     setShowSuggestions(false);
//     onSearch(city);
//   };

//   return (
//     <div className="msn-search-wrapper">
//       <div className="msn-search-box">
//         <input
//           type="text"
//           value={query}
//           placeholder="Search for a city"
//           onChange={handleChange}
//           className="msn-search-input"
//         />
//         <button className="msn-search-btn">🔍</button>
//       </div>

//       {/* ===============================
//           SEARCH SUGGESTIONS
//       =============================== */}
//       {showSuggestions && query && (
//         <ul className="msn-suggestions">
//           {citySuggestions
//             .filter((city) =>
//               city.toLowerCase().includes(query.toLowerCase())
//             )
//             .slice(0, 6)
//             .map((city) => (
//               <li
//                 key={city}
//                 onClick={() => handleSuggestionClick(city)}
//               >
//                 {city}
//               </li>
//             ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchCity;

import React, { useState, useCallback, useRef } from "react";
import "./SearchCity.css";

/* ===============================
   API CONFIG
================================ */
const API_KEY = "4e8a86f79d5484ae4cda8af753e9e97f";

/* ===============================
   FETCH WEATHER
================================ */
const fetchWeatherByCity = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error("City not found");
    return data;
  } catch (err) {
    console.error("Weather API error:", err);
    return null;
  }
};

/* ===============================
   FETCH CITY SUGGESTIONS
================================ */
const fetchCitySuggestions = async (query) => {
  try {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      query
    )}&limit=6&appid=${API_KEY}`;

    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error("City suggestion error:", err);
    return [];
  }
};

const SearchCity = ({ onResult }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debounceRef = useRef(null);

  /* ===============================
     DEBOUNCED INPUT HANDLER
  =============================== */
  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setSuggestions([]);
        return;
      }

      const cities = await fetchCitySuggestions(value);
      setSuggestions(cities);
      setShowSuggestions(true);
    }, 500);
  }, []);

  const handleSearchClick = async () => {
    if (!query.trim()) return;
    setShowSuggestions(false);

    const data = await fetchWeatherByCity(query);
    if (data && onResult) onResult(data);
  };

  const handleSuggestionClick = async (city) => {
    const cityName = `${city.name}${city.state ? ", " + city.state : ""}, ${
      city.country
    }`;

    setQuery(cityName);
    setShowSuggestions(false);

    const data = await fetchWeatherByCity(city.name);
    if (data && onResult) onResult(data);
  };

  return (
    <div className="msn-search-wrapper">
      <div className="msn-search-box">
        <input
          type="text"
          value={query}
          placeholder="Search for a city"
          onChange={handleChange}
          className="msn-search-input"
        />
        <button className="msn-search-btn" onClick={handleSearchClick}>
          🔍
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="msn-suggestions">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSuggestionClick(city)}>
              {city.name}
              {city.state ? `, ${city.state}` : ""}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCity;


