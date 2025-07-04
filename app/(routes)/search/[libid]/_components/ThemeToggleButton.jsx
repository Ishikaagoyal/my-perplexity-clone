
'use client';
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const darkMode = storedTheme === "dark" || (!storedTheme && prefersDark);
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const darkMode = !html.classList.contains("dark");
    html.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    setIsDark(darkMode);
  };

  return (
    <div className="fixed bottom-3 right-4 z-50">
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-accent text-foreground border transition-all"
      >
        {isDark ? (
          <>
            <Sun className="w-4 h-4" />
            
          </>
        ) : (
          <>
            <Moon className="w-4 h-4" />
            
          </>
        )}
      </button>
    </div>
  );
}
