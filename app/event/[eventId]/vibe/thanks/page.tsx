"use client";

import { GuestViewTabs } from "@/components/GuestViewTabs";
import { getEventEnded } from "@/lib/store";

/**
 * Guest thank you / confirmation page after submitting vibe.
 */
export default function GuestThanksPage() {
  const event = getEventEnded();
  const hostName = event.hostId === "host-1" ? "Alex" : "the host";

  return (
    <div className="min-h-screen bg-partiful-bg p-6">
      <GuestViewTabs />
      <div className="rounded-2xl bg-partiful-gradient border border-partiful-border p-8 text-center">
        <div className="mb-4">
          <span className="text-2xl">✨</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-partiful-text-primary mb-2">
          Thanks for sharing the love!
        </h1>
        <p className="font-sans text-base text-partiful-text-secondary">
          Your feedback means the world to {hostName} <span className="text-partiful-accent">💜</span>
        </p>
      </div>
    </div>
  );
}
