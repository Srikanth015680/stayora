"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-36 rounded-full border border-ink-200 bg-surface" />
    );
  }

  return (
    <div
      role="group"
      aria-label="Choose appearance"
      className="flex items-center gap-1 rounded-full border border-ink-200 bg-surface p-1"
    >
      {themes.map(({ value, label, icon: Icon }) => {
        const active = theme === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={`${label} theme`}
            aria-pressed={active}
            title={label}
            className={`flex h-8 w-9 items-center justify-center rounded-full transition ${
              active
                ? "bg-brand-500 text-white"
                : "text-ink-500 hover:bg-ink-100 hover:text-ink-900"
            }`}
          >
            <Icon size={17} />
          </button>
        );
      })}
    </div>
  );
}