
import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { updateMeetingAction } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

 const meeting = await getMeetingById(numericId);

console.log("EDIT MEETING DATA:", meeting);

if (!meeting) {
  notFound();
}

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="mb-2 text-3xl font-bold">Edit meeting</h1>
      <p className="mb-8 text-slate-600">Update the meeting program details.</p>
      <MeetingForm action={updateMeetingAction} meeting={meeting} />
    </main>
  );
}
