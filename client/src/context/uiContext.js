import { string } from "joi";
import React, { useState } from "react";

export const UIContext = React.createContext({
  isLightTheme: null,
  light: null,
  dark: null,
  toggleTheme: () => null,
});

export const UIContextProvider = (props) => {
  const [theme, setTheme] = useState({
    isLightTheme: true,
    light: { ui: "#fff", color: "purple", bg: "white" },
    dark: { ui: "#000", color: "gold", bg: "black" },
  });

  const toggleTheme = () => {
    setTheme((state) => ({ ...state, isLightTheme: !state.isLightTheme }));
  };
  return (
    <UIContext.Provider value={{ ...theme, toggleTheme }}>
      {props.children}
    </UIContext.Provider>
  );
};
