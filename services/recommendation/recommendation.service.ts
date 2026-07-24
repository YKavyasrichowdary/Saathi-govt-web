import recommendationRepository from "@/repositories/recommendation/recommendation.repository";
import {
  RecommendedOpportunity,
  MatchBreakdown,
} from "@/types/recommendation";

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
        30,
        opportunity.educationLevel,
        profile.educationLevel,
        (a, b) => a === b
      );

      evaluate(
        "Course",
        20,
        opportunity.course,
        profile.course,
        (a, b) =>
          String(a).toLowerCase() ===
          String(b).toLowerCase()
      );

      evaluate(
        "Specialization",
        15,
        opportunity.specialization,
        profile.specialization,
        (a, b) =>
          String(a).toLowerCase() ===
          String(b).toLowerCase()
      );

      evaluate(
        "State",
        10,
        opportunity.state,
        profile.state,
        (a, b) =>
          String(a).toLowerCase() ===
          String(b).toLowerCase()
      );

      if (opportunity.minCGPA !== null) {
        possible += 15;

        const matched =
          profile.cgpa !== null &&
          profile.cgpa >= opportunity.minCGPA;

        if (matched) {
          earned += 15;
        }

        breakdown.push({
          category: "CGPA",
          matched,
          weight: 15,
        });
      }

      if (opportunity.featured) {
        possible += 10;
        earned += 10;

        breakdown.push({
          category: "Featured",
          matched: true,
          weight: 10,
        });
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