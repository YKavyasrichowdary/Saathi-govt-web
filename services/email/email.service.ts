import { resend } from "@/lib/resend";

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend Error:", error);

      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error(err);

    throw err;
  }
}