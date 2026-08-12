import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import missionService from "@/services/mission/mission.service";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  request: Request,
  { params }: Params
) {
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

    const { id } = await params;

    const result = await missionService.completeMission(id, session.user.id);

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to complete mission.",
      },
      {
        status: 500,
      }
    );

  }
}