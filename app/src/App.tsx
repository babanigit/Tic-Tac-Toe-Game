// will add themeChanger
import { useState, createContext } from "react";
import { ThemeProvider } from "styled-components";
import { themes } from "./assets/theme";

import SCconnect from "./App2";
import React from "react";

interface SetThemeContextType {
  (value: string): void;
}
export const SetThemeContext = createContext<SetThemeContextType>(() => {});

const App = () => {
  const [themeState, setThemeState] = useState<string>("dark");

  return (
    <>
      <ThemeProvider theme={themes[themeState]}>
        <SetThemeContext.Provider value={setThemeState}>
          <SCconnect theme={themes[themeState]} />
        </SetThemeContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
