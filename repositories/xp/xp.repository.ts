import prisma from "@/lib/prisma";

class XPRepository {

  async getOrCreate(userId: string) {

    let xp = await prisma.userXP.findUnique({
      where: {
        userId,
      },
    });

    if (!xp) {
      xp = await prisma.userXP.create({
        data: {
          userId,
        },
      });

    }

    return xp;
  }

  async updateXP(
    userId: string,
    totalXP: number,
    level: number
  ) {
    const xp = await this.getOrCreate(userId);
    return prisma.userXP.update({
      where: {
        id: xp.id,
      },
      data: {
        totalXP,
        level,
      },
    });
  }

  calculateLevel(totalXP: number) {
    return Math.floor(totalXP / 100) + 1;
  }

  async addXP(
    userId: string,
    amount: number
  ) {

    const current =
      await this.getOrCreate(userId);

    const total =
      current.totalXP + amount;

    const level =
      this.calculateLevel(total);

    return prisma.userXP.update({

      where: {
        id: current.id,
      },

      data: {

        totalXP: total,

        level,

      },

    });

  }

}

export default new XPRepository();