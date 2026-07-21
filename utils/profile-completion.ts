import { Profile, Skill, Interest, CareerGoal } from "@prisma/client";

interface CompletionInput {
  profile: Partial<Profile>;
  skills: Skill[];
  interests: Interest[];
  careerGoals: CareerGoal[];
}

export function calculateProfileCompletion({
  profile,
  skills,
  interests,
  careerGoals,
}: CompletionInput): number {
  let score = 0;

  if (profile.phone) score += 5;
  if (profile.college) score += 10;
  if (profile.degree) score += 10;
  if (profile.branch) score += 10;
  if (profile.currentYear) score += 5;
  if (profile.cgpa) score += 10;
  if (profile.bio) score += 10;
  if (profile.linkedinUrl) score += 10;
  if (profile.githubUrl) score += 10;
  if (profile.portfolioUrl) score += 10;

  if (skills.length > 0) score += 10;
  if (interests.length > 0) score += 5;
  if (careerGoals.length > 0) score += 5;

  return Math.min(score, 100);
}