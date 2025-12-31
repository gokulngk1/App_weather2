// import React from "react";
// import "./UnitToggle.css";

// const UnitToggle = ({ unit, setUnit }) => {
//   const toggleUnit = () => {
//     setUnit((prev) => (prev === "C" ? "F" : "C"));
//   };

//   return (
//     <button className="toggle-btn" onClick={toggleUnit}>
//       {unit === "C" ? "Switch to °F" : "Switch to °C"}
//     </button>
//   );
// };

// export default UnitToggle;


import "./UnitToggle.css";
import { useUnit } from "../../../context/UnitContext";

const UnitToggle = () => {
  const { unit, toggleUnit } = useUnit(); // ✅ from context

  return (
    <button className="unit-toggle" onClick={toggleUnit}>
      Switch to °{unit === "C" ? "F" : "C"}
    </button>
  );
};

export default UnitToggle;
