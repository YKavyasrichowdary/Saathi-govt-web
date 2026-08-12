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

export async function POST(request: Request) {
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

    const body = await request.json();

    const { missionId } = body;

    if (!missionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Mission ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const mission =
      await missionService.completeMission(
        missionId,
        session.user.id
      );

    return NextResponse.json({
      success: true,
      message: "Mission completed successfully.",
      mission,
    });
  } catch (error) {
    console.error(
      "Complete mission error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to complete mission.";

    const status =
      message === "Unauthorized."
        ? 403
        : message === "Mission not found."
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