"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-scroll";

const SESSION_KEY = "enitech-session-start";
const INTERACTIONS_KEY = "enitech-interactions";

function readInteractions(): number {
  if (typeof window === "undefined") return 0;
  try {
    return Number(window.localStorage.getItem(INTERACTIONS_KEY) ?? 0) || 0;
  } catch {
    return 0;
  }
}

export function useInteractionStats() {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const [sessionMinutes, setSessionMinutes] = useState(0);
  const [interactions, setInteractions] = useState(() => readInteractions());

  useEffect(() => {
    if (!mounted) return;

    let sessionStart = Number(
      window.localStorage.getItem(SESSION_KEY) ?? 0,
    );
    if (!sessionStart) {
      sessionStart = Date.now();
      try {
        window.localStorage.setItem(SESSION_KEY, String(sessionStart));
      } catch {
        /* storage unavailable */
      }
    }

    const tick = () => {
      setSessionMinutes(
        Math.max(0, Math.round((Date.now() - sessionStart) / 60000)),
      );
    };
    tick();
    const interval = window.setInterval(tick, 30000);

    const record = () => {
      setInteractions((previous) => {
        const next = previous + 1;
        try {
          window.localStorage.setItem(INTERACTIONS_KEY, String(next));
        } catch {
          /* storage unavailable */
        }
        return next;
      });
    };

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element &&
      (target.closest("a, button, [role='button'], input, textarea, select, [role='menuitem']") !==
        null);

    const onClick = (event: MouseEvent) => {
      if (isInteractive(event.target)) record();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        isInteractive(event.target)
      ) {
        record();
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted]);

  return {
    ready: mounted,
    sessionMinutes,
    interactions,
    theme: mounted ? (resolvedTheme === "dark" ? "Dark" : "Light") : "Light",
  };
}