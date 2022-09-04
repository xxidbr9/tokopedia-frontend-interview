import React from "react";
import theme from "ui/theme";

const ThemeContext = React.createContext({
  theme,
});

const ThemeProvider = ({ children }: any) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };