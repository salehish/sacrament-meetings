
import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const PAGE_SIZE = 5;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return neon(databaseUrl);
}

export async function getMeetings(
  query = "",
  currentPage = 1
): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const searchTerm = `%${query.trim()}%`;
  const page = Math.max(1, Math.floor(currentPage));
  const offset = (page - 1) * PAGE_SIZE;

  const meetings = await sql`
    SELECT
      id,
      date::text AS date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE
      ${query.trim() === ""} OR
      presiding ILIKE ${searchTerm} OR
      conducting ILIKE ${searchTerm} OR
      meeting_type ILIKE ${searchTerm} OR
      speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${PAGE_SIZE}
    OFFSET ${offset}
  `;

  return meetings as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query = ""
): Promise<number> {
  const sql = getSql();
  const searchTerm = `%${query.trim()}%`;

  const result = await sql`
    SELECT COUNT(*) AS total
    FROM meetings
    WHERE
      ${query.trim() === ""} OR
      presiding ILIKE ${searchTerm} OR
      conducting ILIKE ${searchTerm} OR
      meeting_type ILIKE ${searchTerm} OR
      speakers::text ILIKE ${searchTerm}
  `;

  const total = Number(result[0]?.total ?? 0);

  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  const sql = getSql();

  const meetings = await sql`
    SELECT
      id,
      date::text AS date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  return meetings[0] as unknown as SacramentMeeting | undefined;
}

export async function getCurrentMeeting(): Promise<
  SacramentMeeting | undefined
> {
  const sql = getSql();

  const today = new Date();
  const sunday = new Date(today);

  sunday.setDate(today.getDate() - today.getDay());

  const target = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, "0"),
    String(sunday.getDate()).padStart(2, "0"),
  ].join("-");

  const meetings = await sql`
    SELECT
      id,
      date::text AS date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE date = ${target}
    LIMIT 1
  `;

  if (meetings.length > 0) {
    return meetings[0] as unknown as SacramentMeeting;
  }

  const latestMeetings = await getMeetings("", 1);
  return latestMeetings[0];
}

// Week 04 mutation placeholders.

export async function addMeeting(
  meeting: Omit<SacramentMeeting, "id">
): Promise<void> {
  const sql = getSql();

  await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${meeting.announcements ?? []},
      ${JSON.stringify(meeting.openingHymn)}::jsonb,
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.closingHymn)}::jsonb,
      ${meeting.closingPrayer}
    )
  `;
}

export async function updateMeeting(
  id: number,
  meeting: Partial<SacramentMeeting>
): Promise<void> {
  const sql = getSql();

  await sql`
    UPDATE meetings
    SET
      date = COALESCE(${meeting.date ?? null}, date),
      meeting_type = COALESCE(${meeting.meetingType ?? null}, meeting_type),
      presiding = COALESCE(${meeting.presiding ?? null}, presiding),
      conducting = COALESCE(${meeting.conducting ?? null}, conducting),
      announcements = COALESCE(${meeting.announcements ?? null}, announcements),
      opening_hymn = COALESCE(${meeting.openingHymn ? JSON.stringify(meeting.openingHymn) : null}::jsonb, opening_hymn),
      opening_prayer = COALESCE(${meeting.openingPrayer ?? null}, opening_prayer),
      ward_business = COALESCE(${meeting.wardBusiness ? JSON.stringify(meeting.wardBusiness) : null}::jsonb, ward_business),
      stake_business = COALESCE(${meeting.stakeBusiness ?? null}, stake_business),
      sacrament_hymn = COALESCE(${meeting.sacramentHymn ? JSON.stringify(meeting.sacramentHymn) : null}::jsonb, sacrament_hymn),
      speakers = COALESCE(${meeting.speakers ? JSON.stringify(meeting.speakers) : null}::jsonb, speakers),
      closing_hymn = COALESCE(${meeting.closingHymn ? JSON.stringify(meeting.closingHymn) : null}::jsonb, closing_hymn),
      closing_prayer = COALESCE(${meeting.closingPrayer ?? null}, closing_prayer)
    WHERE id = ${id}
  `;
}

export async function deleteMeeting(id: number): Promise<void> {
  const sql = getSql();

  await sql`
    DELETE FROM meetings
    WHERE id = ${id}
  `;
}
