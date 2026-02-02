
import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Sync dark mode class with <html> and localStorage
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleTheme = () => setDark(!dark);

  return (
    <button
      onClick={toggleTheme}
      className={`px-3 py-1 rounded transition-colors duration-200
        ${dark ? "bg-gray-700 text-yellow-300" : "bg-gray-200 text-gray-800"}`}
    >
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
