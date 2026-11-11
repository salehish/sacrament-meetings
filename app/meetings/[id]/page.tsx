"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingPage() {
  const params = useParams<{ id: string }>();
  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(`/api/meetings/${encodeURIComponent(params.id)}`).then(async (response) => {
      if (!response.ok) throw new Error(response.status === 404 ? "Meeting not found." : "Unable to load this meeting.");
      return response.json() as Promise<SacramentMeeting>;
    }).then(setMeeting).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  }, [params.id]);
  return <main className="mx-auto max-w-4xl px-5 py-10"><Link href="/meetings" className="no-print text-sm font-semibold text-[#245c43] hover:underline">← Back to all meetings</Link><div className="mt-6">{loading && <p>Loading meeting…</p>}{error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}{meeting && <MeetingDetail meeting={meeting} />}</div></main>;
}
