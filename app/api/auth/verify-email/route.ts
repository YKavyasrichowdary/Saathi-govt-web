import { NextRequest, NextResponse } from "next/server";

import authService from "@/services/auth/auth.service";

export async function POST(
  request: NextRequest
) {
  try {
    const { email, otp } =
      await request.json();

    const result =
      await authService.verifyEmail(
        email,
        otp
      );

    return NextResponse.json(result);
  } catch (error) {
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