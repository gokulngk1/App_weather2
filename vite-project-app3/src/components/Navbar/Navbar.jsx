
// import React, { useState } from 'react';
// import "./Navbar.css";
// import { fetchWeatherByCity } from '../../api/weatherApi';
// import SearchCity from '../Search/SearchCity';
// import MajorCity from './MajorCity/Majorcity';

// const Navbar = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState('dark');
//   const [unit, setUnit] = useState('F');

//   const handleSearchClick = () => {
//     if (searchQuery.trim() !== "") {
//       onSearch(searchQuery);
//     }
//   };

//   console.log(fetchWeatherByCity("Chennai"));

//   return (
//     <nav className="navbar">
//       {/* Search */}
//        <SearchCity onSearch={onSearch} />
    

//         {/* Static Weather Info */}
//     <MajorCity />
      
    
// {/* Toggles */}
//       <div className="navbar-group toggles-group ">
//         <button 
//           className={`toggle-btn theme-toggle`}
//         >
//           Theme
//         </button>

//         <button 
//           className={`toggle-btn unit-toggle`}
//         >
//           {unit}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";
// import "./Navbar.css";

// import SearchCity from "../Search/SearchCity";
// import MajorCity from "./MajorCity/MajorCity";

// // ✅ CORRECT paths (inside Navbar folder)
// import Theme from "./Theme/Theme";
// import UnitToggle from "./UnitToggle/UnitToggle";

// const Navbar = ({ onSearch }) => {
//   const [theme, setTheme] = useState("dark");
//   const [unit, setUnit] = useState("F");

//   return (
//     <nav className="navbar">
//       {/* Search */}
//       <SearchCity onSearch={onSearch} />

//       {/* Major Cities */}
//       <MajorCity />

//       {/* Toggles */}
//       <div className="navbar-group toggles-group">
//         <Theme theme={theme} setTheme={setTheme} />
//         <UnitToggle unit={unit} setUnit={setUnit} />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import "./Navbar.css";

import SearchCity from "../Search/SearchCity";
import MajorCity from "./MajorCity/MajorCity";
import Theme from "./Theme/Theme";
import UnitToggle from "./UnitToggle/UnitToggle";

const Navbar = ({ onSearch }) => {
  const [theme, setTheme] = useState("dark");
  const [unit, setUnit] = useState("F");

  return (
    // <nav className="navbar">
    //   <SearchCity onSearch={onSearch} />
    //   <MajorCity />
      
    //   <div className="navbar-group toggles-group navbar-toggles justify-space-between">
    //     <Theme theme={theme} setTheme={setTheme} />
    //     <UnitToggle unit={unit} setUnit={setUnit} />
    //   </div>
    // </nav>
    <nav className="navbar">

  {/* LEFT SIDE */}
  <div className="navbar-left">
    <SearchCity onSearch={onSearch} />
    <MajorCity />
  </div>

  {/* RIGHT SIDE */}
  <div className="navbar-group toggles-group">
    <Theme theme={theme} setTheme={setTheme} />
    <UnitToggle unit={unit} setUnit={setUnit} />
  </div>

</nav>

  );
};

export default Navbar;

