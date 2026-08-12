import prisma from "@/lib/prisma";
import { gemini } from "@/lib/ai/gemini";
import repository from "@/repositories/roadmap/roadmap.repository";
import opportunityMatchRepository from "@/repositories/opportunity-match/opportunity-match.repository";
import { buildRoadmapPrompt } from "@/lib/ai/roadmap-prompt";
import { roadmapSchema } from "@/lib/validations/roadmap-schema";
import { parseAIJson } from "@/lib/ai/parser";
import { validateRoadmapCapacity } from "@/lib/ai/roadmap-validator";
import { scheduleTasks } from "@/lib/roadmap/task-scheduler";
import opportunityMatchService from "@/services/opportunity-match/opportunity-match.service";
import activityService from "@/services/progress/activity.service";


export interface GenerateRoadmapInput {
  userId: string;
  opportunityId: string;
  dailyHours: number;
  confidence: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  goal: "QUALIFY" | "COMPETITIVE";
  preferredStudyTime: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT";
  targetDate: string;
}

class RoadmapGeneratorService {
  async generateRoadmap(input: GenerateRoadmapInput) {
    // Step 2 — Calculate available days & hard validation
    const today = new Date();
    const targetDate = new Date(input.targetDate);
    const availableDays = Math.max(
      0,
      Math.ceil(
        (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    if (availableDays <= 0) {
      throw new Error("Target date must be in the future.");
    }

    // Step 3 — Fetch Required Data
    const [user, profile, resume, opportunity] = await Promise.all([
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

    let opportunityMatch =
      await opportunityMatchRepository.getByUserAndOpportunity(
        input.userId,
        input.opportunityId
      );

    if (!opportunityMatch) {
      opportunityMatch =
        await opportunityMatchService.analyze({
          userId: input.userId,
          opportunityId: input.opportunityId,
        });
    }

    // Step 4 — Validation
    if (!user) {
      throw new Error("User not found.");
    }

    if (!profile) {
      throw new Error("Profile not found.");
    }

    if (!resume) {
      throw new Error("Resume analysis not found.");
    }

    if (!opportunity) {
      throw new Error("Opportunity not found.");
    }

    // Step 5 — Add Match + Deadline to AI Context
    const aiContext = {
      match: {
        matchScore: opportunityMatch.matchScore,
        readinessScore: opportunityMatch.readinessScore,
        strengths: opportunityMatch.strengths,
        missingSkills: opportunityMatch.missingSkills,
        recommendations: opportunityMatch.recommendations,
        summary: opportunityMatch.summary,
      },

      preparation: {
        targetDate: input.targetDate,
        availableDays,
        dailyHours: input.dailyHours,
        maxPreparationMinutes:
          availableDays *
          input.dailyHours *
          60,
        confidence: input.confidence,
        goal: input.goal,
        preferredStudyTime: input.preferredStudyTime,
      },

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

      skills: profile.skills.map((skill: { name: string }) => skill.name),
      interests: profile.interests.map((interest: { name: string }) => interest.name),
      careerGoals: profile.careerGoals.map((goal: { title: string }) => goal.title),

      opportunity: {
        title: opportunity.title,
        description: opportunity.description,
        deadline: opportunity.deadline,
        type: opportunity.type,
      },
    };

    // Step 6 — Build Prompt
    const prompt = buildRoadmapPrompt(aiContext);

    // Gemini Call
    let response;

    try {
      response = await gemini.models.generateContent({
        model: "gemini-flash-latest",
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
      console.error("Roadmap Generation Error", error);
      throw new Error("Failed to generate AI roadmap.");
    }

    // Parse & Validate
    const parsed = parseAIJson(response.text ?? "");
    const roadmap = roadmapSchema.parse(parsed);

    const capacity =
      validateRoadmapCapacity({
        roadmap,
        availableDays,
        dailyHours: input.dailyHours,
      });

    const generatedTasks = roadmap.milestones.flatMap(
      (milestone) => milestone.tasks
    );

    const scheduledTasks = scheduleTasks({
      tasks: generatedTasks,
      availableDays,
      dailyHours: input.dailyHours,
    });

    let taskIndex = 0;

    const milestones = roadmap.milestones.map((milestone) => ({
      ...milestone,
      tasks: milestone.tasks.map((task) => {
        const scheduled = scheduledTasks[taskIndex];
        taskIndex += 1;
        return {
          ...task,
          estimatedMinutes: scheduled.estimatedMinutes,
          dayNumber: scheduled.dayNumber,
        };
      }),
    }));

    // Save Using Nested Create
    const savedRoadmap = await repository.createRoadmap({
      title: roadmap.title,
      description: roadmap.description,
      readinessScore: roadmap.readinessScore,
      targetScore: roadmap.targetScore,
      estimatedDays: availableDays,
      dailyHours: input.dailyHours,
      targetDate: new Date(input.targetDate),
      aiSummary: roadmap.summary,
      generatedBy: "gemini-flash-latest",

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
        create: milestones.map((milestone, milestoneIndex) => ({
          title: milestone.title,
          description: milestone.description,
          order: milestoneIndex + 1,
          tasks: {
            create: milestone.tasks.map((task, index) => ({
              title: task.title,
              description: task.description,
              estimatedMinutes: task.estimatedMinutes,
              rewardXP: task.rewardXP,
              order: index + 1,
              dayNumber: task.dayNumber,
            })),
          },
        })),
      },
    });

    await activityService.recordActivity(input.userId);

    return savedRoadmap;
  }
}

export default new RoadmapGeneratorService();