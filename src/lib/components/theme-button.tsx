import { MoonIcon as MoonOutlineIcon } from "@heroicons/react/outline";
import { MoonIcon as MoonSolidIcon } from "@heroicons/react/solid";
import { useEffect, useLayoutEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const THEME_KEY = "countries.theme";

const ThemeButton = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  function toggleTheme(state?: ThemeMode) {
    if (state) {
      localStorage.setItem(THEME_KEY, state);
      setThemeMode(state);
    } else {
      setThemeMode((prev) => {
        const newState = prev === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, newState);
        return newState;
      });
    }
  }

  useEffect(() => {
    if (themeMode == "dark") {
      document.body.classList.add(themeMode);
    } else {
      document.body.removeAttribute("class");
    }
  }, [themeMode]);

  useLayoutEffect(() => {
    const storedMode = localStorage.getItem(THEME_KEY);
    if (storedMode) setThemeMode(storedMode as ThemeMode);
  }, []);

  return (
    <button
      type="button"
      className="text-sm font-semibold flex gap-1 items-center"
      onClick={() => toggleTheme()}
    >
      {themeMode === "light" ? (
        <MoonOutlineIcon className="h-4 w-4 inline mr-1" />
      ) : (
        <MoonSolidIcon className="h-4 w-4 inline mr-1" />
      )}
      <span>Dark Mode</span>
    </button>
  );
};

export default ThemeButton;
