
import Link from "next/link";
import { getMeetings } from "@/lib/meetings-db";
import { deleteMeetingAction } from "@/lib/actions";

export const instant = false;

export default async function AdminMeetingsPage() {
  const meetings = await getMeetings("", 1);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manage Meetings
          </h1>
          <p className="mt-2 text-slate-600">
            Create, edit, and manage sacrament meeting programs.
          </p>
        </div>

        <Link
          href="/admin/meetings/new"
          className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
        >
          + Create Meeting
        </Link>
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-600">No meetings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th scope="col" className="p-4">Date</th>
                <th scope="col" className="p-4">Meeting Type</th>
                <th scope="col" className="p-4">Presiding</th>
                <th scope="col" className="p-4">Conducting</th>
                <th scope="col" className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr key={meeting.id} className="border-t border-slate-200">
                  <td className="p-4">{meeting.date}</td>
                  <td className="p-4 capitalize">{meeting.meetingType}</td>
                  <td className="p-4">{meeting.presiding}</td>
                  <td className="p-4">{meeting.conducting}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/admin/meetings/${meeting.id}/edit`}
                        className="font-medium text-blue-700 hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/meetings/${meeting.id}`}
                        className="font-medium text-green-700 hover:underline"
                      >
                        View
                      </Link>
                      <form action={deleteMeetingAction}>
                        <input
                          type="hidden"
                          name="id"
                          value={meeting.id}
                        />
                        <button
                          type="submit"
                          className="font-medium text-red-700 hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/meetings"
          className="font-medium text-green-700 hover:underline"
        >
          ← Back to public meetings
        </Link>
      </div>
    </main>
  );
}
