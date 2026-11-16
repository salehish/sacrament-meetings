import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#397454]">Worship • Preparation • Reverence</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">Plan meaningful <span className="text-[#397454]">Sunday</span> meetings.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">A simple place for ward leaders to organize sacrament meeting agendas and for members to review and print meeting programs.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/meetings" className="rounded-xl bg-[#245c43] px-6 py-3 font-semibold text-white shadow-sm hover:bg-[#173e2e]">View meeting programs</Link>
            <Link href="/meetings/current" className="rounded-xl border border-[#cbd8ce] bg-white px-6 py-3 font-semibold text-[#245c43] hover:bg-[#edf4ee]">This Sunday</Link>
          </div>
        </div>
        <div className="rounded-3xl border border-[#dce7dd] bg-[#eaf2eb] p-5 shadow-sm">
          <Image src="/meeting-hero.svg" alt="Illustration of a chapel with a Sunday meeting program" width={720} height={520} priority className="h-auto w-full rounded-2xl" />
          <div className="px-2 pb-2 pt-5">
            <p className="font-semibold text-[#245c43]">A clear plan for every meeting</p>
            <p className="mt-1 text-sm text-slate-600">Announcements, hymns, prayers, ward business, speakers, and musical numbers.</p>
          </div>
        </div>
      </section>
      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        {[["Organize","Keep meeting details and agenda items together."],["Review","Navigate current and past meeting programs."],["Print","Prepare a clean program for Sunday worship."]].map(([title, desc]) => (
          <div key={title} className="rounded-2xl border border-[#e1e8e2] bg-white p-6">
            <h2 className="text-lg font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
