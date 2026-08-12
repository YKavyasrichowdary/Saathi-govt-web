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
    const session =
      await getServerSession(authOptions);

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

    const {
      name,
      phone,
      gender,
      dateOfBirth,
      educationLevel,
      institutionName,
      school,
      university,
      course,
      specialization,
      currentSemester,
      graduationYear,
      cgpa,
      city,
      state,
      country,
      bio,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      skills,
      interests,
      careerGoals,
    } = body;

    // Update User name separately because
    // name belongs to User, not Profile.
    if (typeof name === "string") {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          name: name.trim(),
        },
      });
    }

    const profile =
      await profileService.completeProfile(
        session.user.id,
        {
          phone,
          gender,
          dateOfBirth,
          educationLevel,

          // Keep backward compatibility with
          // the old "school" field.
          institutionName:
            institutionName || school,

          university,
          course,
          specialization,
          currentSemester,
          graduationYear,
          cgpa,
          city,
          state,
          country,
          bio,
          linkedinUrl,
          githubUrl,
          portfolioUrl,
          skills,
          interests,
          careerGoals,
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Profile updated successfully.",
      profile,
    });
  } catch (error) {
    console.error(
      "Save profile error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}