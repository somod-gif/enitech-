"use client";

import { createContext, useContext, type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeContext = createContext<boolean>(true);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="enitech-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

export function useIsDark() {
  return useContext(ThemeContext);
}