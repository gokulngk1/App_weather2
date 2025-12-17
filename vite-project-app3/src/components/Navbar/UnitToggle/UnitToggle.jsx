import React from "react";
import "./UnitToggle.css";

const UnitToggle = ({ unit, setUnit }) => {
  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <button
      className="toggle-btn unit-toggle"
      onClick={toggleUnit}
    >
      {unit}
    </button>
  );
};

export default UnitToggle;
