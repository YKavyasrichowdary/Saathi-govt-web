import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

import roadmapGeneratorService from "@/services/roadmap/roadmap-generator.service";

export async function POST(request: Request) {
  try {

    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    const body = await request.json();

    const roadmap =
      await roadmapGeneratorService.generateRoadmap({
        userId: session.user.id,
        ...body,
      });

    return NextResponse.json({
      success: true,
      data: {
        id: roadmap.id,
      },
      roadmap,
    });

  } catch (error) {
    console.error("Failed to generate roadmap:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate roadmap.",
      },
      {
        status: 500,
      }
    );

  }
}