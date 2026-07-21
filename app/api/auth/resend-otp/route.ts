import { NextRequest, NextResponse } from "next/server";

import authService from "@/services/auth/auth.service";

export async function POST(
  request: NextRequest
) {
  try {
    const { email } = await request.json();

    const result =
      await authService.resendOTP(email);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      {
        status: 400,
      }
    );
  }
}