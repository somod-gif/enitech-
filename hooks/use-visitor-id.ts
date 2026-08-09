import { useSyncExternalStore } from "react";

const VISITOR_KEY = "enitech-visitor-id";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return window.localStorage.getItem(VISITOR_KEY) ?? "";
}

function getServerSnapshot() {
  return "";
}

export function useVisitorId() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (stored) return stored;

  const id = crypto.randomUUID();
  try {
    window.localStorage.setItem(VISITOR_KEY, id);
  } catch {
    return "";
  }
  return id;
}