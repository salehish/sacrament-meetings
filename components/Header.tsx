
import Link from "next/link";
import { Suspense } from "react";

function NavLinks() {
  return (
    <nav aria-label="Main navigation" className="h-12 border-t border-[#eef1ee]">
      <div className="mx-auto flex h-full max-w-6xl items-center px-5">
        <Link href="/" className="text-sm font-medium text-[#245c43]">
          Home
        </Link>
      </div>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="border-b border-[#e1e8e2] bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#245c43] text-xl text-white"
            aria-hidden="true"
          >
            ✦
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight">
              Sacrament Meeting Planner
            </span>
            <span className="block text-xs text-slate-500">
              Ward meeting programs
            </span>
          </span>
        </Link>

        <div className="text-right">
          <p className="text-sm font-semibold text-[#245c43]">
            Sunday worship, thoughtfully prepared
          </p>
          <p className="text-xs text-slate-500">
            Meeting programs and schedules
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <nav
            aria-label="Main navigation"
            className="h-12 border-t border-[#eef1ee]"
          />
        }
      >
        <NavLinks />
      </Suspense>
    </header>
  );
}
