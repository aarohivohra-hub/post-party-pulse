"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEventEnded } from "@/lib/store";

/**
 * Legacy /recap: redirect to event-scoped recap for the ended event.
 */
export default function RecapPage() {
  const router = useRouter();
  const event = getEventEnded();

  useEffect(() => {
    router.replace(`/event/${event.id}/recap`);
  }, [router, event.id]);

  return (
    <div className="min-h-screen bg-partiful-bg flex items-center justify-center">
      <div className="skeleton w-48 h-8 rounded" />
    </div>
  );
}
