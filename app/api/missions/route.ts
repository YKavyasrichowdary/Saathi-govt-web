import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

import missionService from "@/services/mission/mission.service";

export async function GET() {
  try {
    const session = await getSession();

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

    const missions =
      await missionService.getUserMissions(
        session.user.id
      );

    return NextResponse.json({
      success: true,
      missions,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch missions.",
      },
      {
        status: 500,
      }
    );

  }
}