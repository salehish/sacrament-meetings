
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  addMeeting,
  updateMeeting,
  deleteMeeting,
} from "@/lib/meetings-db";

export type ActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

const meetingSchema = z.object({
  date: z.string().min(1, "Meeting date is required."),
  meetingType: z.enum(["testimony", "regular", "stake", "general", "special"]),
  presiding: z.string().min(2, "Enter the presiding person's name."),
  conducting: z.string().min(2, "Enter the conducting person's name."),
  announcements: z.string(),
  openingHymnNumber: z.coerce.number().int().positive(),
  openingHymnTitle: z.string().min(1, "Enter the opening hymn title."),
  openingPrayer: z.string().min(2, "Enter the opening prayer person's name."),
  wardBusiness: z.string(),
  stakeBusiness: z.enum(["true", "false"]),
  sacramentHymnNumber: z.coerce.number().int().positive(),
  sacramentHymnTitle: z.string().min(1, "Enter the sacrament hymn title."),
  speakers: z.string(),
  closingHymnNumber: z.coerce.number().int().positive(),
  closingHymnTitle: z.string().min(1, "Enter the closing hymn title."),
  closingPrayer: z.string().min(2, "Enter the closing prayer person's name."),
});

function getMeetingData(data: z.infer<typeof meetingSchema>) {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: data.announcements
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness: data.wardBusiness
      .split("\n")
      .map((description) => description.trim())
      .filter(Boolean)
      .map((description) => ({ description })),
    stakeBusiness: data.stakeBusiness === "true",
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: data.speakers
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name = "", topic = "", type = "speaker"] = line.split("|");
        return {
          name: name.trim(),
          topic: topic.trim(),
          type: type.trim() === "musical-number" ? "musical-number" as const : "speaker" as const,
        };
      }),
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  };
}

function validateMeeting(formData: FormData) {
  return meetingSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    announcements: formData.get("announcements") ?? "",
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    openingPrayer: formData.get("openingPrayer"),
    wardBusiness: formData.get("wardBusiness") ?? "",
    stakeBusiness: formData.get("stakeBusiness"),
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    speakers: formData.get("speakers") ?? "",
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    closingPrayer: formData.get("closingPrayer"),
  });
}

export async function createMeetingAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const result = validateMeeting(formData);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      message: "Please correct the errors below.",
    };
  }

  await addMeeting(getMeetingData(result.data));
  revalidatePath("/meetings");
  revalidatePath("/meetings/current");
  redirect("/meetings");
}

export async function updateMeetingAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    return { message: "Invalid meeting ID." };
  }

  const result = validateMeeting(formData);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      message: "Please correct the errors below.",
    };
  }

  await updateMeeting(id, getMeetingData(result.data));
  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  revalidatePath("/meetings/current");
  redirect(`/meetings/${id}`);
}

export async function deleteMeetingAction(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid meeting ID.");
  }

  await deleteMeeting(id);

  revalidatePath("/meetings");
  revalidatePath("/meetings/current");
  revalidatePath("/admin/meetings");

  redirect("/admin/meetings");
}