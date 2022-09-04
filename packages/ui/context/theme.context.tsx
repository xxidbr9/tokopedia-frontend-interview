import React from "react";
import defaultTheme from "../theme";

const ThemeContext = React.createContext({
  theme: defaultTheme,
  setTheme: (theme: typeof defaultTheme) => { }
});

const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = React.useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };