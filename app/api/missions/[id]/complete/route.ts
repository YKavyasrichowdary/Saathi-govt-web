import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import missionCompletionService from "@/services/mission/mission-completion.service";
import progressService from "@/services/progress/progress.service";

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

    await progressService.completeMission(
    id,
    session.user.id,
    50
);;

    return NextResponse.json({
      success: true,
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