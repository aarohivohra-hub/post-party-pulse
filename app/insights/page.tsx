"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHostInsights } from "@/lib/store";
import type { HostInsight, HostInsightType } from "@/lib/types";
import { logEvent } from "@/lib/analytics";

const TYPE_LABELS: Record<HostInsightType, string> = {
  pattern: "Pattern",
  signal: "Signal",
  learning: "Learning",
};

const TYPE_EMOJI: Record<HostInsightType, string> = {
  pattern: "📊",
  signal: "✨",
  learning: "💡",
};

export default function InsightsPage() {
  const [insights, setInsights] = useState<HostInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    logEvent("insight_viewed");
    setInsights(getHostInsights());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-partiful-bg p-6">
        <header className="mb-6">
          <h1 className="font-display text-xl font-bold text-partiful-text-primary">Insights</h1>
          <p className="font-sans text-sm text-partiful-text-muted mt-1">What you’re learning as a host</p>
        </header>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (insights.length === 0) {
    return (
      <div className="min-h-screen bg-partiful-bg p-6">
        <header className="mb-6">
          <Link href="/" className="font-sans text-sm text-partiful-text-muted hover:text-partiful-text-primary">← Back</Link>
          <h1 className="font-display text-xl font-bold text-partiful-text-primary mt-2">Insights</h1>
          <p className="font-sans text-sm text-partiful-text-muted mt-1">What you’re learning as a host</p>
        </header>
        <div className="rounded-2xl bg-partiful-card border border-partiful-border p-8 text-center">
          <p className="font-sans text-partiful-text-muted text-sm">No insights yet.</p>
          <p className="font-sans text-partiful-text-muted/80 text-xs mt-1">Reflect on your events to see patterns and learnings.</p>
          <Link href="/" className="inline-block mt-4 font-sans text-partiful-accent font-medium text-sm">Back to home</Link>
        </div>
      </div>
    );
  }

  const byType = {
    pattern: insights.filter((i) => i.type === "pattern"),
    signal: insights.filter((i) => i.type === "signal"),
    learning: insights.filter((i) => i.type === "learning"),
  };

  return (
    <div className="min-h-screen bg-partiful-bg p-6 pb-24">
      <header className="mb-6">
        <Link href="/" className="font-sans text-sm text-partiful-text-muted hover:text-partiful-text-primary">← Back</Link>
        <h1 className="font-display text-xl font-bold text-partiful-text-primary mt-2">Insights</h1>
        <p className="font-sans text-sm text-partiful-text-muted mt-1">What you’re learning about yourself as a host</p>
      </header>

      <div className="space-y-8">
        {(Object.keys(byType) as HostInsightType[]).map((type) => {
          const list = byType[type];
          if (list.length === 0) return null;
          return (
            <section key={type}>
              <h2 className="text-sm font-semibold text-partiful-text-secondary uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>{TYPE_EMOJI[type]}</span>
                {TYPE_LABELS[type]}s
              </h2>
              <ul className="space-y-3">
                {list.map((insight) => (
                  <li
                    key={insight.id}
                    className="rounded-2xl bg-partiful-card border border-partiful-border p-4"
                  >
                    <p className="font-sans font-medium text-partiful-text-primary">
                      {insight.title}
                    </p>
                    {insight.description && (
                      <p className="font-sans text-sm text-partiful-text-secondary mt-1">
                        {insight.description}
                      </p>
                    )}
                    <p className="font-sans text-xs text-partiful-text-muted mt-2">
                      Seen in: {insight.seenInEventTitles.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
