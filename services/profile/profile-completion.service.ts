import { Profile } from "@prisma/client";

export interface CompletionResult {
  percentage: number;
  completed: string[];
  remaining: string[];
}

class ProfileCompletionService {
  calculate(profile: Profile & {
    skills: { id: string }[];
    interests: { id: string }[];
    careerGoals: { id: string }[];
    name?: string;
    user?: { name?: string | null } | null;
  }): CompletionResult {

    let score = 0;

    const completed: string[] = [];
    const remaining: string[] = [];

    function check(
      condition: boolean,
      label: string,
      weight: number
    ) {
      if (condition) {
        score += weight;
        completed.push(label);
      } else {
        remaining.push(label);
      }
    }

    check(!!profile.name || !!profile.user?.name, "Name", 10);

    check(!!profile.phone, "Phone", 10);

    check(
      !!profile.educationLevel,
      "Education",
      15
    );

    check(!!profile.course, "Course", 10);

    check(
      !!profile.specialization,
      "Specialization",
      5
    );

    check(profile.cgpa !== null, "CGPA", 10);

    check(
      profile.skills.length > 0,
      "Skills",
      15
    );

    check(
      profile.interests.length > 0,
      "Interests",
      10
    );

    check(
      profile.careerGoals.length > 0,
      "Career Goals",
      10
    );

    check(
      !!profile.resumeId,
      "Resume",
      5
    );

    check(
      !!profile.state && !!profile.city,
      "Location",
      10
    );

    return {
      percentage: score,
      completed,
      remaining,
    };
  }
}

export default new ProfileCompletionService();