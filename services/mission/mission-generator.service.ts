import prisma from "@/lib/prisma";
import {
  MissionCategory,
  MissionPriority,
} from "@prisma/client";

class MissionGeneratorService {
  async generate(userId: string) {

    const [
      profile,
      latestResume,
      saved,
      applications,
      documents,
    ] = await Promise.all([
      prisma.profile.findUnique({
        where: {
          userId,
        },
      }),

      prisma.resumeAnalysis.findFirst({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.savedOpportunity.count({
        where: {
          userId,
        },
      }),

      prisma.application.count({
        where: {
          userId,
        },
      }),

      prisma.document.count({
        where: {
          userId,
        },
      }),
    ]);

    /*
     * Rule 1
     */

    if (documents === 0 && !latestResume) {
      return {
        title: "Upload Your Resume",
        description:
          "Upload your resume to unlock AI analysis and personalized opportunities.",
        category: MissionCategory.RESUME,
        priority: MissionPriority.HIGH,
        estimatedMinutes: 5,
        rewardResumeScore: 5,
        rewardXP: 20,
      };
    }

    /*
     * Rule 2
     */

    if (
      latestResume &&
      latestResume.overallScore < 70
    ) {
      return {
        title: "Improve Resume Quality",
        description:
          "Your resume needs improvement before applying for opportunities.",
        category: MissionCategory.RESUME,
        priority: MissionPriority.HIGH,
        estimatedMinutes: 20,
        rewardResumeScore: 10,
        rewardOpportunityMatch: 8,
        rewardXP: 40,
      };
    }

    /*
     * Rule 3
     */

    if (!profile?.isProfileCompleted) {
      return {
        title: "Complete Your Profile",
        description:
          "Finish your profile to improve recommendation accuracy.",
        category: MissionCategory.PROFILE,
        priority: MissionPriority.HIGH,
        estimatedMinutes: 10,
        rewardProfileScore: 10,
        rewardXP: 25,
      };
    }

    /*
     * Rule 4
     */

    if (saved === 0) {
      return {
        title: "Explore Opportunities",
        description:
          "Save opportunities that match your interests.",
        category: MissionCategory.APPLICATION,
        priority: MissionPriority.MEDIUM,
        estimatedMinutes: 15,
        rewardXP: 20,
      };
    }

    /*
     * Rule 5
     */

    if (
      saved > 0 &&
      applications === 0
    ) {
      return {
        title: "Apply to Your Best Match",
        description:
          "Take the next step by applying to a saved opportunity.",
        category: MissionCategory.APPLICATION,
        priority: MissionPriority.HIGH,
        estimatedMinutes: 20,
        rewardOpportunityMatch: 10,
        rewardXP: 50,
      };
    }

    /*
     * Default
     */

    return {
      title: "Build a New Skill",
      description:
        "Continue learning to improve your future opportunity matches.",
      category: MissionCategory.SKILL,
      priority: MissionPriority.LOW,
      estimatedMinutes: 30,
      rewardXP: 30,
    };
  }
}

export default new MissionGeneratorService();