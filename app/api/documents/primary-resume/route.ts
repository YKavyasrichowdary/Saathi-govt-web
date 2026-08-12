import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import profileService from "@/services/profile/profile.service";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { documentId } = await request.json();

    if (!documentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Document ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const profile =
      await profileService.setPrimaryResume(
        session.user.id,
        documentId
      );

    return NextResponse.json({
      success: true,
      message: "Primary resume updated successfully.",
      profile,
    });
  } catch (error) {
    console.error(
      "Set Primary Resume Error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to set primary resume.";

    const status =
      message === "Unauthorized."
        ? 403
        : message === "Document not found."
        ? 404
        : 400;

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status,
      }
    );
  }
}