/**
 * Data model types for Post-Party Pulse (mock-only; backend would own these later).
 */

export interface Host {
  id: string;
  name: string;
}

export interface Attendee {
  id: string;
  name: string;
  eventId: string;
}

/** Guest one-tap vibe feedback (anonymous, optional). */
export type VibeOption = "amazing" | "good" | "okay";

export interface GuestVibeFeedback {
  attendeeId: string;
  eventId: string;
  vibe: VibeOption;
  submittedAt: string; // ISO
}

export interface Event {
  id: string;
  hostId: string;
  title: string;
  startAt: string; // ISO
  endAt: string; // ISO
  inviteCount: number;
  rsvpYesCount: number;
  rsvpNoCount: number;
  /** Whether we consider this event "ended" for pulse. */
  ended: boolean;
}

/** Host reflection: ratings + optional free-text. */
export interface HostReflection {
  energyRating: number; // 1-5
  wouldHostAgain: boolean;
  privateNotes?: string;
}

/** Full pulse response for one event (host + optional guest vibes). */
export interface PulseResponse {
  id: string;
  eventId: string;
  hostId: string;
  hostReflection?: HostReflection;
  guestVibes: GuestVibeFeedback[];
  submittedAt?: string; // ISO, when host submitted
}

/** Computed/aggregated summary for the Event Memory Card. */
export interface PulseSummary {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  /** Positive-framed social signal copy. */
  socialSignalSummary: string;
  /** e.g. "4 of 5 guests said they had a great time" */
  vibeSummary: string;
  hostReflection?: HostReflection;
  guestVibeCount: number;
}

/** Insight-first: pattern, signal, or learning about the host (events are secondary). */
export type HostInsightType = "pattern" | "signal" | "learning";

export interface HostInsight {
  id: string;
  type: HostInsightType;
  /** Main takeaway, e.g. "You host better when you keep it under 15 people" */
  title: string;
  /** Optional short elaboration */
  description?: string;
  /** Event titles where this showed up (secondary metadata) */
  seenInEventTitles: string[];
}
