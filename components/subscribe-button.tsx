"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/components/subscription-provider";

export function SubscribeButton({
  showUnsubscribe,
  refreshOnSubscribe,
}: {
  showUnsubscribe?: boolean;
  refreshOnSubscribe?: boolean;
} = {}) {
  const { subscribed, toggle } = useSubscription();
  const router = useRouter();

  const label = subscribed
    ? showUnsubscribe ? "Unsubscribe" : "Subscribed ✓"
    : "Subscribe";

  function handleClick() {
    toggle();
    if (refreshOnSubscribe && !subscribed) {
      router.refresh();
    }
  }

  return (
    <Button
      variant={subscribed ? (showUnsubscribe ? "destructive" : "secondary") : "outline"}
      size={showUnsubscribe ? "sm" : "default"}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}
