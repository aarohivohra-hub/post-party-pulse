"use client";

export function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-partiful-card border border-partiful-border text-partiful-text-primary font-sans text-sm shadow-lg toast-enter"
      role="status"
    >
      {message}
    </div>
  );
}
