import prisma from "@/lib/prisma";

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

    return prisma.profile.upsert({
      where: {
        userId,
      },

      update: {
        ...scalarData,
        dateOfBirth: dob,
        isProfileCompleted: true,
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
        isProfileCompleted: true,
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
  }
}

export default new ProfileRepository();