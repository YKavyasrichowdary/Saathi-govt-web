import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

import savedOpportunityService from "@/services/saved-opportunity/saved-opportunity.service";

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

    const { opportunityId } =
      await request.json();

    await savedOpportunityService.save(
      session.user.id,
      opportunityId
    );

    return NextResponse.json({
      success: true,
      message:
        "Opportunity saved successfully.",
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      {
        status: 400,
      }
    );

  }
}

export async function DELETE(
  request: Request
) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const { opportunityId } =
      await request.json();

    await savedOpportunityService.unsave(
      session.user.id,
      opportunityId
    );

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
            : "Failed to unsave opportunity",
      },
      {
        status: 400,
      }
    );
  }
}