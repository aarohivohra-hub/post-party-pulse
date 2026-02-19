"use client";

import { HostViewTabs } from "./HostViewTabs";

/**
 * Post-event prompt — Partiful dark surface. "See Your Party Pulse" → Recap.
 */
export function PulsePromptModal({
  eventTitle,
  onStart,
  onSkip,
}: {
  eventTitle: string;
  onStart: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="w-full max-w-sm">
      <HostViewTabs />
      <div className="relative rounded-2xl bg-partiful-gradient border border-partiful-border p-6 text-center">
        <span className="absolute top-4 right-4 text-partiful-text-muted text-lg leading-none cursor-pointer" aria-label="Close">×</span>
        <span className="absolute top-4 left-4 text-lg" aria-hidden>✨</span>

        <div className="w-14 h-14 rounded-full bg-partiful-accent/20 flex items-center justify-center mx-auto mb-4 text-partiful-accent text-2xl">
          🎉
        </div>
        <h2 className="font-display text-xl font-bold text-partiful-text-primary">
          {eventTitle} wrapped!
        </h2>
        <p className="font-sans text-sm text-partiful-text-muted mt-2">
          You brought people together. See how your party landed!
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onStart}
            className="relative w-full py-3.5 px-4 rounded-xl bg-partiful-accent text-white font-sans font-medium hover:opacity-95 transition"
          >
            See Your Party Pulse
            <span className="absolute -bottom-0.5 -right-0.5 text-base" aria-hidden>🎈</span>
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="font-sans text-sm text-partiful-text-muted hover:text-partiful-text-primary"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
