"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLastPulseSummary } from "@/lib/store";
import type { PulseSummary } from "@/lib/types";
import { logEvent } from "@/lib/analytics";

export default function CreateEventPage() {
  const [lastPulse, setLastPulse] = useState<PulseSummary | null>(null);
  const [resurfaceViewed, setResurfaceViewed] = useState(false);

  useEffect(() => {
    setLastPulse(getLastPulseSummary());
  }, []);

  useEffect(() => {
    if (lastPulse && !resurfaceViewed) {
      logEvent("resurfaced_viewed", { eventId: lastPulse.eventId });
      setResurfaceViewed(true);
    }
  }, [lastPulse, resurfaceViewed]);

  const handleRepeatIntent = () => {
    logEvent("host_repeat_intent_clicked");
  };

  return (
    <div className="min-h-screen bg-partiful-bg p-6">
      <header className="mb-6">
        <Link href="/" className="font-sans text-sm text-partiful-text-muted hover:text-partiful-text-primary">← Back</Link>
        <h1 className="font-display text-xl font-bold text-partiful-text-primary mt-2">Create new event</h1>
      </header>

      {lastPulse && (
        <div className="mb-6 rounded-2xl bg-partiful-card border border-partiful-border p-4">
          <p className="font-sans text-xs font-medium text-partiful-text-muted uppercase tracking-wide">Last time</p>
          <p className="font-display font-bold text-partiful-text-primary mt-1">{lastPulse.eventTitle}</p>
          <p className="font-sans text-xs text-partiful-text-muted mt-1">{lastPulse.eventDate}</p>
          <p className="font-sans text-sm text-partiful-text-secondary mt-2">{lastPulse.socialSignalSummary}</p>
          <button
            type="button"
            onClick={handleRepeatIntent}
            className="mt-3 font-sans text-sm font-medium text-partiful-accent hover:underline"
          >
            Use similar vibe →
          </button>
        </div>
      )}

      <div className="rounded-2xl bg-partiful-card border border-partiful-border p-6">
        <p className="font-sans text-sm text-partiful-text-muted">Event creation form would go here (out of scope for this MVP).</p>
        <Link href="/" className="inline-block mt-3 font-sans text-partiful-accent font-medium text-sm">Back to home</Link>
      </div>
    </div>
  );
}
