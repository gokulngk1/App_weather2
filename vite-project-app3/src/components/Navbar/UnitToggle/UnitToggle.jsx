import React from "react";
import "./UnitToggle.css";

const UnitToggle = ({ unit, setUnit }) => {
  const toggleUnit = () => {
    setUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  return (
    <button className="toggle-btn" onClick={toggleUnit}>
      {unit}
    </button>
  );
};

export default UnitToggle;


// import React from "react";
// import "./UnitToggle.css";

// const UnitToggle = ({ unit, setUnit }) => {
//   return (
//     <button
//       className="unit-toggle"
//       onClick={() => setUnit(unit === "C" ? "F" : "C")}
//     >
//       Switch to °{unit === "C" ? "F" : "C"}
//     </button>
//   );
// };

// export default UnitToggle;


