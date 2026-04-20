import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      data-testid="button-theme-toggle"
      className="w-9 h-9 rounded-lg flex items-center justify-center border text-joe-text/50 hover:text-joe-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48F2FB]/50"
      style={{
        background: "var(--joe-overlay)",
        borderColor: "var(--joe-card-border)",
      }}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}
