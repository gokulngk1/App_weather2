// import React from "react";
// import "./Theme.css";

// const Theme = ({ theme, setTheme }) => {
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   return (
//     <button
//       className="toggle-btn theme-toggle"
//       onClick={toggleTheme}
//     >
//       Theme
//     </button>
//   );
// };

// export default Theme;


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

