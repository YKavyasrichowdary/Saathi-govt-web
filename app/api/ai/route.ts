import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import aiService from "@/services/ai/ai.service";

export async function POST(request: Request) {
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

    const { message } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const reply = await aiService.chat(
      session.user.id,
      message
    );

    return NextResponse.json({
      success: true,
      reply,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "AI request failed.",
      },
      {
        status: 500,
      }
    );

  }
}