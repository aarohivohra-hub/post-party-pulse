"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy summary step; redirect to full-page Recap. */
export default function PulseSummaryPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/recap");
  }, [router]);
  return (
    <div className="min-h-screen bg-partiful-bg flex items-center justify-center">
      <div className="skeleton w-48 h-8 rounded" />
    </div>
  );
}
