
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900">
        Meeting Not Found
      </h1>

      <p className="mt-4 text-slate-600">
        Sorry, the meeting program you&apos;re looking for doesn&apos;t exist
        or may have been removed.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
      >
        Browse Meetings
      </Link>
    </main>
  );
}
