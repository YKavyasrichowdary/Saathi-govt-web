import { OTPPurpose } from "@prisma/client";

import authRepository from "@/repositories/auth/auth.repository";
import otpService from "./otp.service";
import passwordService from "./password.service";

import { sendEmail } from "@/services/email/email.service";
import { verifyEmailTemplate } from "@/emails/verify-email";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

class RegisterService {
  async register({
    name,
    email,
    password,
  }: RegisterInput) {
    // ------------------------
    // Basic Validation
    // ------------------------
    console.log("✅ RegisterService.register() called");
    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ------------------------
    // Existing User
    // ------------------------

    const existingUser =
      await authRepository.findUserByEmail(
        normalizedEmail
      );

    if (existingUser) {
      /**
       * If user is unverified OR OAuth user without password,
       * update password and resend OTP for verification.
       */
      if (!existingUser.password || !existingUser.emailVerified) {
        const hashedPassword =
          await passwordService.hash(password);

        await authRepository.updatePassword(
          existingUser.id,
          hashedPassword
        );

        const otp = await otpService.create(
          existingUser.id,
          normalizedEmail,
          OTPPurpose.EMAIL_VERIFICATION
        );

        await sendEmail({
          to: normalizedEmail,
          subject: "Verify your Saathi account",
          html: verifyEmailTemplate(
            name || existingUser.name,
            otp
          ),
        });

        return {
          success: true,
          message:
            "Verification email sent. Please verify your account.",
          email: normalizedEmail,
        };
      }

      throw new Error(
        "User already exists. Please sign in instead."
      );
    }

    // ------------------------
    // Create User
    // ------------------------

    const hashedPassword =
      await passwordService.hash(password);

    const user =
      await authRepository.createUser({
        name,
        email: normalizedEmail,
        password: hashedPassword,
      });

    // ------------------------
    // Generate OTP
    // ------------------------

    const otp =
      await otpService.create(
        user.id,
        normalizedEmail,
        OTPPurpose.EMAIL_VERIFICATION
      );

    // ------------------------
    // Send Email
    // ------------------------

    await sendEmail({
      to: normalizedEmail,
      subject: "Verify your Saathi account",
      html: verifyEmailTemplate(
        user.name,
        otp
      ),
    });

    return {
      success: true,
      message:
        "Account created successfully. Please verify your email.",
      email: normalizedEmail,
    };
  }

  async resendOTP(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await authRepository.findUserByEmail(
    normalizedEmail
  );

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.emailVerified) {
    throw new Error("Email is already verified.");
  }

  const otp = await otpService.resend(
    user.id,
    normalizedEmail,
    OTPPurpose.EMAIL_VERIFICATION
  );

  await sendEmail({
    to: normalizedEmail,
    subject: "Verify your Saathi account",
    html: verifyEmailTemplate(
      user.name,
      otp
    ),
  });

  return {
    success: true,
    message: "Verification email sent successfully.",
  };
}

  async verifyEmail(email: string, otp: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await authRepository.findUserByEmail(normalizedEmail);
    if (!user) {
      throw new Error("User not found.");
    }

    await otpService.verify(normalizedEmail, otp, OTPPurpose.EMAIL_VERIFICATION);
    await authRepository.markEmailVerified(user.id);

    return {
      success: true,
      message: "Email verified successfully.",
    };
  }
}

export default new RegisterService();