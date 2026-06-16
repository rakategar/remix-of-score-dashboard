import { useEffect, useState } from "react";
import { DEMO_USERS } from "./mock-data";

const KEY = "score_user";

export type DemoUser = (typeof DEMO_USERS)[number];

export function getUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setUser(u: DemoUser | null) {
  if (typeof window === "undefined") return;
  if (u) localStorage.setItem(KEY, JSON.stringify(u));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("score_user_change"));
}

export function useUser() {
  const [user, setUserState] = useState<DemoUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setUserState(getUser());
    setHydrated(true);
    const handler = () => setUserState(getUser());
    window.addEventListener("score_user_change", handler);
    return () => window.removeEventListener("score_user_change", handler);
  }, []);
  return { user, hydrated };
}
