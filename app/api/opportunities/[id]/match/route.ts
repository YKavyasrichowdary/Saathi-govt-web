import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

import opportunityMatchService
  from "@/services/opportunity-match/opportunity-match.service";

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

    const session =
      await getSession();

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

    const result =
      await opportunityMatchService.analyze({

        userId:
          session.user.id,

        opportunityId:
          id,

      });

    return NextResponse.json({

      success: true,

      data: result,

    });

  } catch (error) {
    console.error("Opportunity Match Route Error:", error);

    const isValidationError =
      error instanceof Error &&
      (error.message.includes("not found") ||
        error.message.includes("Profile") ||
        error.message.includes("Resume") ||
        error.message.includes("Opportunity"));

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to analyze opportunity.",
      },
      {
        status: isValidationError ? 400 : 500,
      }
    );
  }

}