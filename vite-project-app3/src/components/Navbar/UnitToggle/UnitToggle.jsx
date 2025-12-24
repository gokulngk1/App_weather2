// import React from "react";
// import "./UnitToggle.css";

// const UnitToggle = ({ unit, setUnit }) => {
//   const toggleUnit = () => {
//     setUnit((prev) => (prev === "F" ? "C" : "F"));
//   };

//   return (
//     <button className="toggle-btn" onClick={toggleUnit}>
//       {unit}
//     </button>
//   );
// };

// export default UnitToggle;

import React from "react";
import "./UnitToggle.css";

const UnitToggle = ({ unit, setUnit }) => {
  const toggleUnit = () => {
    // This updates the state in WeatherDisplay
    setUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  return (
    <button className="toggle-btn" onClick={toggleUnit}>
      {unit} 
    </button>
  );
};

export default UnitToggle;
