import {
  Profile,
  Skill,
  Interest,
  CareerGoal,
  ResumeAnalysis,
} from "@prisma/client";
import { RecommendationAnalysis, RecommendedOpportunity } from "@/types/recommendation";
import { calculateProfileCompletion } from "@/lib/profile/completion";

type ProfileWithRelations = Profile & {
  skills?: Skill[];
  interests?: Interest[];
  careerGoals?: CareerGoal[];
};

function generateBestFor(recommendation: RecommendedOpportunity): string {
  const parts: string[] = [];

  if (recommendation.course) {
    parts.push(`students studying ${recommendation.course}`);
  } else if (recommendation.educationLevel) {
    parts.push(`${recommendation.educationLevel.toLowerCase()} students`);
  } else {
    parts.push("ambitious students");
  }

  if (recommendation.specialization) {
    parts.push(`specializing in ${recommendation.specialization}`);
  }

  if (Array.isArray(recommendation.skills) && recommendation.skills.length > 0) {
    const topSkills = recommendation.skills.slice(0, 3).join(", ");
    parts.push(`with interest in ${topSkills}`);
  } else if (recommendation.organization) {
    parts.push(`aiming for roles at ${recommendation.organization}`);
  }

  return `Best for ${parts.join(" ")}.`;
}

function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string"
  );
}

export function analyzeRecommendation(
  profile: ProfileWithRelations | null,
  recommendation: RecommendedOpportunity,
  resumeAnalysis?: ResumeAnalysis | null
): RecommendationAnalysis {
  const score = recommendation.matchScore ?? 0;
  const resumeStrengths =
  getStringArray(
    resumeAnalysis?.strengths
  );

const resumeMissingSkills =
  getStringArray(
    resumeAnalysis?.missingSkills
  );
  // Step 2 — Derive strengths & missing directly from precomputed breakdown
  const strengths: string[] = (recommendation.breakdown || [])
    .filter((item) => item.matched)
    .map((item) => `${item.category} matches`);

  if (resumeStrengths.length > 0) {
  const opportunityText = `
    ${recommendation.title}
    ${recommendation.description}
    ${recommendation.organization}
    ${
      Array.isArray(recommendation.skills)
        ? recommendation.skills.join(" ")
        : ""
    }
  `.toLowerCase();

  for (const strength of resumeStrengths) {
    if (
      opportunityText.includes(
        strength.toLowerCase()
      )
    ) {
      strengths.push(
        `Resume strength: ${strength}`
      );
    }
  }
}
  const missing: string[] = (recommendation.breakdown || [])
    .filter((item) => !item.matched)
    .map((item) => item.category);

   if (resumeMissingSkills.length > 0) {
  const opportunityText = `
    ${recommendation.title}
    ${recommendation.description}
    ${recommendation.organization}
    ${
      Array.isArray(recommendation.skills)
        ? recommendation.skills.join(" ")
        : ""
    }
  `.toLowerCase();

  for (const skill of resumeMissingSkills) {
    if (
      opportunityText.includes(
        skill.toLowerCase()
      )
    ) {
      missing.push(
        `Resume gap: ${skill}`
      );
    }
  }
}

  // Rule-based Next Steps
  const nextSteps: string[] = [];

  if (!profile?.resumeId) {
    nextSteps.push("Upload your resume.");
  }

  if (!profile?.githubUrl) {
    nextSteps.push("Add your GitHub profile.");
  }

  if (!profile?.linkedinUrl) {
    nextSteps.push("Add your LinkedIn profile.");
  }

  const completion = calculateProfileCompletion(profile);
  if (completion < 80) {
    nextSteps.push("Complete your profile.");
  }

  if (recommendation.title) {
    nextSteps.push(`Apply for ${recommendation.title} before the deadline.`);
  }

  // Step 7 — Compute "Best For" summary
  const bestFor = generateBestFor(recommendation);

  return {
    score,
    strengths,
    missing,
    nextSteps,
    bestFor,
  };
}