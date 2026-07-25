import { NextResponse } from "next/server";
import { gemini } from "@/lib/ai/gemini";

export async function GET() {
  try {
    const models = await gemini.models.list();

    return NextResponse.json(models);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}