import { NextRequest, NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import storageService from "@/lib/storage";
import documentService from "@/services/document/document.service";
import resumeParserService from "@/services/resume/resume-parser.service";
import resumeAnalysisService from "@/services/resume/resume-analysis.service";
import resumeAnalysisStorageService from "@/services/resume/resume-analysis-storage.service";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
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

    const { id: documentId } = await params;

    const document =
      await documentService.findById(documentId);

    if (!document) {
      return NextResponse.json(
        {
          success: false,
          message: "Document not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (document.userId !== session.user.id) {
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

    if (document.mimeType !== "application/pdf") {
      return NextResponse.json(
        {
          success: false,
          message: "Only PDF resumes can be analyzed.",
        },
        {
          status: 400,
        }
      );
    }

    const buffer =
      await storageService.getFileBuffer(
        document.fileUrl
      );

    const resumeText =
      await resumeParserService.extractText(
        buffer
      );

    const analysis =
      await resumeAnalysisService.analyze(
        resumeText
      );

    const savedAnalysis =
      await resumeAnalysisStorageService.saveAnalysis({
        userId: session.user.id,
        documentId,
        analysis,
      });

    return NextResponse.json({
      success: true,

      analysisId: savedAnalysis.id,
    });

  } catch (error) {

    console.error(
      "Resume Analysis API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to analyze resume.",
      },
      {
        status: 500,
      }
    );
  }
}