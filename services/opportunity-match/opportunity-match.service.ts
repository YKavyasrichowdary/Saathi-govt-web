import prisma from "@/lib/prisma";
import { gemini } from "@/lib/ai/gemini";

import repository from "@/repositories/opportunity-match/opportunity-match.repository";
import { OpportunityMatchInput } from "@/types/opportunity-match";

import { opportunityMatchSchema } from "@/lib/validations/opportunity-match-schema";

import { OPPORTUNITY_MATCH_PROMPT } from "./prompts";

import { parseAIJson } from "@/lib/ai/parser";
import { buildOpportunityMatchContext } from "@/lib/ai/builders/opportunity-match-context";

class OpportunityMatchService {

  async analyze(
    input: OpportunityMatchInput
  ) {
    const [
      profile,
      resume,
      opportunity,
      existingMatch,
    ] = await Promise.all([
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

      repository.getByUserAndOpportunity(
        input.userId,
        input.opportunityId
      ),
    ]);

    if (!profile) {
      throw new Error("Profile not found.");
    }

    if (!resume) {
      throw new Error("Resume analysis not found.");
    }

    if (!opportunity) {
      throw new Error("Opportunity not found.");
    }

    const aiContext = buildOpportunityMatchContext({
      profile,
      resume,
      opportunity,
    });
    const prompt = `
${OPPORTUNITY_MATCH_PROMPT}

Student Context:

${JSON.stringify(aiContext, null, 2)}
`;

    const response =
      await gemini.models.generateContent({
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

    const parsed = parseAIJson(
      response.text ?? ""
    );

    const result =
      opportunityMatchSchema.parse(
        parsed
      );

    if (existingMatch) {
      return repository.update(
        existingMatch.id,
        {
          matchScore: result.matchScore,
          readinessScore: result.readinessScore,
          strengths: result.strengths,
          missingSkills: result.missingSkills,
          recommendations: result.recommendations,
          summary: result.summary,
          generatedBy: "gemini-flash-latest",
        }
      );
    }

    return repository.create({
      matchScore: result.matchScore,
      readinessScore: result.readinessScore,
      strengths: result.strengths,
      missingSkills: result.missingSkills,
      recommendations: result.recommendations,
      summary: result.summary,
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
    });
  }

  async getMatch(
    userId: string,
    opportunityId: string
  ) {
    return repository.getByUserAndOpportunity(
      userId,
      opportunityId
    );
  }
}

export default new OpportunityMatchService();