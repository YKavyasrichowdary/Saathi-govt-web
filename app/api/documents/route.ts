import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import documentService from "@/services/document/document.service";

export async function DELETE(request: Request) {
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

    const { id } = await request.json();

    await documentService.delete(id);

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully.",
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete document.",
      },
      {
        status: 400,
      }
    );

  }
}