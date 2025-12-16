
import React, { useState } from 'react';
import "./Navbar.css";
import { fetchWeatherByCity } from '../../api/weatherApi';
import SearchCity from '../Search/SearchCity';
import MajorCity from './MajorCity/Majorcity';

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const [unit, setUnit] = useState('F');

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      onSearch(searchQuery);
    }
  };

  console.log(fetchWeatherByCity("Chennai"));

  return (
    <nav className="navbar">
      {/* Search */}
       <SearchCity/>
    

        {/* Static Weather Info */}
    <MajorCity />
      
    
{/* Toggles */}
      <div className="navbar-group toggles-group ">
        <button 
          className={`toggle-btn theme-toggle`}
        >
          Theme
        </button>

        <button 
          className={`toggle-btn unit-toggle`}
        >
          {unit}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
