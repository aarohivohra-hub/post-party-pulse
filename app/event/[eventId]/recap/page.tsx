"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { getEventById, getAllPulseSummaries } from "@/lib/store";
import { getPulseSummary } from "@/lib/mockData";
import type { PulseSummary } from "@/lib/types";
import { Toast } from "@/components/Toast";
import { EventCardImage } from "@/components/EventCardImage";

function RecapContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const eventId = params.eventId as string;
  const event = getEventById(eventId);
  const [summary, setSummary] = useState<PulseSummary | null>(null);
  const [hasReflected, setHasReflected] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (searchParams.get("reflected") === "1") setShowToast(true);
  }, [searchParams]);

  useEffect(() => {
    const t = showToast ? setTimeout(() => setShowToast(false), 2500) : undefined;
    return () => { if (t) clearTimeout(t); };
  }, [showToast]);

  useEffect(() => {
    if (!event) return;
    const summaries = getAllPulseSummaries();
    const forThisEvent = summaries.find((s) => s.eventId === event.id);
    setSummary(forThisEvent ?? getPulseSummary(event, null));
    setHasReflected(!!forThisEvent?.hostReflection);
  }, [event?.id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-partiful-bg flex items-center justify-center p-6">
        <p className="text-partiful-text-muted">Event not found.</p>
        <Link href="/" className="mt-4 text-partiful-accent text-sm">Back to home</Link>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-partiful-bg flex items-center justify-center p-6">
        <div className="skeleton w-full max-w-sm h-80 rounded-2xl" />
      </div>
    );
  }

  const registered = event.inviteCount;
  const saidYes = event.rsvpYesCount;
  const showRate = registered > 0 ? Math.round((saidYes / registered) * 100) : 0;
  const attended = 18; // mock
  const attendedTotal = 24; // mock
  const showRateAttended = attendedTotal > 0 ? Math.round((attended / attendedTotal) * 100) : 0;

  return (
    <div className="min-h-screen bg-partiful-bg text-partiful-text-primary pb-24">
      <header className="px-4 pt-6 pb-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-partiful-text-secondary text-sm font-medium"
        >
          ← Back
        </Link>
        <span className="text-partiful-text-muted text-sm">Post-Event Recap</span>
      </header>

      <div className="px-4 space-y-6">
        {/* Hero: event image + title + one-line signal */}
        <div className="rounded-2xl overflow-hidden bg-partiful-card border border-partiful-border">
          <div className="aspect-[4/3] w-full max-h-44">
            <EventCardImage className="w-full h-full" />
          </div>
          <div className="p-5 bg-partiful-gradient border-t border-partiful-border">
            <h1 className="font-display text-xl font-bold text-partiful-text-primary">
              {event.title}
            </h1>
            <p className="text-partiful-text-secondary mt-1 text-sm">
              {summary.socialSignalSummary}
            </p>
          </div>
        </div>

        {/* Key stats: registered, attended, show rate */}
        <div className="rounded-2xl bg-partiful-card border border-partiful-border p-6">
          <h2 className="text-sm font-semibold text-partiful-text-secondary uppercase tracking-wide mb-4">
            How it went
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-partiful-text-primary">{registered}</p>
              <p className="text-xs text-partiful-text-muted mt-1">registered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-partiful-text-primary">
                {attended}/{attendedTotal}
              </p>
              <p className="text-xs text-partiful-text-muted mt-1">attended</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-partiful-text-primary">{showRateAttended}%</p>
              <p className="text-xs text-partiful-text-muted mt-1">show rate</p>
            </div>
          </div>
          <p className="text-sm text-partiful-text-secondary mt-4 text-center">
            {summary.vibeSummary}
          </p>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          {!hasReflected ? (
            <Link
              href={`/event/${eventId}/reflect`}
              className="block w-full py-4 px-4 rounded-xl bg-partiful-accent text-white font-semibold text-center hover:opacity-95 transition"
            >
              Reflect on this event
            </Link>
          ) : (
            <p className="text-center text-partiful-text-muted text-sm">
              You reflected on this event ✓
            </p>
          )}
          <Link
            href="/insights"
            className="block w-full py-3.5 px-4 rounded-xl bg-partiful-card border border-partiful-border text-partiful-text-primary font-medium text-center hover:bg-partiful-card-hover transition"
          >
            View insights
          </Link>
        </div>
      </div>
      <Toast message="Reflection saved!" visible={showToast} />
    </div>
  );
}

export default function EventRecapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-partiful-bg" />}>
      <RecapContent />
    </Suspense>
  );
}
