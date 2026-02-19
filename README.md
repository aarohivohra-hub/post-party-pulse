# Post-Party Pulse — MVP Prototype

A clickable front-end prototype of **Partiful’s Post-Party Pulse** feature: designed to help hosts understand how their events went — and to learn from them — through lightweight reflections and aggregated insights. No backend, database, or auth — mock data and in-memory/localStorage only.

## How to run

```bash
cd post-party-pulse
npm install
npm run dev
```

Open [https://post-party-pulse.vercel.app/). Best viewed at mobile width (~390px) or desktop.

## Screen map (routes → flow)

| Route | Purpose |
|-------|--------|
| `/` | Partiful-style home: tabs (Upcoming / Hosting), “This Week” event card → **See your recap** |
| `/recap` | **Full-page Host Recap** — stats (showed up, % said yes, vibes), social signal, “Reflect on this event” / “View insights” |
| `/pulse` | Optional post-event prompt modal; “See Your Party Pulse” → `/recap` |
| `/pulse/reflect` | Reflection capture (ratings + optional notes); submit → `/recap?reflected=1` (toast) |
| `/pulse/confirm` | Legacy confirmation (links to recap / insights) |
| `/insights` | **Insight-first**: Patterns, Signals, Learnings (events as “Seen in: …”) |
| `/create-event` | Pre-next-event resurfacing (last pulse); “Use similar vibe” |
| `/event/[eventId]/vibe` | Guest vibe check (one-tap, anonymous) |

## What’s implemented

- **Partiful-aligned home** (`/`) — Dark UI, pill tabs (Upcoming / Hosting), “This Week” with a hosted event card that links to **See your recap**. Get inspo / Create event buttons; “New event” CTA card.
- **Full-page Host Recap** (`/recap`) — Premium post-event moment: event title, social signal, key stats (showed up, % said yes, vibes), “Reflect on this event” and “View insights”. After reflecting, shows “You reflected ✓” and emphasizes insights.
- **Reflection** (`/pulse/reflect`) — Capture the moment (private note, pills, energy 1–5, would host again). Submit saves to localStorage and redirects to recap with “Reflection saved!” toast.
- **Insight-first Insights** (`/insights`) — Sections: **Patterns**, **Signals**, **Learnings**. Each card is a host takeaway (e.g. “You host better when you keep it under 15 people”); events appear as “Seen in: Summer Rooftop Hangout, Game Night”.
- **Pre-next-event resurfacing** (`/create-event`) — Last pulse summary and “Use similar vibe” (logs `host_repeat_intent_clicked`).
- **Guest vibe check** (`/event/[eventId]/vibe`) — One-tap options; thank-you screen. Dark theme.
- **Visual language** — Dark mode, card-based surfaces, rounded containers, bold headers, purple/pink gradients (Partiful-style). SF Pro system font.
- **Mock analytics** — `pulse_prompt_viewed`, `pulse_started`, `pulse_submitted`, `insight_viewed`, `resurfaced_viewed`, `host_repeat_intent_clicked`.

## Intentionally out of scope

- No backend services, database, auth, payments, or real email/SMS.
- No public ratings, no comparison between hosts, no performance pressure (per PRD non-goals).
- No real guest vibe persistence (guest vibe screen is demo only).
- No actual “create event” form — placeholder only.

## Where a backend would plug in later

Interfaces only; no implementation:

- **Events** — Replace `getEventEnded()` and event types with API: `GET /events/:id`, `GET /events?ended=true`.
- **Pulse** — Replace `submitPulse()`, `getPulseForEvent()`, `getLastPulseSummary()`, `getAllPulseSummaries()` with: `POST /events/:eventId/pulse`, `GET /events/:eventId/pulse`, `GET /hosts/me/pulses`.
- **Guest vibe** — `POST /events/:eventId/vibe` (anonymous, optional).
- **Analytics** — Replace `logEvent()` with client SDK (e.g. segment, mixpanel) or `POST /analytics/events`.

Types in `lib/types.ts` (Event, Host, Attendee, PulseResponse, PulseSummary, HostInsight, GuestVibeFeedback, HostReflection) are the contract for API request/response shapes.

## Tech

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- Structure: `/app` (routes), `/components`, `/lib` (types, mockData, store, analytics)
