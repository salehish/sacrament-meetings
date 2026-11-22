
"use client";

import { useActionState } from "react";
import type { SacramentMeeting } from "@/lib/types";
import type { ActionState } from "@/lib/actions";

type MeetingAction = (
  state: ActionState,
  formData: FormData
) => Promise<ActionState>;

export default function MeetingForm({
  action,
  meeting,
}: {
  action: MeetingAction;
  meeting?: SacramentMeeting;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  const field = (
    name: string,
    label: string,
    value = "",
    type = "text"
  ) => (
    <div>
      <label htmlFor={name} className="mb-1 block font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={value}
        required
        aria-describedby={`${name}-error`}
        className="w-full rounded-lg border border-slate-300 p-3"
      />
      <p id={`${name}-error`} aria-live="polite" className="mt-1 text-sm text-red-600">
        {state.errors?.[name]?.[0] ?? ""}
      </p>
    </div>
  );

  return (
    <form action={formAction} className="space-y-5">
      {meeting && <input type="hidden" name="id" value={meeting.id} />}

      <p aria-live="polite" className="text-sm text-red-600">
        {state.message ?? ""}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {field("date", "Meeting date", meeting?.date ?? "", "date")}

        <div>
          <label htmlFor="meetingType" className="mb-1 block font-medium">Meeting type</label>
          <select id="meetingType" name="meetingType" defaultValue={meeting?.meetingType ?? "regular"} className="w-full rounded-lg border border-slate-300 p-3">
            {["testimony", "regular", "stake", "general", "special"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {field("presiding", "Presiding", meeting?.presiding)}
        {field("conducting", "Conducting", meeting?.conducting)}
      </div>

      <div>
        <label htmlFor="announcements" className="mb-1 block font-medium">Announcements (one per line)</label>
        <textarea id="announcements" name="announcements" defaultValue={meeting?.announcements?.join("\n") ?? ""} className="w-full rounded-lg border border-slate-300 p-3" rows={3} />
      </div>

      <h2 className="border-b pb-2 text-xl font-bold">Opening</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("openingHymnNumber", "Opening hymn number", String(meeting?.openingHymn.number ?? ""), "number")}
        {field("openingHymnTitle", "Opening hymn title", meeting?.openingHymn.title)}
        {field("openingPrayer", "Opening prayer", meeting?.openingPrayer)}
      </div>

      <div>
        <label htmlFor="wardBusiness" className="mb-1 block font-medium">Ward business (one item per line)</label>
        <textarea id="wardBusiness" name="wardBusiness" defaultValue={meeting?.wardBusiness.map((item) => item.description).join("\n") ?? ""} className="w-full rounded-lg border border-slate-300 p-3" rows={3} />
      </div>

      <div>
        <label htmlFor="stakeBusiness" className="mb-1 block font-medium">Stake business</label>
        <select id="stakeBusiness" name="stakeBusiness" defaultValue={String(meeting?.stakeBusiness ?? false)} className="w-full rounded-lg border border-slate-300 p-3">
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      <h2 className="border-b pb-2 text-xl font-bold">Sacrament</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("sacramentHymnNumber", "Sacrament hymn number", String(meeting?.sacramentHymn.number ?? ""), "number")}
        {field("sacramentHymnTitle", "Sacrament hymn title", meeting?.sacramentHymn.title)}
      </div>

      <div>
        <label htmlFor="speakers" className="mb-1 block font-medium">Speakers and musical numbers (one per line: Name | Topic | speaker)</label>
        <textarea id="speakers" name="speakers" defaultValue={meeting?.speakers.map((item) => `${item.name} | ${item.topic} | ${item.type}`).join("\n") ?? ""} className="w-full rounded-lg border border-slate-300 p-3" rows={5} />
      </div>

      <h2 className="border-b pb-2 text-xl font-bold">Closing</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("closingHymnNumber", "Closing hymn number", String(meeting?.closingHymn.number ?? ""), "number")}
        {field("closingHymnTitle", "Closing hymn title", meeting?.closingHymn.title)}
        {field("closingPrayer", "Closing prayer", meeting?.closingPrayer)}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[#245c43] px-6 py-3 font-semibold text-white disabled:opacity-50"
      >
        {pending ? "Saving..." : meeting ? "Update meeting" : "Create meeting"}
      </button>
    </form>
  );
}
