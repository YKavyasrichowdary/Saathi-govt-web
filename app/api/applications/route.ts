import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { getSession } from "@/lib/auth";

import applicationService from "@/services/application/application.service";

export async function POST(
  request: Request
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

    const { opportunityId } =
      await request.json();

    await applicationService.apply(
      session.user.id,
      opportunityId
    );

    return NextResponse.json({
      success: true,
      message:
        "Application tracked successfully.",
    });

  } catch (error) {
    let message = "Something went wrong.";
    let status = 400;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        message = "Invalid user or opportunity provided.";
      } else if (error.code === "P2002") {
        message = "You have already applied for this opportunity.";
      } else {
        message = error.message;
      }
    } else if (error instanceof Error) {
      message = error.message;
      if (message.includes("User account not found")) {
        status = 401;
      }
    }

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

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const applications =
      await applicationService.getApplications(
        session.user.id
      );

    return NextResponse.json({
      success: true,
      data: applications,
    });

  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}