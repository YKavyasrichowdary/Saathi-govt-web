import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import progressService from "@/services/progress/progress.service";

export async function GET() {
  try {
    const session =
      await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const progress =
      await progressService.getProgress(
        session.user.id
      );

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error(
      "Progress API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch progress.",
      },
      {
        status: 500,
      }
    );
  }
}