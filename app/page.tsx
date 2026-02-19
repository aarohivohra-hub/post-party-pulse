"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEventEnded, getPulseForEvent } from "@/lib/store";
import { EventCardImage } from "@/components/EventCardImage";

export default function HomePage() {
  const event = getEventEnded();
  const [hasRecap, setHasRecap] = useState(false);

  useEffect(() => {
    setHasRecap(!!getPulseForEvent(event.id));
  }, [event.id]);

  const eventDate = new Date(event.endAt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const eventTime = new Date(event.endAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-partiful-bg text-partiful-text-primary">
      {/* Partiful-style header */}
      <header className="px-4 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/partiful-logo.png"
            alt="Partiful"
            className="h-7 w-auto"
          />
          <span className="text-partiful-text-secondary text-sm font-medium">Partiful</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-partiful-text-secondary" aria-hidden>🔔</span>
          <span className="text-partiful-text-secondary" aria-hidden>💬</span>
        </div>
      </header>

      {/* Tabs: Upcoming / Hosting */}
      <div className="px-4 mb-6">
        <div className="inline-flex rounded-full bg-partiful-card border border-partiful-border p-1 gap-1">
          <span className="px-4 py-2 rounded-full text-sm font-medium text-partiful-text-secondary">
            Upcoming 0
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-partiful-text-primary text-partiful-bg">
            Hosting 1
          </span>
        </div>
      </div>

      {/* Past event (Hosting tab): tap opens Post-Event Recap */}
      <section className="px-4">
        <h2 className="text-lg font-bold text-partiful-text-primary mb-3">Past events</h2>
        <Link
          href={`/event/${event.id}/recap`}
          className="block rounded-2xl bg-partiful-card border border-partiful-border overflow-hidden hover:bg-partiful-card-hover transition"
        >
          <div className="flex">
            <div className="w-28 h-32 flex-shrink-0 overflow-hidden">
              <EventCardImage className="w-full h-full" />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-partiful-bg-elevated text-partiful-text-secondary text-xs font-medium mb-2">
                  {eventDate} · {eventTime}
                </span>
                <h3 className="font-bold text-partiful-text-primary text-base truncate">
                  {event.title.toUpperCase()}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5 text-partiful-text-muted text-xs">
                  <span>👑</span>
                  <span>Hosting</span>
                  <span className="text-partiful-text-muted/70">· Ended</span>
                </div>
              </div>
              <p className="text-partiful-accent text-sm font-medium mt-2">
                {hasRecap ? "View recap →" : "Post-Event Recap →"}
              </p>
            </div>
            <div className="p-2 self-center text-partiful-text-muted">⋯</div>
          </div>
        </Link>
      </section>

      {/* Get inspo / Create event */}
      <section className="px-4 mt-6">
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 py-3 px-4 rounded-xl bg-partiful-card border border-partiful-border text-partiful-text-secondary text-sm font-medium"
          >
            🔮 Get inspo
          </button>
          <Link
            href="/create-event"
            className="flex-1 py-3 px-4 rounded-xl bg-partiful-card border border-partiful-border text-partiful-text-primary text-sm font-medium text-center"
          >
            ➕ Create event
          </Link>
        </div>
      </section>

      {/* Bottom CTA card - New event (Partiful-style) */}
      <section className="px-4 mt-8 pb-8">
        <div className="rounded-2xl bg-partiful-gradient border border-partiful-border p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold text-partiful-text-primary text-base">New event</p>
              <p className="text-partiful-text-secondary text-sm mt-0.5">Collect RSVPs</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-partiful-accent/20 flex items-center justify-center text-2xl">
              +
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
