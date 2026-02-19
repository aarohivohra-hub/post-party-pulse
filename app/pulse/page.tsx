"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PulsePromptModal } from "@/components/PulsePromptModal";
import { getEventEnded } from "@/lib/store";
import { logEvent } from "@/lib/analytics";

export default function PulsePage() {
  const router = useRouter();
  const event = getEventEnded();

  useEffect(() => {
    logEvent("pulse_prompt_viewed");
  }, []);

  const onStart = () => {
    logEvent("pulse_started");
    router.push(`/event/${event.id}/recap`);
  };

  const onSkip = () => {
    logEvent("pulse_skipped");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-partiful-bg flex items-center justify-center p-4">
      <PulsePromptModal eventTitle={event.title} onStart={onStart} onSkip={onSkip} />
    </div>
  );
}
