export const themes = [
  { id: "lime", name: "Lime", label: "لیمویی" },
  { id: "orange", name: "Orange", label: "نارنجی" },
  { id: "cherry", name: "Cherry", label: "آلبالویی" },
  { id: "blue", name: "Blue", label: "آبی" },
] as const;

export type Theme = (typeof themes)[number]["id"];

export const themeStorageKey = "theme";

export function readPreference(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function savePreference(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Keep appearance controls usable when browser storage is unavailable.
  }
}

export function getSavedTheme(): Theme {
  const saved = readPreference(themeStorageKey);
  return themes.find((theme) => theme.id === saved)?.id ?? "blue";
}
