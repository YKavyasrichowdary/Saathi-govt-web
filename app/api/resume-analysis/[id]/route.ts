import { NextRequest, NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import resumeAnalysisStorageService from "@/services/resume/resume-analysis-storage.service";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await params;

    const analysis =
      await resumeAnalysisStorageService.getAnalysis(id);

    if (analysis.userId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json({
      success: true,
      analysis,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to load analysis.",
      },
      {
        status: 500,
      }
    );

  }
}