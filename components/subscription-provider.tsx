"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

const SubscriptionContext = createContext<{
  subscribed: boolean;
  toggle: () => void;
}>({ subscribed: false, toggle: () => {} });

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSubscribed(getCookie("vercel-daily-subscribed") === "true");
  }, []);

  const toggle = useCallback(() => {
    setSubscribed((prev) => {
      const next = !prev;
      setCookie("vercel-daily-subscribed", String(next));
      return next;
    });
  }, []);

  return (
    <SubscriptionContext value={{ subscribed, toggle }}>
      {children}
    </SubscriptionContext>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
