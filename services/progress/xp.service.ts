import prisma from "@/lib/prisma";

class XPService {
  async awardMissionXP(
    userId: string,
    xp: number
  ) {
    const amount = Math.max(0, xp);

    const userXP = await prisma.userXP.upsert({
      where: {
        userId,
      },

      update: {
        totalXP: {
          increment: amount,
        },

        missionsCompleted: {
          increment: 1,
        },
      },

      create: {
        userId,
        totalXP: amount,
        missionsCompleted: 1,
        currentStreak: 0,
        longestStreak: 0,
      },
    });

    const level = Math.max(
      1,
      Math.floor(userXP.totalXP / 100) + 1
    );

    return prisma.userXP.update({
      where: {
        userId,
      },

      data: {
        level,
      },
    });
  }
}

export default new XPService();