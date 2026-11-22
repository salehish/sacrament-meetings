
"use client";

import { useEffect } from "react";

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Meetings page error:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-2xl px-5 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">
        Something went wrong
      </h1>

      <p className="mt-4 text-slate-600" role="alert">
        We couldn&apos;t load the meeting programs. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
      >
        Try again
      </button>
    </main>
  );
}
