"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

const SubscriptionContext = createContext<{
  subscribed: boolean;
  setSubscribed: (value: boolean) => void;
}>({ subscribed: false, setSubscribed: () => {} });

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSubscribed(getCookie("vercel-daily-subscribed") === "true");
  }, []);

  return (
    <SubscriptionContext value={{ subscribed, setSubscribed }}>
      {children}
    </SubscriptionContext>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
