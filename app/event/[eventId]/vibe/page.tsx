"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { GuestViewTabs } from "@/components/GuestViewTabs";
import { getEventEnded } from "@/lib/store";

const VIBE_OPTIONS = [
  { value: "blast", label: "Blast!", emoji: "🎉" },
  { value: "magical", label: "Magical", emoji: "✨" },
  { value: "so-fun", label: "So fun", emoji: "💕" },
  { value: "loved-it", label: "Loved it", emoji: "🫶" },
] as const;

/**
 * Guest vibe check: one-tap, optional, anonymous. Matches UI design.
 */
export default function GuestVibePage() {
  const params = useParams();
  const router = useRouter();
  const event = getEventEnded();
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSendVibe = () => {
    if (!selectedVibe) return;
    setSubmitting(true);
    // Mock: would POST to backend
    setTimeout(() => {
      router.push(`/event/${params.eventId}/vibe/thanks`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-partiful-bg p-6">
      <GuestViewTabs />
      <div className="rounded-2xl bg-partiful-card border border-partiful-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-partiful-accent text-lg">✦</span>
          <h1 className="font-display text-sm font-bold text-partiful-accent uppercase tracking-wide">
            Vibe Check
          </h1>
        </div>

        <h2 className="font-display text-xl font-bold text-partiful-text-primary mb-1">
          How was {event.title}?
        </h2>
        <p className="font-sans text-sm text-partiful-text-muted mb-6">
          One tap to share the vibe with {event.hostId === "host-1" ? "Alex" : "the host"}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {VIBE_OPTIONS.map(({ value, label, emoji }) => (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedVibe(value)}
              className={`py-4 px-3 rounded-xl transition ${
                selectedVibe === value
                  ? "bg-partiful-accent text-white"
                  : "bg-partiful-bg-elevated text-partiful-text-muted"
              }`}
            >
              <div className="text-2xl mb-1">{emoji}</div>
              <div className="font-sans text-sm font-medium">{label}</div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSendVibe}
          disabled={!selectedVibe || submitting}
          className="w-full py-3.5 px-4 rounded-xl bg-partiful-accent text-white font-sans font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition mb-3"
        >
          {submitting ? "Sending..." : "Send Vibe"}
        </button>

        <p className="font-sans text-xs text-partiful-text-muted text-center">
          Anonymous · Only the host sees this
        </p>
      </div>
    </div>
  );
}
