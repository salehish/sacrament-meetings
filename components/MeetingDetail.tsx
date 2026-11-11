import type { SacramentMeeting } from "@/lib/types";
import PrintButton from "./PrintButton";

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  const date = new Date(`${meeting.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  return (
    <article className="print-card rounded-3xl border border-[#e1e8e2] bg-white p-6 shadow-sm md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e8eee9] pb-6">
        <div><p className="text-sm font-semibold uppercase tracking-widest text-[#397454]">Sacrament meeting program</p><h1 className="mt-2 text-3xl font-bold">{date}</h1><p className="mt-2 text-slate-600 capitalize">{meeting.meetingType} meeting</p></div>
        <PrintButton />
      </div>
      <div className="grid gap-3 border-b border-[#e8eee9] py-5 sm:grid-cols-2"><p><span className="font-semibold">Presiding:</span> {meeting.presiding}</p><p><span className="font-semibold">Conducting:</span> {meeting.conducting}</p></div>
      <div className="space-y-6 py-6">
        {meeting.announcements && meeting.announcements.length > 0 && <section><h2 className="text-lg font-bold">Announcements</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">{meeting.announcements.map((item, i) => <li key={i}>{item}</li>)}</ul></section>}
        <AgendaItem title="Opening Hymn" value={`${meeting.openingHymn.number} · ${meeting.openingHymn.title}`} />
        <AgendaItem title="Opening Prayer" value={meeting.openingPrayer} />
        <section><h2 className="text-lg font-bold">Ward Business</h2>{meeting.wardBusiness.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">{meeting.wardBusiness.map((item, i) => <li key={i}>{item.description}</li>)}</ul> : <p className="mt-2 text-slate-600">No ward business listed.</p>}<p className="mt-2 text-sm text-slate-600">Stake business: {meeting.stakeBusiness ? "Yes" : "No"}</p></section>
        <AgendaItem title="Sacrament Hymn" value={`${meeting.sacramentHymn.number} · ${meeting.sacramentHymn.title}`} />
        <section><h2 className="text-lg font-bold">Speakers and Musical Numbers</h2><div className="mt-2 space-y-3">{meeting.speakers.map((item, i) => <div key={i} className="rounded-xl bg-[#f7f9f7] p-4"><p className="font-semibold">{item.name} <span className="ml-2 text-xs font-medium capitalize text-[#397454]">{item.type.replace("-", " ")}</span></p><p className="mt-1 text-sm text-slate-600">{item.topic}</p></div>)}</div></section>
        <AgendaItem title="Closing Hymn" value={`${meeting.closingHymn.number} · ${meeting.closingHymn.title}`} />
        <AgendaItem title="Closing Prayer" value={meeting.closingPrayer} />
      </div>
    </article>
  );
}
function AgendaItem({ title, value }: { title: string; value: string }) {
  return <section><h2 className="text-lg font-bold">{title}</h2><p className="mt-2 text-slate-700">{value}</p></section>;
}
