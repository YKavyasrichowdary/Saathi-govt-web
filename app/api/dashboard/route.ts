import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

import dashboardService from "@/services/dashboard/dashboard.service";

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

    const dashboard =
      await dashboardService.getDashboard(
        session.user.id
      );

    return NextResponse.json({
      success: true,
      dashboard,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      {
        status: 500,
      }
    );

  }
}