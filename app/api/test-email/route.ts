import { NextResponse } from "next/server";

import { sendEmail } from "@/services/email/email.service";

import { verifyEmailTemplate } from "@/emails/verify-email";

export async function GET() {
  try {
    await sendEmail({
      to: "kavyasriyadlapati@gmail.com",

      subject: "Testing Resend",

      html: verifyEmailTemplate(
        "Kavya",
        "482913"
      ),
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}