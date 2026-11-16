import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  const date = new Date(`${meeting.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  return (
    <article className="rounded-2xl border border-[#e1e8e2] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-[#eaf2eb] px-3 py-1 text-xs font-semibold capitalize text-[#245c43]">{meeting.meetingType} meeting</span><time className="text-sm text-slate-500" dateTime={meeting.date}>{date}</time></div>
      <h2 className="mt-4 text-xl font-bold">{meeting.presiding}</h2><p className="mt-1 text-sm text-slate-600">Presiding · Conducting: {meeting.conducting}</p>
      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">{meeting.speakers.map((item) => item.name).join(" · ") || "Meeting program"}</p>
      <Link href={`/meetings/${meeting.id}`} className="mt-5 inline-flex font-semibold text-[#245c43] hover:underline">View program <span aria-hidden="true">→</span></Link>
    </article>
  );
}
