import { createContext, useContext, useState } from "react";

const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState("C");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <UnitContext.Provider value={{ unit, setUnit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => useContext(UnitContext);
