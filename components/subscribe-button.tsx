"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/components/subscription-provider";
import { toggleSubscription } from "@/app/actions";

export function SubscribeButton({
  showUnsubscribe,
  refreshOnToggle,
}: {
  showUnsubscribe?: boolean;
  refreshOnToggle?: boolean;
} = {}) {
  const { subscribed, setSubscribed } = useSubscription();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const label = isPending
    ? "Loading…"
    : subscribed
      ? showUnsubscribe ? "Unsubscribe" : "Subscribed ✓"
      : "Subscribe";

  function handleClick() {
    startTransition(async () => {
      const next = await toggleSubscription();
      setSubscribed(next);
      if (refreshOnToggle) {
        router.refresh();
      }
    });
  }

  return (
    <Button
      variant={subscribed ? (showUnsubscribe ? "destructive" : "secondary") : "outline"}
      size={showUnsubscribe ? "sm" : "default"}
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {label}
    </Button>
  );
}
