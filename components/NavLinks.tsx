"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [{ href: "/", label: "Home" }, { href: "/meetings", label: "All Meetings" }, { href: "/meetings/current", label: "Current Sunday" }];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="border-t border-[#eef1ee]">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-2">
        {links.map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname === link.href || (link.href === "/meetings" && pathname.startsWith("/meetings/") && pathname !== "/meetings/current");
          return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ${active ? "bg-[#eaf2eb] text-[#245c43]" : "text-slate-600 hover:bg-slate-100"}`}>{link.label}</Link>;
        })}
      </div>
    </nav>
  );
}
