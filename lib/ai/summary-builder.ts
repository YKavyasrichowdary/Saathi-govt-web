import { DailySummary } from "@/components/ai/types";

interface SummaryContext {
  profileCompletion: number;
  recommendationCount: number;
  topRecommendation?: string;
}

export function buildDailySummary(
  context: SummaryContext
): DailySummary {
  return {
    greeting: "Good evening! I've reviewed your progress.",

    priority: context.topRecommendation
      ? `${context.topRecommendation} is your highest priority today.`
      : "No urgent opportunities today.",

    profile:
      context.profileCompletion >= 80
        ? `Your profile is ${context.profileCompletion}% complete. You're in good shape, but a few improvements can make it even stronger.`
        : `Your profile is ${context.profileCompletion}% complete. Completing it will improve your recommendations.`,

    opportunities:
      context.recommendationCount > 0
        ? `${context.recommendationCount} opportunities currently match your profile.`
        : "No matching opportunities found yet.",

    advice:
      "Apply to high-priority opportunities before their deadlines and keep your resume updated.",
  };
}