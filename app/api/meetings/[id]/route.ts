import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) return NextResponse.json({ error: "The meeting ID must be a positive number." }, { status: 400 });
  const meeting = getMeetingById(numericId);
  if (!meeting) return NextResponse.json({ error: "Meeting not found." }, { status: 404 });
  return NextResponse.json(meeting);
}
