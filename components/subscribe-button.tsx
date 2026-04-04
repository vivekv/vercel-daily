"use client";

import { Button } from "@/components/ui/button";
import { useSubscription } from "@/components/subscription-provider";

export function SubscribeButton({ showUnsubscribe }: { showUnsubscribe?: boolean } = {}) {
  const { subscribed, toggle } = useSubscription();

  const label = subscribed
    ? showUnsubscribe ? "Unsubscribe" : "Subscribed ✓"
    : "Subscribe";

  return (
    <Button
      variant={subscribed ? (showUnsubscribe ? "destructive" : "secondary") : "outline"}
      size={showUnsubscribe ? "sm" : "default"}
      onClick={toggle}
    >
      {label}
    </Button>
  );
}
