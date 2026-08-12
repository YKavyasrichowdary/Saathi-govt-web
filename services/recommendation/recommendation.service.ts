import recommendationRepository from "@/repositories/recommendation/recommendation.repository";
import resumeAnalysisStorageService from "@/services/resume/resume-analysis-storage.service";
import { RECOMMENDATION_WEIGHTS } from "@/constants/recommendation-weights";
import {
  compareStrings,
  compareEducation,
} from "@/utils/recommendation";
import {
  MatchBreakdown,
  RecommendedOpportunity,
} from "@/types/recommendation";
import profileCompletionService from "../profile/profile-completion.service";
import { analyzeRecommendation } from "@/lib/intelligence";


function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string"
  );
}

class RecommendationService {
  async getRecommendations(
    userId: string
  ): Promise<RecommendedOpportunity[]> {
    const profile =
  await recommendationRepository.getProfile(userId);

if (!profile) {
  return [];
}

const resumeAnalysis =
  await resumeAnalysisStorageService.getPrimaryResumeAnalysis(
    userId
  );

const opportunities =
  await recommendationRepository.getOpenOpportunities(
    userId
  );

    const recommendations = opportunities.map((opportunity: any) => {
      let earned = 0;
      let possible = 0;

      const breakdown: MatchBreakdown[] = [];

      function evaluate(
        category: string,
        weight: number,
        opportunityValue: unknown,
        profileValue: unknown,
        compare: (a: unknown, b: unknown) => boolean
      ) {
        if (
          opportunityValue === null ||
          opportunityValue === undefined
        ) {
          return;
        }

        possible += weight;

        const matched =
          profileValue !== null &&
          profileValue !== undefined &&
          compare(profileValue, opportunityValue);

        if (matched) {
          earned += weight;
        }

        breakdown.push({
          category,
          matched,
          weight,
        });
      }

      evaluate(
        "Education",
        RECOMMENDATION_WEIGHTS.EDUCATION,
        opportunity.educationLevel,
        profile.educationLevel,
        compareEducation
      );

      evaluate(
        "Course",
        RECOMMENDATION_WEIGHTS.COURSE,
        opportunity.course,
        profile.course,
        (a, b) => compareStrings(String(a), String(b))
      );

      evaluate(
        "Specialization",
        RECOMMENDATION_WEIGHTS.SPECIALIZATION,
        opportunity.specialization,
        profile.specialization,
        (a, b) => compareStrings(String(a), String(b))
      );

      evaluate(
        "State",
        RECOMMENDATION_WEIGHTS.STATE,
        opportunity.state,
        profile.state,
        (a, b) => compareStrings(String(a), String(b))
      );

      if (opportunity.minCGPA !== null) {
        possible += RECOMMENDATION_WEIGHTS.CGPA;

        const matched =
          profile.cgpa !== null &&
          profile.cgpa >= opportunity.minCGPA;

        if (matched) {
          earned += RECOMMENDATION_WEIGHTS.CGPA;
        }

        breakdown.push({
          category: "CGPA",
          matched,
          weight: RECOMMENDATION_WEIGHTS.CGPA,
        });
      }

      const searchableText = `
  ${opportunity.title}
  ${opportunity.description}
  ${opportunity.organization}
  ${opportunity.skills.join(" ")}
  ${opportunity.interests.join(" ")}
  ${opportunity.careerTags.join(" ")}
`.toLowerCase();

      if (profile.skills && profile.skills.length > 0) {
        possible += RECOMMENDATION_WEIGHTS.SKILL;
        for (const skill of profile.skills) {
          if (
            searchableText.includes(skill.name.toLowerCase())
          ) {
            earned += RECOMMENDATION_WEIGHTS.SKILL;

            breakdown.push({
              category: `Skill: ${skill.name}`,
              matched: true,
              weight: RECOMMENDATION_WEIGHTS.SKILL,
            });

            break;
          }
        }
      }

      const resumeStrengths =
        getStringArray(
          resumeAnalysis?.strengths
        );

      const resumeMissingSkills =
        getStringArray(
          resumeAnalysis?.missingSkills
        );

      if (resumeMissingSkills.length > 0) {
        const matchingMissingSkill =
          resumeMissingSkills.find(
            (skill) =>
              searchableText.includes(
                skill.toLowerCase()
              )
          );

        if (matchingMissingSkill) {
          breakdown.push({
            category: `Resume Gap: ${matchingMissingSkill}`,
            matched: false,
            weight: 0,
          });
        }
      }

      if (resumeStrengths.length > 0) {
        for (const strength of resumeStrengths) {
          if (
            searchableText.includes(
              strength.toLowerCase()
            )
          ) {
            breakdown.push({
              category: `Resume Strength: ${strength}`,
              matched: true,
              weight: 0,
            });

            break;
          }
        }
      }

      if (profile.interests && profile.interests.length > 0) {
        possible += RECOMMENDATION_WEIGHTS.INTEREST;
        for (const interest of profile.interests) {
          if (
            searchableText.includes(
              interest.name.toLowerCase()
            )
          ) {
            earned += RECOMMENDATION_WEIGHTS.INTEREST;

            breakdown.push({
              category: `Interest: ${interest.name}`,
              matched: true,
              weight: RECOMMENDATION_WEIGHTS.INTEREST,
            });

            break;
          }
        }
      }

      if (profile.careerGoals && profile.careerGoals.length > 0) {
        possible += RECOMMENDATION_WEIGHTS.CAREER_GOAL;
        for (const goal of profile.careerGoals) {
          if (
            searchableText.includes(
              goal.title.toLowerCase()
            )
          ) {
            earned += RECOMMENDATION_WEIGHTS.CAREER_GOAL;

            breakdown.push({
              category: `Career Goal: ${goal.title}`,
              matched: true,
              weight: RECOMMENDATION_WEIGHTS.CAREER_GOAL,
            });

            break;
          }
        }
      }

      const profileMatchScore =
        possible === 0
          ? 0
          : Math.round(
              (earned / possible) * 100
            );

      const opportunitySkills =
        opportunity.skills.map((skill: string) =>
          skill.toLowerCase().trim()
        );

      let resumeMatchScore = 50;

      if (
        resumeAnalysis &&
        opportunitySkills.length > 0
      ) {
        let matchedSkills = 0;

        for (const skill of opportunitySkills) {
          const hasStrength =
            resumeStrengths.some(
              (strength) =>
                strength
                  .toLowerCase()
                  .includes(skill) ||
                skill.includes(
                  strength.toLowerCase()
                )
            );

          if (hasStrength) {
            matchedSkills++;
          }
        }

        resumeMatchScore =
          Math.round(
            (matchedSkills /
              opportunitySkills.length) *
              100
          );

        // Penalize relevant skills explicitly
        // identified as missing from the resume.
        for (const missingSkill of resumeMissingSkills) {
          const normalizedMissing =
            missingSkill.toLowerCase().trim();

          if (
            opportunitySkills.some(
              (skill: string) =>
                skill.includes(
                  normalizedMissing
                ) ||
                normalizedMissing.includes(
                  skill
                )
            )
          ) {
            resumeMatchScore = Math.max(
              0,
              resumeMatchScore - 10
            );
          }
        }
      }

      const matchScore =
        Math.round(
          profileMatchScore * 0.7 +
          resumeMatchScore * 0.3
        );

      return {
        ...opportunity,
        matchScore,
        profileMatchScore,
        resumeMatchScore,
        breakdown,
         isSaved:
    Boolean(opportunity.bookmarks?.length),
      };
    });

    const sorted = recommendations.sort(
      (a: any, b: any) => b.matchScore - a.matchScore
    );

    const enhancedRecommendations = sorted.map(
      (recommendation: any) => ({
        ...recommendation,

        analysis: analyzeRecommendation(
          profile,
          recommendation,
          resumeAnalysis  
        ),
      })
    );

    return enhancedRecommendations;
  }
}

export default new RecommendationService();