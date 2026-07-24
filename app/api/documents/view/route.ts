import { NextRequest, NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

import documentService from "@/services/document/document.service";
import storageService from "@/lib/storage";

export async function GET(
  request: NextRequest
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

    const id =
      request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing document id.",
        },
        {
          status: 400,
        }
      );
    }

    const document =
      await documentService.findById(id);

    if (
      document.userId !==
      session.user.id
    ) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    const signedUrl =
      await storageService.getSignedUrl(
        document.fileUrl
      );

    return NextResponse.json({
      success: true,
      url: signedUrl,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to open document.",
      },
      {
        status: 400,
      }
    );

  }
}