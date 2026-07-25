import { RecommendationAnalysis } from "./types";

export function analyzeRecommendation(
  profile: any,
  opportunity: any
): RecommendationAnalysis {
  let score = 0;
  const strengths: string[] = [];
  const missing: string[] = [];
  const nextSteps: string[] = [];

  // Course Match
  if (
    profile?.course &&
    opportunity?.course &&
    profile.course.toLowerCase() === opportunity.course.toLowerCase()
  ) {
    score += 20;
    strengths.push(`${profile.course} matches`);
  }

  // Specialization Match
  if (
    profile?.specialization &&
    opportunity?.specialization &&
    profile.specialization.toLowerCase() === opportunity.specialization.toLowerCase()
  ) {
    score += 15;
    strengths.push(`${profile.specialization} matches`);
  }

  // Graduation Year Match
  if (
    profile?.graduationYear &&
    opportunity?.graduationYear &&
    profile.graduationYear === opportunity.graduationYear
  ) {
    score += 10;
    strengths.push("Eligible graduation year");
  }

  // Skills Analysis
  const profileSkillNames: string[] = Array.isArray(profile?.skills)
    ? profile.skills
        .map((s: any) => (typeof s === "string" ? s : s?.name))
        .filter(Boolean)
    : [];

  const opportunitySkillNames: string[] = Array.isArray(opportunity?.skills)
    ? opportunity.skills
        .map((s: any) => (typeof s === "string" ? s : s?.name))
        .filter(Boolean)
    : [];

  let commonSkillsCount = 0;

  for (const skill of opportunitySkillNames) {
    const isMatched = profileSkillNames.some(
      (ps) => ps.toLowerCase() === skill.toLowerCase()
    );

    if (isMatched) {
      commonSkillsCount++;
      strengths.push(`${skill} matches`);
    } else {
      missing.push(skill);
    }
  }

  score += commonSkillsCount * 8;

  // Next Steps Generation
  const hasResume =
    !!profile?.resumeId ||
    (Array.isArray(profile?.documents) &&
      profile.documents.some((doc: any) => doc.type === "RESUME"));

  if (!hasResume) {
    nextSteps.push("Upload your resume.");
  }

  for (const missingSkill of missing) {
    nextSteps.push(`Learn ${missingSkill} fundamentals.`);
  }

  if (!profile?.isProfileCompleted) {
    nextSteps.push("Complete your profile.");
  }

  // Clamp Score
  score = Math.min(score, 100);

  return {
    score,
    strengths,
    missing,
    nextSteps,
  };
}
