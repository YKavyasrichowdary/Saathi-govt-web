import { Profile } from "@prisma/client";

type ProfileWithRelations = Profile & {
  skills?: unknown[];
  interests?: unknown[];
  careerGoals?: unknown[];
};

export function calculateProfileCompletion(
  profile: ProfileWithRelations | null
): number {
  if (!profile) return 0;

  const fields = [
    profile.phone,
    profile.gender,
    profile.dateOfBirth,
    profile.city,
    profile.state,
    profile.country,
    profile.bio,

    profile.educationLevel,
    profile.institutionName,
    profile.university,
    profile.course,
    profile.specialization,
    profile.currentSemester,
    profile.graduationYear,
    profile.cgpa,

    profile.linkedinUrl,
    profile.githubUrl,
    profile.portfolioUrl,
    profile.resumeId,
  ];

  let completed = fields.filter((field) => {
    if (field === null || field === undefined) {
      return false;
    }

    if (typeof field === "string") {
      return field.trim() !== "";
    }

    return true;
  }).length;

  if (profile.skills?.length) completed++;

  if (profile.interests?.length) completed++;

  if (profile.careerGoals?.length) completed++;

  const total = fields.length + 3;

  return Math.round(
    (completed / total) * 100
  );
}