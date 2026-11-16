
import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;
  const query = params.query ?? "";
  const currentPage = Math.max(1, Number(params.page) || 1);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

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

      <Suspense fallback={<p>Loading search...</p>}>
        <MeetingSearch />
      </Suspense>

      {meetings.length > 0 ? (
        <>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>

          <Suspense fallback={null}>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </Suspense>
        </>
      ) : (
        <p className="py-8 text-center text-slate-600">
          No meetings found. Try another search.
        </p>
      )}
    </main>
  );
}
