"use client";

export function GuestViewTabs() {
  return (
    <div className="flex rounded-xl overflow-hidden border border-partiful-border bg-partiful-card mb-4">
      <div className="flex-1 py-2.5 text-center text-sm text-partiful-text-muted bg-partiful-bg">
        Host View
      </div>
      <div className="flex-1 py-2.5 text-center text-sm font-medium text-partiful-text-primary bg-partiful-card border-l border-partiful-border flex items-center justify-center gap-1">
        <span className="text-xs">◎</span> Guest View
      </div>
    </div>
  );
}
