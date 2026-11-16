import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? "";
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");

  if (!Number.isInteger(page) || page < 1) {
    return NextResponse.json(
      { error: "Page must be a positive integer." },
      { status: 400 }
    );
  }

  const meetings = await getMeetings(query, page);

  return NextResponse.json(meetings);
}