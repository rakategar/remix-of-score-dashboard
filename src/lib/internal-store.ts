import { useEffect, useState } from "react";
import { DEMO_STAFF, type StaffUser } from "./internal-data";

const KEY = "score_internal_user";

export function getStaff(): StaffUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStaff(s: StaffUser | null) {
  if (typeof window === "undefined") return;
  if (s) localStorage.setItem(KEY, JSON.stringify(s));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("score_internal_change"));
}

export function useStaff() {
  const [staff, setState] = useState<StaffUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const current = getStaff() ?? DEMO_STAFF[0];
    setState(current);
    setHydrated(true);
    const handler = () => setState(getStaff());
    window.addEventListener("score_internal_change", handler);
    return () => window.removeEventListener("score_internal_change", handler);
  }, []);
  return { staff, hydrated };
}
