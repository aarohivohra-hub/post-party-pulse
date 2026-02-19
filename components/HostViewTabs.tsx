"use client";

export function HostViewTabs() {
  return (
    <div className="flex rounded-xl overflow-hidden border border-partiful-border bg-partiful-card mb-4">
      <div className="flex-1 py-2.5 text-center text-sm font-medium text-partiful-text-primary bg-partiful-card border-r border-partiful-border">
        Host View
      </div>
      <div className="flex-1 py-2.5 text-center text-sm text-partiful-text-muted bg-partiful-bg">
        Guest View
      </div>
    </div>
  );
}
