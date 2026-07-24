import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

import storageService from "@/lib/storage";

import documentService from "@/services/document/document.service";

import { DocumentType } from "@prisma/client";

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

    const formData = await request.formData();

    const file = formData.get("file") as File;

    const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
];

if (!allowedTypes.includes(file.type)) {

    return NextResponse.json(
        {
            success:false,
            message:"Unsupported file type."
        },
        {
            status:400
        }
    );
}

if (file.size > 5 * 1024 * 1024) {

    return NextResponse.json(
        {
            success:false,
            message:"Maximum upload size is 5MB."
        },
        {
            status:400
        }
    );
}

    const title = formData.get("title") as string;

    const type = formData.get(
      "type"
    ) as DocumentType;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    const storagePath =
      await storageService.uploadDocument(
        file
      );

    await documentService.upload({
      userId: session.user.id,

      title,

      type,

      fileUrl: storagePath,

      fileName: file.name,

      fileSize: file.size,

      mimeType: file.type,
    });

    return NextResponse.json({
      success: true,
      message: "Document uploaded.",
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Upload failed",
      },
      {
        status: 400,
      }
    );

  }
}