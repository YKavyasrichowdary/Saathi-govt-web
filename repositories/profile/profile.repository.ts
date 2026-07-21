import prisma from "@/lib/prisma";

class ProfileRepository {
  /* ==========================
      PROFILE
  ========================== */

  async createProfile(data: {
    userId: string;
    phone?: string;
    college?: string;
    university?: string;
    degree?: string;
    branch?: string;
    currentYear?: number;
    cgpa?: number;
    city?: string;
    state?: string;
    country?: string;
    bio?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
  }) {
    return prisma.profile.create({
      data,
    });
  }

  async findProfileByUserId(userId: string) {
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

  async updateProfile(
    userId: string,
    data: any
  ) {
    return prisma.profile.update({
      where: {
        userId,
      },
      data,
    });
  }

  /* ==========================
      SKILLS
  ========================== */

  async addSkill(
    profileId: string,
    name: string,
    level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  ) {
    return prisma.skill.create({
      data: {
        profileId,
        name,
        level,
      },
    });
  }

  async deleteSkill(id: string) {
    return prisma.skill.delete({
      where: {
        id,
      },
    });
  }

  /* ==========================
      INTERESTS
  ========================== */

  async addInterest(
    profileId: string,
    name: string
  ) {
    return prisma.interest.create({
      data: {
        profileId,
        name,
      },
    });
  }

  async deleteInterest(id: string) {
    return prisma.interest.delete({
      where: {
        id,
      },
    });
  }

  /* ==========================
      CAREER GOALS
  ========================== */

  async addCareerGoal(
    profileId: string,
    title: string
  ) {
    return prisma.careerGoal.create({
      data: {
        profileId,
        title,
      },
    });
  }

  async deleteCareerGoal(id: string) {
    return prisma.careerGoal.delete({
      where: {
        id,
      },
    });
  }
}

export default new ProfileRepository();