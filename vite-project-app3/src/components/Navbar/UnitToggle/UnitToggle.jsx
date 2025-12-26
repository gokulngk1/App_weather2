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

// import React from "react";
// import "./UnitToggle.css";

// const UnitToggle = ({ unit, setUnit }) => {
//     const [unit, setUnit] = useState("C");
  

//   const tempC = weather.main.temp;
//   const tempF = (tempC * 9) / 5 + 32;
//   const toggleUnit = () => {
//     // This updates the state in WeatherDisplay
//     setUnit(unit === "C" ? "F" : "C");
//   };

//   return (
//     {unit === "C"
//           ? `${Math.round(tempC)}°C`
//           : `${Math.round(tempF)}°F`}
//     <button className="toggle-btn" onClick={toggleUnit}>
//       {unit === "C" ? "°F" : "°C"}
//     </button>
//   );
// };

// export default UnitToggle;



import React from "react";
import "./UnitToggle.css";

const UnitToggle = ({ unit, setUnit }) => {
  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <button className="toggle-btn" onClick={toggleUnit}>
      {unit === "C" ? "Switch to °F" : "Switch to °C"}
    </button>
  );
};

export default UnitToggle;

