import bcrypt from "bcryptjs";
import { OTPPurpose } from "@prisma/client";

import authRepository from "@/repositories/auth/auth.repository";
import {
  MAX_OTP_ATTEMPTS,
  OTP_EXPIRY_MINUTES,
  OTP_LENGTH,
  OTP_RESEND_COOLDOWN,
} from "@/constants/auth";

class OTPService {
  /**
   * Generate a random numeric OTP
   */
  private generateOTP(): string {
    const min = Math.pow(10, OTP_LENGTH - 1);
    const max = Math.pow(10, OTP_LENGTH) - 1;

    return Math.floor(
      min + Math.random() * (max - min + 1)
    ).toString();
  }

  /**
   * Create a new OTP
   */
  async create(
    userId: string,
    email: string,
    purpose: OTPPurpose
  ) {
    const otp = this.generateOTP();

    const otpHash = await bcrypt.hash(otp, 10);

    // Delete existing OTP of same purpose
    await authRepository.deleteOTP(email, purpose);

    await authRepository.createOTP({
      userId,
      email,
      otpHash,
      purpose,
      expiresAt: new Date(
        Date.now() +
          OTP_EXPIRY_MINUTES * 60 * 1000
      ),
    });

    console.log(`\n🔑 [DEV OTP] Verification code for ${email}: ${otp}\n`);

    return otp;
  }

  /**
   * Verify OTP
   */
  async verify(
    email: string,
    otp: string,
    purpose: OTPPurpose
  ) {
    const record = await authRepository.findOTP(
      email,
      purpose
    );

    if (!record) {
      throw new Error("OTP not found.");
    }

    if (record.usedAt) {
      throw new Error("OTP already used.");
    }

    if (record.expiresAt < new Date()) {
      throw new Error("OTP expired.");
    }

    if (
      record.attempts >=
      MAX_OTP_ATTEMPTS
    ) {
      throw new Error(
        "Maximum verification attempts exceeded."
      );
    }

    const valid = await bcrypt.compare(
      otp,
      record.otpHash
    );

    if (!valid) {
      await authRepository.incrementAttempts(
        record.id
      );

      throw new Error("Invalid OTP.");
    }

    await authRepository.markOTPUsed(
      record.id
    );

    return true;
  }

  /**
   * Resend OTP
   */
  async resend(
    userId: string,
    email: string,
    purpose: OTPPurpose
  ) {
    const latest =
      await authRepository.getLatestOTP(
        email,
        purpose
      );

    if (latest) {
      const diff =
        Date.now() -
        latest.createdAt.getTime();

      if (
        diff <
        OTP_RESEND_COOLDOWN * 1000
      ) {
        throw new Error(
          `Please wait ${OTP_RESEND_COOLDOWN} seconds before requesting another OTP.`
        );
      }
    }

    return this.create(
      userId,
      email,
      purpose
    );
  }
}

export default new OTPService();