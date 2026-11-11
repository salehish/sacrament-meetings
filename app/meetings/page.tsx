
"use client";

import { useEffect, useState } from "react";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMeetings() {
      try {
        const response = await fetch("/api/meetings");

        if (!response.ok) {
          throw new Error("Unable to load meetings.");
        }

        const data: SacramentMeeting[] = await response.json();
        setMeetings(data);
      } catch {
        setError("Meeting programs could not be loaded. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    }

    loadMeetings();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#397454]">
          Programs archive
        </p>
        <h1 className="mt-2 text-3xl font-bold">All meetings</h1>
        <p className="mt-2 text-slate-600">
          Browse current and past meeting programs.
        </p>
      </div>

      {loading && (
        <p aria-live="polite" className="text-slate-600">
          Loading meetings…
        </p>
      )}

      {error && <p role="alert" className="text-red-700">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </main>
  );
}
