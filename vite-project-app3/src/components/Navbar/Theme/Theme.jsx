import React from "react";
import "./Theme.css";

const Theme = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      className="toggle-btn theme-toggle"
      onClick={toggleTheme}
    >
      Theme
    </button>
  );
};

export default Theme;
