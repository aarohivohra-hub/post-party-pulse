"use client";

import { useState } from "react";
import { HostViewTabs } from "./HostViewTabs";

export interface ReflectionFormData {
  energyRating: number;
  wouldHostAgain: boolean;
  privateNotes?: string;
}

const PROMPT_PILLS = [
  "What made tonight special?",
  "A moment that made you smile...",
  "Something you'd do again...",
];

export function ReflectionForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (data: ReflectionFormData) => void;
  isSubmitting: boolean;
}) {
  const [energy, setEnergy] = useState(0);
  const [wouldHostAgain, setWouldHostAgain] = useState<boolean | null>(null);
  const [notes, setNotes] = useState("");

  const addPrompt = (text: string) => {
    setNotes((prev) => (prev ? `${prev} ${text}` : text));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (energy < 1 || energy > 5 || wouldHostAgain === null) return;
    onSubmit({
      energyRating: energy,
      wouldHostAgain,
      privateNotes: notes.trim() || undefined,
    });
  };

  const canSubmit = energy >= 1 && energy <= 5 && wouldHostAgain !== null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <HostViewTabs />
      <div className="rounded-2xl bg-partiful-card border border-partiful-border p-6">
        <h2 className="font-sans text-lg font-medium text-partiful-text-primary">
          ✨ Capture the moment
        </h2>
        <p className="font-sans text-sm text-partiful-text-muted mt-1">
          Jot down a private note about your event. Only you can see this.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {PROMPT_PILLS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => addPrompt(label)}
              className="font-sans text-sm px-3 py-1.5 rounded-full bg-partiful-bg-elevated text-partiful-text-secondary hover:bg-partiful-border transition"
            >
              {label}
            </button>
          ))}
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tonight was..."
          rows={4}
          className="mt-4 w-full rounded-xl bg-partiful-bg border border-partiful-border px-4 py-3 font-sans text-sm text-partiful-text-primary placeholder-partiful-text-muted focus:outline-none focus:ring-2 focus:ring-partiful-accent/50"
        />

        <p className="font-sans text-xs text-partiful-text-muted mt-2 flex items-center gap-1">
          <span aria-hidden>🔒</span> Private to you
        </p>

        <div className="mt-4 pt-4 border-t border-partiful-border space-y-3">
          <div>
            <span className="font-sans text-xs text-partiful-text-muted">Energy (1–5): </span>
            <div className="inline-flex gap-1 ml-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setEnergy(n)}
                  className={`w-8 h-8 rounded-full text-xs font-sans font-medium transition ${
                    energy === n
                      ? "bg-partiful-accent text-white"
                      : "bg-partiful-bg-elevated text-partiful-text-muted hover:bg-partiful-border"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="font-sans text-xs text-partiful-text-muted">Would you host again? </span>
            <button
              type="button"
              onClick={() => setWouldHostAgain(true)}
              className={`ml-2 px-2 py-1 rounded text-xs font-sans ${wouldHostAgain === true ? "bg-partiful-accent/15 text-partiful-accent" : "bg-partiful-bg-elevated text-partiful-text-muted"}`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setWouldHostAgain(false)}
              className={`ml-1 px-2 py-1 rounded text-xs font-sans ${wouldHostAgain === false ? "bg-partiful-border text-partiful-text-primary" : "bg-partiful-bg-elevated text-partiful-text-muted"}`}
            >
              Not sure
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 py-3 px-4 rounded-xl border border-partiful-border text-partiful-text-primary font-sans font-medium"
          >
            Skip
          </button>
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="flex-1 py-3 px-4 rounded-xl bg-partiful-accent text-white font-sans font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition"
          >
            {isSubmitting ? "Saving…" : "Save Reflection"}
          </button>
        </div>
      </div>
    </form>
  );
}
