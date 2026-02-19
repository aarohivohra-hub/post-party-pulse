/**
 * Mock analytics: log key events to console (and optional in-app panel).
 * Backend would send these to a real analytics pipeline.
 */

export type PulseAnalyticsEvent =
  | "pulse_prompt_viewed"
  | "pulse_started"
  | "pulse_submitted"
  | "insight_viewed"
  | "resurfaced_viewed"
  | "host_repeat_intent_clicked"
  | "pulse_skipped";

const LOG_PREFIX = "[Pulse Analytics]";

export function logEvent(event: PulseAnalyticsEvent, payload?: Record<string, unknown>): void {
  const ts = new Date().toISOString();
  const message = payload ? { event, ...payload, ts } : { event, ts };
  console.log(LOG_PREFIX, JSON.stringify(message));
  // Optional: push to in-memory store for dev panel
  if (typeof window !== "undefined" && (window as unknown as { __pulseLog?: unknown[] }).__pulseLog) {
    (window as unknown as { __pulseLog: unknown[] }).__pulseLog.push(message);
  }
}
