import { useEffect, useState } from "react";
import { DEMO_CLIENTS, type ClientUser } from "./client-data";

const KEY = "score_client_user";

export function getClient(): ClientUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setClient(c: ClientUser | null) {
  if (typeof window === "undefined") return;
  if (c) localStorage.setItem(KEY, JSON.stringify(c));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("score_client_change"));
}

export function useClient() {
  const [client, setState] = useState<ClientUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const current = getClient() ?? DEMO_CLIENTS[0];
    setState(current);
    setHydrated(true);
    const handler = () => setState(getClient());
    window.addEventListener("score_client_change", handler);
    return () => window.removeEventListener("score_client_change", handler);
  }, []);
  return { client, hydrated };
}
