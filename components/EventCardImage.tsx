"use client";

/**
 * Event card / recap hero image.
 * Summer Rooftop Hangout: rooftop sunset gathering.
 */
export function EventCardImage({ className }: { className?: string }) {
  return (
    <img
      src="/summer-rooftop-hangout.png"
      alt="Summer rooftop hangout"
      className={`w-full h-full object-cover ${className ?? ""}`}
    />
  );
}
