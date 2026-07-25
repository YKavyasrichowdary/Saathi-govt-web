import prisma from "@/lib/prisma";
import { calculateProfileCompletion } from "@/lib/profile/completion";

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

  async upsertProfile(userId: string, data: any) {
    const { skills, interests, careerGoals, dateOfBirth, ...scalarData } = data;

    const dob = dateOfBirth ? new Date(dateOfBirth) : null;

    const createSkills = skills?.map((s: any) => ({ name: s.name, level: s.level })) || [];
    const createInterests = interests?.map((i: string) => ({ name: i })) || [];
    const createGoals = careerGoals?.map((cg: string) => ({ title: cg })) || [];

    await prisma.profile.upsert({
      where: {
        userId,
      },

      update: {
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
      },

      create: {
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
      },
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