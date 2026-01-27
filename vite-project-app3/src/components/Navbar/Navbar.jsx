import React from "react";
import "./Navbar.css";

import SearchCity from "../Search/SearchCity";
import MajorCity from "./MajorCity/MajorCity";
import Theme from "./Theme/Theme";
import UnitToggle from "./UnitToggle/UnitToggle";


const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">

  {/* LEFT SIDE */}
  <div className="navbar-left">
    <SearchCity onResult={onSearch} />
    <MajorCity onSearch={onSearch} />
  </div>

  {/* RIGHT SIDE */}
  <div className="toggles-group">
    <Theme />
    <UnitToggle />
  </div>

</nav>
  );
};

export default Navbar;
