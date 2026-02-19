/**
 * In-memory store for MVP. Replace with API calls + DB later.
 */

import type { Event, PulseResponse, PulseSummary, HostInsight } from "./types";
import {
  MOCK_EVENT_ENDED,
  MOCK_PULSE_SUMMARY_PAST,
  MOCK_HOST_INSIGHTS,
  getPulseSummary,
  getEventById,
} from "./mockData";

const STORAGE_KEYS = {
  lastPulseSummary: "pulse_last_summary",
  allSummaries: "pulse_all_summaries",
} as const;

/** Event that just ended and is eligible for pulse (demo: evt-1). */
export function getEventEnded(): Event {
  return MOCK_EVENT_ENDED;
}

/** Get event by id (for event-scoped recap/reflect). */
export { getEventById } from "./mockData";

/** Get or set the "last" pulse summary (for resurfacing when creating next event). */
export function getLastPulseSummary(): PulseSummary | null {
  if (typeof window === "undefined") return MOCK_PULSE_SUMMARY_PAST;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.lastPulseSummary);
    return raw ? (JSON.parse(raw) as PulseSummary) : MOCK_PULSE_SUMMARY_PAST;
  } catch {
    return MOCK_PULSE_SUMMARY_PAST;
  }
}

export function setLastPulseSummary(summary: PulseSummary): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.lastPulseSummary, JSON.stringify(summary));
  const all = getAllPulseSummaries();
  const updated = [summary, ...all.filter((s) => s.eventId !== summary.eventId)];
  localStorage.setItem(STORAGE_KEYS.allSummaries, JSON.stringify(updated));
}

/** Whether we have a submitted pulse for this event (from localStorage). */
export function getPulseForEvent(eventId: string): PulseResponse | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.allSummaries);
    const list: PulseSummary[] = raw ? JSON.parse(raw) : [];
    const hasSummary = list.some((s) => s.eventId === eventId);
    if (hasSummary) return { id: `pulse-${eventId}`, eventId, hostId: MOCK_EVENT_ENDED.hostId, guestVibes: [] };
    return null;
  } catch {
    return null;
  }
}

/** Submit pulse for an event (mock: update in-memory + localStorage). */
export function submitPulse(eventId: string, response: Partial<PulseResponse>): PulseSummary {
  const event = getEventById(eventId) ?? getEventEnded();
  const full: PulseResponse = {
    id: `pulse-${eventId}`,
    eventId,
    hostId: event.hostId,
    hostReflection: response.hostReflection,
    guestVibes: response.guestVibes ?? [],
    submittedAt: new Date().toISOString(),
  };
  const summary = getPulseSummary(event, full);
  setLastPulseSummary(summary);
  return summary;
}

/** All summaries for "insights" list. Reads from localStorage or seed. */
export function getAllPulseSummaries(): PulseSummary[] {
  if (typeof window === "undefined") {
    return [MOCK_PULSE_SUMMARY_PAST];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.allSummaries);
    if (raw) {
      const list = JSON.parse(raw) as PulseSummary[];
      return list.sort(
        (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
      );
    }
  } catch {
    // ignore
  }
  return [MOCK_PULSE_SUMMARY_PAST];
}

/** Insight-first list for Insights page (patterns, signals, learnings). */
export function getHostInsights(): HostInsight[] {
  return MOCK_HOST_INSIGHTS;
}
