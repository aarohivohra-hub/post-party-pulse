"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEventEnded } from "@/lib/store";

/**
 * Legacy /pulse/reflect: redirect to event-scoped reflect for the ended event.
 */
export default function ReflectPage() {
  const router = useRouter();
  const event = getEventEnded();

  useEffect(() => {
    router.replace(`/event/${event.id}/reflect`);
  }, [router, event.id]);

  return (
    <div className="min-h-screen bg-partiful-bg flex items-center justify-center">
      <div className="skeleton w-48 h-8 rounded" />
    </div>
  );
}
