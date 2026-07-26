import prisma from "@/lib/prisma";

import { gemini } from "@/lib/ai/gemini";

import repository from "@/repositories/roadmap/roadmap.repository";

import { buildRoadmapPrompt } from "@/lib/ai/roadmap-prompt";

import { roadmapSchema } from "@/lib/validations/roadmap-schema";

import { parseAIJson } from "@/lib/ai/parser";

interface GenerateRoadmapInput {

  userId: string;

  opportunityId: string;

  dailyHours: number;

  confidence:
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED";

  goal:
    | "QUALIFY"
    | "COMPETITIVE";

  preferredStudyTime:
    | "MORNING"
    | "AFTERNOON"
    | "EVENING"
    | "NIGHT";

}

class RoadmapGeneratorService {

  async generateRoadmap(
    input: GenerateRoadmapInput
  ) {

    // Step 2 — Fetch Required Data
    const [
      user,
      profile,
      resume,
      opportunity,
    ] = await Promise.all([

      prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      }),

      prisma.profile.findUnique({
        where: {
          userId: input.userId,
        },
        include: {
          skills: true,
          interests: true,
          careerGoals: true,
        },
      }),

      prisma.resumeAnalysis.findFirst({
        where: {
          userId: input.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.opportunity.findUnique({
        where: {
          id: input.opportunityId,
        },
      }),

    ]);

    if (!user) {
      throw new Error("User not found.");
    }

    if (!profile) {
      throw new Error("Profile not found.");
    }

    if (!resume) {
      throw new Error(
        "Resume analysis not found."
      );
    }

    if (!opportunity) {
      throw new Error(
        "Opportunity not found."
      );
    }

    // Step 3 — Build AI Context
    const aiContext = {
      student: {
        course: profile.course,
        branch: profile.specialization,
        cgpa: profile.cgpa,
        githubUrl: profile.githubUrl,
        linkedinUrl: profile.linkedinUrl,
        portfolioUrl: profile.portfolioUrl,
      },

      resume: {
        score: resume.overallScore,
        ats: resume.atsScore,
        strengths: resume.strengths,
        weaknesses: resume.weaknesses,
        missingSkills: resume.missingSkills,
        improvements: resume.improvements,
      },

      skills: profile.skills.map(
        (skill) => skill.name
      ),

      interests: profile.interests.map(
        (interest) => interest.name
      ),

      careerGoals: profile.careerGoals.map(
        (goal) => goal.title
      ),

      preferences: {
        dailyHours: input.dailyHours,
        confidence: input.confidence,
        goal: input.goal,
        preferredStudyTime: input.preferredStudyTime,
      },

      opportunity: {
        title: opportunity.title,
        description: opportunity.description,
        deadline: opportunity.deadline,
        type: opportunity.type,
      },
    };

    // Step 4 — Build Prompt
    const prompt = buildRoadmapPrompt(aiContext);

    // Step 5 — Gemini (with Try/Catch)
    let response;

    try {

      response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      });

    } catch (error) {

      console.error(
        "Roadmap Generation Error",
        error
      );

      throw new Error(
        "Failed to generate AI roadmap."
      );

    }

    // Step 6 — Parse & Validate
    const parsed = parseAIJson(response.text ?? "");
    const roadmap = roadmapSchema.parse(parsed);

    // Step 7 — Save Using Nested Create (O(N) index mapping)
    const savedRoadmap = await repository.createRoadmap({
      title: roadmap.title,
      description: roadmap.description,
      readinessScore: roadmap.readinessScore,
      targetScore: roadmap.targetScore,
      estimatedDays: roadmap.estimatedDays,
      aiSummary: roadmap.summary,
      generatedBy: "gemini-2.5-flash",

      user: {
        connect: {
          id: input.userId,
        },
      },

      opportunity: {
        connect: {
          id: input.opportunityId,
        },
      },

      milestones: {
        create: roadmap.milestones.map((milestone, milestoneIndex) => ({
          title: milestone.title,
          description: milestone.description,
          order: milestoneIndex + 1,
          tasks: {
            create: milestone.tasks.map((task, taskIndex) => ({
              title: task.title,
              description: task.description,
              estimatedMinutes: task.estimatedMinutes,
              rewardXP: task.rewardXP,
              order: taskIndex + 1,
            })),
          },
        })),
      },
    });

    return savedRoadmap;
  }
}

export default new RoadmapGeneratorService();