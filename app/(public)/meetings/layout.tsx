import Link from "next/link";
export default function MeetingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div><div className="bg-[#edf4ee]"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4"><p className="font-semibold text-[#245c43]">Meeting programs</p><Link href="/meetings" className="text-sm font-medium text-[#245c43] hover:underline">Browse all programs →</Link></div></div>{children}</div>;
}
