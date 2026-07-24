import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { stage = [], dreams = [], context = [], commit = [] } = body;

    const stageText = Array.isArray(stage) ? stage.join(", ") : stage;
    const commitText = Array.isArray(commit) ? commit.join(", ") : commit;
    const bioSummary = [
      stageText ? `Stage: ${stageText}` : "",
      commitText ? `Commitment: ${commitText}` : "",
    ]
      .filter(Boolean)
      .join(" · ");

    let profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          userId: session.user.id,
          bio: bioSummary || "Student",
          isProfileCompleted: true,
        },
      });
    } else {
      profile = await prisma.profile.update({
        where: { userId: session.user.id },
        data: {
          bio: bioSummary || profile.bio || "Student",
          isProfileCompleted: true,
        },
      });
    }

    // Save Career Goals from dreams
    if (Array.isArray(dreams)) {
      for (const dream of dreams) {
        if (dream && typeof dream === "string") {
          await prisma.careerGoal.upsert({
            where: {
              profileId_title: {
                profileId: profile.id,
                title: dream,
              },
            },
            create: {
              profileId: profile.id,
              title: dream,
            },
            update: {},
          });
        }
      }
    }

    // Save Interests from context
    if (Array.isArray(context)) {
      for (const item of context) {
        if (item && typeof item === "string") {
          await prisma.interest.upsert({
            where: {
              profileId_name: {
                profileId: profile.id,
                name: item,
              },
            },
            create: {
              profileId: profile.id,
              name: item,
            },
            update: {},
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Onboarding completed successfully",
    });
  } catch (error) {
    console.error("Onboarding submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to save onboarding data.",
      },
      { status: 500 }
    );
  }
}
