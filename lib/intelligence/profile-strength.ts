import { Profile } from "@prisma/client";

export type ProfileStrengthLevel =
  | "Beginner"
  | "Developing"
  | "Strong"
  | "Excellent";

export type ProfileStrengthStatus =
  | "Needs Improvement"
  | "Almost Ready"
  | "Placement Ready";

export interface ProfileAction {
  label: string;
  href: string;
}

export interface ProfileStrength {
  score: number;
  level: ProfileStrengthLevel;
  status: ProfileStrengthStatus;
  strengths: string[];
  missing: string[];
  actions: ProfileAction[];
}

type ProfileWithRelations = Profile & {
  skills?: { name: string }[];
  careerGoals?: { title: string }[];
};

export function calculateProfileStrength(
  profile: ProfileWithRelations | null
): ProfileStrength {
  if (!profile) {
    return {
      score: 0,
      level: "Beginner",
      status: "Needs Improvement",
      strengths: [],
      missing: [],
      actions: [
        {
          label: "Create your profile",
          href: "/profile",
        },
      ],
    };
  }

  let score = 0;
  const strengths: string[] = [];
  const missing: string[] = [];
  const actions: ProfileAction[] = [];

  // Resume
  if (profile.resumeId) {
    score += 20;
    strengths.push("Resume uploaded.");
  } else {
    missing.push("Resume");
    actions.push({
      label: "Upload your resume",
      href: "/documents",
    });
  }

  // GitHub
  if (profile.githubUrl) {
    score += 15;
    strengths.push("GitHub profile added.");
  } else {
    missing.push("GitHub");
    actions.push({
      label: "Add your GitHub profile",
      href: "/profile",
    });
  }

  // LinkedIn
  if (profile.linkedinUrl) {
    score += 15;
    strengths.push("LinkedIn profile added.");
  } else {
    missing.push("LinkedIn");
    actions.push({
      label: "Add your LinkedIn profile",
      href: "/profile",
    });
  }

  // Portfolio
  if (profile.portfolioUrl) {
    score += 20;
    strengths.push("Portfolio available.");
  } else {
    missing.push("Portfolio");
    actions.push({
      label: "Create a portfolio website",
      href: "/profile",
    });
  }

  // Skills
  if (profile.skills && profile.skills.length >= 5) {
    score += 15;
    strengths.push(`${profile.skills.length} skills added.`);
  } else {
    missing.push("More Skills");
    actions.push({
      label: "Add at least 5 technical skills",
      href: "/profile",
    });
  }

  // Career Goal
  if (profile.careerGoals && profile.careerGoals.length > 0) {
    score += 15;
    strengths.push("Career goal defined.");
  } else {
    missing.push("Career Goal");
    actions.push({
      label: "Set a career goal",
      href: "/profile",
    });
  }

  score = Math.min(score, 100);

  let level: ProfileStrengthLevel;

  if (score >= 90) {
    level = "Excellent";
  } else if (score >= 75) {
    level = "Strong";
  } else if (score >= 50) {
    level = "Developing";
  } else {
    level = "Beginner";
  }

  let status: ProfileStrengthStatus;

  if (score >= 90) {
    status = "Placement Ready";
  } else if (score >= 60) {
    status = "Almost Ready";
  } else {
    status = "Needs Improvement";
  }

  return {
    score,
    level,
    status,
    strengths,
    missing,
    actions,
  };
}
