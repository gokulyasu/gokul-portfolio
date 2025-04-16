
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="fixed right-4 top-4 z-50 rounded-full p-2 glass-card transition-all duration-300 hover:scale-110"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-neon-yellow animate-pulse-glow" />
      ) : (
        <Moon className="h-6 w-6 text-neon-blue" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
