"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLastPulseSummary } from "@/lib/store";
import type { PulseSummary } from "@/lib/types";
import { Toast } from "@/components/Toast";

function ConfirmContent() {
  const router = useRouter();
  const [summary, setSummary] = useState<PulseSummary | null>(null);
  const [toastVisible, setToastVisible] = useState(true);

  useEffect(() => {
    setSummary(getLastPulseSummary());
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setToastVisible(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!summary) {
    return (
      <div className="min-h-screen bg-partiful-bg flex items-center justify-center p-6">
        <div className="skeleton w-64 h-48 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-partiful-bg p-6">
      <div className="rounded-2xl bg-partiful-card border border-partiful-border p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-partiful-accent/20 flex items-center justify-center mx-auto mb-4 text-partiful-accent text-2xl">
          ✓
        </div>
        <h1 className="font-display text-xl font-bold text-partiful-text-primary">You’re all set</h1>
        <p className="font-sans text-partiful-text-muted mt-2 text-sm">
          Your pulse is saved. Here’s a quick look at how it went.
        </p>

        <div className="mt-6 text-left rounded-xl bg-partiful-bg border border-partiful-border p-4">
          <p className="font-display font-bold text-partiful-text-primary">{summary.eventTitle}</p>
          <p className="font-sans text-xs text-partiful-text-muted mt-1">{summary.eventDate}</p>
          <p className="font-sans text-sm text-partiful-text-secondary mt-2">{summary.socialSignalSummary}</p>
          <p className="font-sans text-sm text-partiful-text-muted mt-2">{summary.vibeSummary}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={`/event/${summary.eventId}/recap`}
            className="block w-full py-3.5 px-4 rounded-xl bg-partiful-accent text-white font-sans font-medium text-center hover:opacity-95 transition"
          >
            View recap
          </Link>
          <Link
            href="/insights"
            className="block w-full py-3 px-4 rounded-xl border border-partiful-border text-partiful-text-primary font-sans font-medium text-center"
          >
            View insights
          </Link>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="block w-full py-2 text-sm text-partiful-text-muted"
          >
            Back to home
          </button>
        </div>
      </div>
      <Toast message="Pulse saved!" visible={toastVisible} />
    </div>
  );
}

export default function ConfirmPage() {
  return <ConfirmContent />;
}
