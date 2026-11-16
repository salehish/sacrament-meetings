
"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-6">
      <label htmlFor="meeting-search" className="mb-2 block font-semibold">
        Search meetings
      </label>
      <input
        id="meeting-search"
        type="search"
        placeholder="Search by speaker, presiding, conducting, or meeting type..."
        defaultValue={searchParams.get("query")?.toString() ?? ""}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3"
      />
    </div>
  );
}
