
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
  _meeting: Omit<SacramentMeeting, "id">
): Promise<void> {
  void _meeting;
  throw new Error("Adding meetings will be implemented in Week 04.");
}

export async function updateMeeting(
  _id: number,
  _meeting: Partial<SacramentMeeting>
): Promise<void> {
  void _meeting;
  throw new Error("Updating meetings will be implemented in Week 04.");
}

export async function deleteMeeting(_id: number): Promise<void> {
  void _id;
  throw new Error("Deleting meetings will be implemented in Week 04.");
}
