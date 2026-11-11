import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  { id: 1, date: "2026-11-08", meetingType: "testimony", presiding: "Bishop Daniel", conducting: "Brother Samuel", announcements: ["Ward temple trip registration is open.", "Youth activity will be held on Saturday."], openingHymn: { number: 2, title: "The Spirit of God" }, openingPrayer: "Sister Amina", wardBusiness: [{ description: "Sustain newly called ward members." }], stakeBusiness: false, sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" }, speakers: [{ name: "Members of the ward", topic: "Personal testimonies", type: "speaker" }], closingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" }, closingPrayer: "Brother Peter" },
  { id: 2, date: "2026-11-01", meetingType: "regular", presiding: "Bishop Daniel", conducting: "Brother Samuel", announcements: ["Please update your ministering interviews."], openingHymn: { number: 3, title: "Now Let Us Rejoice" }, openingPrayer: "Brother John", wardBusiness: [{ description: "Ward council reminders." }], stakeBusiness: true, sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" }, speakers: [{ name: "Sister Grace", topic: "Following the Savior", type: "speaker" }, { name: "Brother David", topic: "Service in the covenant path", type: "speaker" }], closingHymn: { number: 85, title: "How Firm a Foundation" }, closingPrayer: "Sister Ruth" },
  { id: 3, date: "2026-10-25", meetingType: "regular", presiding: "President James", conducting: "Brother Samuel", announcements: ["Family history assistance is available after church."], openingHymn: { number: 6, title: "Redeemer of Israel" }, openingPrayer: "Sister Esther", wardBusiness: [{ description: "Welcome new members to the ward." }], stakeBusiness: false, sacramentHymn: { number: 193, title: "I Stand All Amazed" }, speakers: [{ name: "Brother Michael", topic: "Faith in Jesus Christ", type: "speaker" }, { name: "Ward Choir", topic: "I Know That My Redeemer Lives", type: "musical-number" }], closingHymn: { number: 134, title: "I Believe in Christ" }, closingPrayer: "Brother Paul" },
  { id: 4, date: "2026-10-18", meetingType: "stake", presiding: "Stake President", conducting: "Stake Clerk", announcements: ["Stake conference instructions."], openingHymn: { number: 27, title: "Praise to the Man" }, openingPrayer: "Brother Andrew", wardBusiness: [], stakeBusiness: true, sacramentHymn: { number: 188, title: "Thy Will, O Lord, Be Done" }, speakers: [{ name: "Stake President", topic: "Discipleship and service", type: "speaker" }], closingHymn: { number: 98, title: "I Need Thee Every Hour" }, closingPrayer: "Sister Mary" },
  { id: 5, date: "2026-10-11", meetingType: "general", presiding: "Conference Presiding Authority", conducting: "Conference Conductor", announcements: ["Please follow the published conference schedule."], openingHymn: { number: 1, title: "The Morning Breaks" }, openingPrayer: "Invocation", wardBusiness: [], stakeBusiness: false, sacramentHymn: { number: 174, title: "While of These Emblems We Partake" }, speakers: [{ name: "Conference Speaker", topic: "Hope in Christ", type: "speaker" }], closingHymn: { number: 267, title: "How Wondrous and Great" }, closingPrayer: "Benediction" }
];

export function getMeetings(date?: string): SacramentMeeting[] {
  const result = date ? meetings.filter((meeting) => meeting.date === date) : meetings;
  return [...result].sort((a, b) => b.date.localeCompare(a.date));
}
export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}
export function getCurrentMeeting(): SacramentMeeting | undefined {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());
  const target = `${sunday.getFullYear()}-${String(sunday.getMonth() + 1).padStart(2, "0")}-${String(sunday.getDate()).padStart(2, "0")}`;
  return meetings.find((meeting) => meeting.date === target) ?? getMeetings()[0];
}
