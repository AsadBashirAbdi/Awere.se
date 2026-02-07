"use client";

import { ReactNode, useEffect } from "react";
import { sanitizeTheme, getDefaultThemeFromEnv } from "@/lib/theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryTheme = params.get("theme");
    const theme = queryTheme ? sanitizeTheme(queryTheme) : getDefaultThemeFromEnv();

    document.documentElement.dataset.theme = theme;
  }, []);

  return <>{children}</>;
}
