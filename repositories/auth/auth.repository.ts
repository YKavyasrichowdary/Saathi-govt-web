import prisma from "@/lib/prisma";
import { OTPPurpose } from "@prisma/client";

class AuthRepository {
  /* ==========================
      USER
  ========================== */

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return prisma.user.create({
      data,
    });
  }

  async updatePassword(
    userId: string,
    password: string
  ) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }

  async markEmailVerified(userId: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });
  }

  async updateLastLogin(userId: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lastLogin: new Date(),
      },
    });
  }

  /* ==========================
      OTP
  ========================== */

  async createOTP(data: {
    userId: string;
    email: string;
    otpHash: string;
    purpose: OTPPurpose;
    expiresAt: Date;
  }) {
    return prisma.oTPVerification.create({
      data,
    });
  }

  async getLatestOTP(
    email: string,
    purpose: OTPPurpose
  ) {
    return prisma.oTPVerification.findFirst({
      where: {
        email,
        purpose,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOTP(
    email: string,
    purpose: OTPPurpose
  ) {
    return prisma.oTPVerification.findFirst({
      where: {
        email,
        purpose,
      },
    });
  }

  async deleteOTP(
    email: string,
    purpose: OTPPurpose
  ) {
    return prisma.oTPVerification.deleteMany({
      where: {
        email,
        purpose,
      },
    });
  }

  async incrementAttempts(id: string) {
    return prisma.oTPVerification.update({
      where: {
        id,
      },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });
  }

  async markOTPUsed(id: string) {
    return prisma.oTPVerification.update({
      where: {
        id,
      },
      data: {
        usedAt: new Date(),
      },
    });
  }
}

export default new AuthRepository();