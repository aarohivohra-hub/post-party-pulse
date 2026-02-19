/**
 * Mock data and generators for Post-Party Pulse MVP.
 * No backend; in-memory / localStorage only.
 */

import type {
  Event,
  Host,
  Attendee,
  PulseResponse,
  PulseSummary,
  GuestVibeFeedback,
  HostReflection,
  HostInsight,
} from "./types";

// ---- Seeded data ----
export const MOCK_HOST: Host = {
  id: "host-1",
  name: "Alex",
};

export const MOCK_ATTENDEES: Attendee[] = [
  { id: "att-1", name: "Jordan", eventId: "evt-1" },
  { id: "att-2", name: "Sam", eventId: "evt-1" },
  { id: "att-3", name: "Riley", eventId: "evt-1" },
  { id: "att-4", name: "Casey", eventId: "evt-1" },
  { id: "att-5", name: "Morgan", eventId: "evt-1" },
];

/** Event that just ended (used to trigger pulse). */
export const MOCK_EVENT_ENDED: Event = {
  id: "evt-1",
  hostId: MOCK_HOST.id,
  title: "Summer Rooftop Hangout",
  startAt: "2025-02-10T18:00:00Z",
  endAt: "2025-02-11T01:00:00Z",
  inviteCount: 12,
  rsvpYesCount: 8,
  rsvpNoCount: 2,
  ended: true,
};

/** Past event that already has a pulse (for insights / resurfacing). */
export const MOCK_EVENT_PAST: Event = {
  id: "evt-0",
  hostId: MOCK_HOST.id,
  title: "Game Night",
  startAt: "2025-02-01T19:00:00Z",
  endAt: "2025-02-02T00:00:00Z",
  inviteCount: 10,
  rsvpYesCount: 7,
  rsvpNoCount: 1,
  ended: true,
};

const MOCK_EVENTS_BY_ID: Record<string, Event> = {
  [MOCK_EVENT_ENDED.id]: MOCK_EVENT_ENDED,
  [MOCK_EVENT_PAST.id]: MOCK_EVENT_PAST,
};

export function getEventById(eventId: string): Event | null {
  return MOCK_EVENTS_BY_ID[eventId] ?? null;
}

export const MOCK_GUEST_VIBES: GuestVibeFeedback[] = [
  { attendeeId: "att-1", eventId: "evt-1", vibe: "amazing", submittedAt: "2025-02-11T02:00:00Z" },
  { attendeeId: "att-2", eventId: "evt-1", vibe: "good", submittedAt: "2025-02-11T02:05:00Z" },
  { attendeeId: "att-3", eventId: "evt-1", vibe: "amazing", submittedAt: "2025-02-11T02:10:00Z" },
  { attendeeId: "att-4", eventId: "evt-1", vibe: "good", submittedAt: "2025-02-11T02:15:00Z" },
];

export const MOCK_HOST_REFLECTION: HostReflection = {
  energyRating: 4,
  wouldHostAgain: true,
  privateNotes: "Everyone seemed to have fun. Will do again!",
};

export const MOCK_PULSE_RESPONSE: PulseResponse = {
  id: "pulse-1",
  eventId: MOCK_EVENT_ENDED.id,
  hostId: MOCK_HOST.id,
  hostReflection: MOCK_HOST_REFLECTION,
  guestVibes: MOCK_GUEST_VIBES,
  submittedAt: "2025-02-11T03:00:00Z",
};

/** Pre-computed summary for Event Memory Card. */
export function getPulseSummary(event: Event, response?: PulseResponse | null): PulseSummary {
  const vibeCount = response?.guestVibes?.length ?? 0;
  const amazing = response?.guestVibes?.filter((v) => v.vibe === "amazing").length ?? 0;
  const good = response?.guestVibes?.filter((v) => v.vibe === "good").length ?? 0;

  let socialSignalSummary =
    "Your guests showed up! Most people who said yes came — that’s a great sign.";
  if (event.rsvpYesCount >= event.inviteCount * 0.7) {
    socialSignalSummary =
      "Almost everyone you invited said yes. People wanted to be there — and they showed up.";
  } else if (event.rsvpYesCount >= 5) {
    socialSignalSummary =
      "A solid group showed up. Quality over quantity — your crowd was engaged.";
  }

  let vibeSummary = "No vibe check responses yet.";
  if (vibeCount > 0) {
    const positive = amazing + good;
    vibeSummary = `${positive} of ${vibeCount} guest${vibeCount === 1 ? "" : "s"} said they had a great time.`;
  }

  const eventDate = new Date(event.endAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    eventId: event.id,
    eventTitle: event.title,
    eventDate,
    socialSignalSummary,
    vibeSummary,
    hostReflection: response?.hostReflection,
    guestVibeCount: vibeCount,
  };
}

export const MOCK_PULSE_SUMMARY = getPulseSummary(MOCK_EVENT_ENDED, MOCK_PULSE_RESPONSE);
export const MOCK_PULSE_SUMMARY_PAST = getPulseSummary(MOCK_EVENT_PAST, {
  id: "pulse-0",
  eventId: MOCK_EVENT_PAST.id,
  hostId: MOCK_HOST.id,
  hostReflection: {
    energyRating: 5,
    wouldHostAgain: true,
    privateNotes: "Best game night yet.",
  },
  guestVibes: [
    { attendeeId: "a1", eventId: MOCK_EVENT_PAST.id, vibe: "amazing", submittedAt: "2025-02-02T01:00:00Z" },
    { attendeeId: "a2", eventId: MOCK_EVENT_PAST.id, vibe: "amazing", submittedAt: "2025-02-02T01:00:00Z" },
    { attendeeId: "a3", eventId: MOCK_EVENT_PAST.id, vibe: "good", submittedAt: "2025-02-02T01:00:00Z" },
  ],
  submittedAt: "2025-02-02T02:00:00Z",
});

/** Insight-first: patterns, signals, learnings (events as secondary). */
export const MOCK_HOST_INSIGHTS: HostInsight[] = [
  {
    id: "ins-1",
    type: "pattern",
    title: "You host better when you keep it under 15 people",
    description: "Your vibe scores and show-up rate are strongest for smaller gatherings.",
    seenInEventTitles: ["Summer Rooftop Hangout", "Game Night"],
  },
  {
    id: "ins-2",
    type: "signal",
    title: "People respond better when you send the invite 2+ weeks ahead",
    description: "Earlier invites correlated with higher yes rates in your events.",
    seenInEventTitles: ["Game Night", "Summer Rooftop Hangout"],
  },
  {
    id: "ins-3",
    type: "learning",
    title: "Watch out for weekend fatigue",
    description: "Your energy rating tends to dip when you host back-to-back weekends.",
    seenInEventTitles: ["Summer Rooftop Hangout"],
  },
  {
    id: "ins-4",
    type: "pattern",
    title: "Your guests show up",
    description: "Consistently high show rate — people want to be at your events.",
    seenInEventTitles: ["Summer Rooftop Hangout", "Game Night"],
  },
];
