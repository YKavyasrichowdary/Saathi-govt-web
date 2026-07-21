import { NextResponse } from "next/server";

import authService from "@/services/auth/auth.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await authService.register(body);

    return NextResponse.json(result, {
      status: 201,
    });
  } catch (error) {
    console.error("Signup API error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}