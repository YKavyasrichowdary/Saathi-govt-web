import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import profileService from "@/services/profile/profile.service";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const [user, profile] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, name: true, email: true, image: true },
      }),
      profileService.getProfile(session.user.id),
    ]);

    return NextResponse.json({
      success: true,
      user,
      profile,
    });
  } catch (error) {
    console.error("Fetch profile error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();
    const { name, phone, school, state, city, institutionName } = body;

    // Update User name if provided
    if (name) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { name },
      });
    }

    // Upsert Profile fields
    await profileService.completeProfile(session.user.id, {
      phone,
      institutionName: school || institutionName,
      state,
      city,
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });

  } catch (error) {
    console.error("Save profile error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}