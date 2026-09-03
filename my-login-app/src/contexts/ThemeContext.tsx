import { type ReactNode, createContext, useContext, useState } from "react";
import { useEffect } from "react";

type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

type ThemeProviderProps = {
  children: ReactNode;
  theme: ThemeType;
};

export default function ThemeProvider({
  children,
}: ThemeProviderProps): ReactNode {
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
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
