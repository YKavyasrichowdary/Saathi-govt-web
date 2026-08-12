import prisma from "@/lib/prisma";
import { calculateProfileCompletion } from "@/lib/profile/completion";
import { Gender, EducationLevel, SkillLevel } from "@prisma/client";

function normalizeGender(value: unknown): Gender | null | undefined {
  if (value === null) return null;
  if (typeof value !== "string" || !value.trim()) return undefined;

  const normalized = value.trim().toUpperCase().replace(/[\s-]+/g, "_");
  if (normalized === "MALE" || normalized === "BOY" || normalized === "MAN") return Gender.MALE;
  if (normalized === "FEMALE" || normalized === "GIRL" || normalized === "WOMAN") return Gender.FEMALE;
  if (normalized === "OTHER") return Gender.OTHER;
  if (normalized.includes("PREFER") || normalized.includes("NOT")) return Gender.PREFER_NOT_TO_SAY;

  if (Object.values(Gender).includes(normalized as Gender)) {
    return normalized as Gender;
  }
  return undefined;
}

function normalizeEducationLevel(value: unknown): EducationLevel | null | undefined {
  if (value === null) return null;
  if (typeof value !== "string" || !value.trim()) return undefined;

  const normalized = value.trim().toUpperCase().replace(/[\s-]+/g, "_");
  if (normalized === "UNDERGRADUATE" || normalized === "UG" || normalized === "BACHELOR" || normalized === "BACHELORS" || normalized === "B_TECH" || normalized === "BTECH") return EducationLevel.UNDERGRADUATE;
  if (normalized === "POSTGRADUATE" || normalized === "PG" || normalized === "MASTER" || normalized === "MASTERS" || normalized === "M_TECH" || normalized === "MTECH") return EducationLevel.POSTGRADUATE;
  if (normalized === "DIPLOMA" || normalized === "POLYTECHNIC") return EducationLevel.DIPLOMA;
  if (normalized === "SCHOOL" || normalized.includes("10") || normalized.includes("12")) return EducationLevel.SCHOOL;
  if (normalized === "INTERMEDIATE" || normalized === "INTER") return EducationLevel.INTERMEDIATE;
  if (normalized === "DOCTORATE" || normalized === "PHD") return EducationLevel.DOCTORATE;
  if (normalized === "CERTIFICATION") return EducationLevel.CERTIFICATION;
  if (normalized === "OTHER") return EducationLevel.OTHER;

  if (Object.values(EducationLevel).includes(normalized as EducationLevel)) {
    return normalized as EducationLevel;
  }
  return undefined;
}

function normalizeSkillLevel(value: unknown): SkillLevel {
  if (typeof value !== "string" || !value.trim()) return SkillLevel.INTERMEDIATE;

  const normalized = value.trim().toUpperCase();
  if (normalized === "BEGINNER" || normalized === "BASIC") return SkillLevel.BEGINNER;
  if (normalized === "ADVANCED" || normalized === "EXPERT") return SkillLevel.ADVANCED;
  return SkillLevel.INTERMEDIATE;
}

class ProfileRepository {
  async getProfile(userId: string) {
    return prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        skills: true,
        interests: true,
        careerGoals: true,
      },
    });
  }

  async setPrimaryResume(userId: string, documentId: string) {
    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
      select: {
        id: true,
        userId: true,
        type: true,
      },
    });

    if (!document) {
      throw new Error("Document not found.");
    }

    if (document.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    if (document.type !== "RESUME") {
      throw new Error(
        "Only resume documents can be selected as the primary resume."
      );
    }

    return prisma.profile.upsert({
      where: {
        userId,
      },
      update: {
        resumeId: documentId,
      },
      create: {
        userId,
        resumeId: documentId,
      },
    });
  }

  async upsertProfile(userId: string, data: any) {
    const { skills, interests, careerGoals, dateOfBirth, gender, educationLevel, ...scalarData } = data;

    const dob = dateOfBirth ? new Date(dateOfBirth) : null;
    const normGender = normalizeGender(gender);
    const normEdu = normalizeEducationLevel(educationLevel);

    const createSkills =
      skills?.map((s: any) => ({
        name: s.name,
        level: normalizeSkillLevel(s.level),
      })) || [];

    const createInterests =
      interests?.map((i: string) => ({ name: i })) || [];

    const createGoals =
      careerGoals?.map((cg: string) => ({ title: cg })) || [];

    const updatePayload: any = {
      ...scalarData,
      dateOfBirth: dob,
      skills: {
        deleteMany: {},
        create: createSkills,
      },
      interests: {
        deleteMany: {},
        create: createInterests,
      },
      careerGoals: {
        deleteMany: {},
        create: createGoals,
      },
    };

    if (normGender !== undefined) updatePayload.gender = normGender;
    if (normEdu !== undefined) updatePayload.educationLevel = normEdu;

    const createPayload: any = {
      ...scalarData,
      userId,
      dateOfBirth: dob,
      skills: {
        create: createSkills,
      },
      interests: {
        create: createInterests,
      },
      careerGoals: {
        create: createGoals,
      },
    };

    if (normGender !== undefined) createPayload.gender = normGender;
    if (normEdu !== undefined) createPayload.educationLevel = normEdu;

    await prisma.profile.upsert({
      where: {
        userId,
      },
      update: updatePayload,
      create: createPayload,
    });

    const fullProfile = await this.getProfile(userId);
    const completion = calculateProfileCompletion(fullProfile);

    return prisma.profile.update({
      where: {
        userId,
      },
      data: {
        isProfileCompleted: completion === 100,
      },
      include: {
        skills: true,
        interests: true,
        careerGoals: true,
      },
    });
  }
}

export default new ProfileRepository();