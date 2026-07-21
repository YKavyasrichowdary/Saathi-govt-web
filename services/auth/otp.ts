import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { OTPPurpose } from "@prisma/client";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 10;

export async function generateOTP() {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
}

export async function hashOTP(
  otp: string
) {
  return bcrypt.hash(otp, 10);
}

export async function saveOTP({
  email,
  otp,
  purpose,
}: {
  email: string;
  otp: string;
  purpose: OTPPurpose;
}) {
  const otpHash = await hashOTP(otp);

  await prisma.oTPVerification.deleteMany({
    where: {
      email,
      purpose,
    },
  });

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found for OTP generation");
  }

  return prisma.oTPVerification.create({
    data: {
      userId: user.id,
      email,
      otpHash,
      purpose,
      expiresAt: new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
      ),
    },
  });
}

export async function verifyOTP({
  email,
  otp,
  purpose,
}: {
  email: string;
  otp: string;
  purpose: OTPPurpose;
}) {
  const record =
    await prisma.oTPVerification.findFirst({
      where: {
        email,
        purpose,
      },
    });

  if (!record)
    return false;

  if (
    record.expiresAt <
    new Date()
  ) {
    return false;
  }

  const valid =
    await bcrypt.compare(
      otp,
      record.otpHash
    );

  if (!valid) {
    await prisma.oTPVerification.update({
      where: {
        id: record.id,
      },
      data: {
        attempts:
          record.attempts + 1,
      },
    });

    return false;
  }

  await prisma.oTPVerification.delete({
    where: {
      id: record.id,
    },
  });

  return true;
}