import recommendationRepository from "@/repositories/recommendation/recommendation.repository";
import { RECOMMENDATION_WEIGHTS } from "@/constants/recommendation-weights";
import { compareStrings } from "@/utils/recommendation";
import {
  MatchBreakdown,
  RecommendedOpportunity,
} from "@/types/recommendation";
import profileCompletionService from "../profile/profile-completion.service";

class RecommendationService {
  async getRecommendations(
    userId: string
  ): Promise<RecommendedOpportunity[]> {
    const profile =
      await recommendationRepository.getProfile(userId);

    if (!profile) {
      return [];
    }

    const opportunities =
      await recommendationRepository.getOpenOpportunities();

      const completion =
  profileCompletionService.calculate(profile);

if (completion.percentage < 50) {
  return [];
}
    const recommendations = opportunities.map((opportunity) => {
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
        (a, b) => a === b
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

      if (opportunity.featured) {
        possible += RECOMMENDATION_WEIGHTS.FEATURED;
        earned += RECOMMENDATION_WEIGHTS.FEATURED;

        breakdown.push({
          category: "Featured",
          matched: true,
          weight: RECOMMENDATION_WEIGHTS.FEATURED,
        });
      }

      const searchableText = `
${opportunity.title}
${opportunity.description}
${opportunity.organization}
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

      const matchScore =
        possible === 0
          ? 0
          : Math.round((earned / possible) * 100);

      return {
        ...opportunity,
        matchScore,
        breakdown,
      };
    });

    return recommendations.sort(
      (a, b) => b.matchScore - a.matchScore
    );
  }
}

export default new RecommendationService();