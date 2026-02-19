"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ReflectionForm } from "@/components/ReflectionForm";
import { getEventById, submitPulse } from "@/lib/store";
import { MOCK_GUEST_VIBES } from "@/lib/mockData";
import { logEvent } from "@/lib/analytics";

/**
 * Event-scoped reflection: guided sub-flow from recap. On save → back to recap or insights.
 */
export default function EventReflectPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  const event = getEventById(eventId);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (data: {
    energyRating: number;
    wouldHostAgain: boolean;
    privateNotes?: string;
  }) => {
    if (!event) return;
    setSubmitting(true);
    logEvent("pulse_submitted", { eventId: event.id });
    submitPulse(event.id, {
      hostReflection: data,
      guestVibes: MOCK_GUEST_VIBES,
    });
    setSubmitting(false);
    router.push(`/event/${eventId}/recap?reflected=1`);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-partiful-bg p-6">
        <p className="text-partiful-text-muted">Event not found.</p>
        <Link href="/" className="mt-4 text-partiful-accent text-sm">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-partiful-bg p-6 pb-24">
      <header className="mb-4">
        <Link
          href={`/event/${eventId}/recap`}
          className="text-partiful-text-muted text-sm"
        >
          ← Back to recap
        </Link>
        <h1 className="font-display text-xl font-bold text-partiful-text-primary mt-2">
          {event.title}
        </h1>
        <p className="font-sans text-sm text-partiful-text-muted mt-1">
          Capture the moment
        </p>
      </header>

      <ReflectionForm onSubmit={handleSubmit} isSubmitting={submitting} />
    </div>
  );
}
