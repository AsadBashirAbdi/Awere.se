export type Theme = "studio" | "blueprint";

export function sanitizeTheme(value: string | null): Theme {
  if (value === "blueprint") return "blueprint";
  return "studio";
}

export function getDefaultThemeFromEnv(): Theme {
  return sanitizeTheme(process.env.NEXT_PUBLIC_DEFAULT_THEME || null);
}
