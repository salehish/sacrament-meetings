
import MeetingForm from "@/components/MeetingForm";
import { createMeetingAction } from "@/lib/actions";

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="mb-2 text-3xl font-bold">Create a meeting</h1>
      <p className="mb-8 text-slate-600">Enter the sacrament meeting program details.</p>
      <MeetingForm action={createMeetingAction} />
    </main>
  );
}
