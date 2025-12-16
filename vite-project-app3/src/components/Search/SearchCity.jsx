import React,{useState} from 'react';
import { fetchWeatherByCity } from '../../api/weatherApi';
import"../Navbar/Navbar.css";

const SearchCity = ({onChange})=>{
   const [searchQuery, setSearchQuery] = useState('');

   const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      onSearch(searchQuery);
    }
  };
console.log(fetchWeatherByCity("Chennai"));
    return (
      <div className="navbar-group search-location-group">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <button className="search-icon-btn" onClick={handleSearchClick}>
            🔍
          </button>
        </div>
        </div>
    )
  }

export default SearchCity
