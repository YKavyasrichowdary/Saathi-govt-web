import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

import service from "@/services/student-opportunity/student-opportunity.service";

export async function GET() {
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

    const opportunities =
      await service.getRecommended(
        session.user.id
      );

    return NextResponse.json({
      success: true,
      data: opportunities,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );

  }
}