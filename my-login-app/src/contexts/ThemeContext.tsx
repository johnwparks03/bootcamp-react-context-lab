import { type ReactNode, createContext, useContext, useState } from "react";
import { useEffect } from "react";
import type { Theme } from "../shared.types";
import themeService from "../utils/themeService";
import tokenService from "../utils/tokenService";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

type ThemeProviderProps = {
  children: ReactNode;
  theme: Theme;
};

export default function ThemeProvider({
  children,
}: ThemeProviderProps): ReactNode {
  const storageTheme = themeService.getLocalstorageTheme();

  const initTheme: Theme = storageTheme ?? "light";

  const [theme, setTheme] = useState<Theme>(initTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      themeService.setLocalStorageTheme(newTheme);
      return newTheme;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === null || context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
