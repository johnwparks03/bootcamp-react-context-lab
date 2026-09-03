import type { Theme } from "../shared.types";

function setLocalStorageTheme(theme: Theme): void {
  localStorage.setItem("theme", theme);
}

function getLocalstorageTheme(): Theme | null {
  let value = localStorage.getItem("theme");
  
  if (value === "light" || value === "dark") {
    return value;
  }
  return null;
}

export default {
  setLocalStorageTheme,
  getLocalstorageTheme,
};
