import prisma from "@/lib/prisma";

function startOfDay(date: Date) {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
}

function dateKey(date: Date) {
  return startOfDay(date)
    .toISOString()
    .slice(0, 10);
}

class StreakService {
  async updateStreak(userId: string) {
    if (!prisma.userActivityDay) return null;

    const activities =
      await prisma.userActivityDay.findMany({
        where: {
          userId,
        },
        orderBy: {
          date: "asc",
        },
      });

    if (!activities.length) {
      return prisma.userXP.upsert({
        where: {
          userId,
        },
        update: {
          currentStreak: 0,
        },
        create: {
          userId,
          currentStreak: 0,
          longestStreak: 0,
        },
      });
    }

    const uniqueDates = Array.from(
      new Set(
        activities.map((activity: any) =>
          dateKey(activity.date)
        )
      )
    );

    let longestStreak = 0;
    let runningStreak = 0;
    let previousDate: Date | null = null;

    for (const key of uniqueDates) {
      const currentDate = new Date(`${key}T00:00:00`);

      if (!previousDate) {
        runningStreak = 1;
      } else {
        const difference =
          Math.round(
            (currentDate.getTime() -
              previousDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

        if (difference === 1) {
          runningStreak++;
        } else {
          runningStreak = 1;
        }
      }

      longestStreak = Math.max(
        longestStreak,
        runningStreak
      );

      previousDate = currentDate;
    }

    const today = startOfDay(new Date());
    const todayKey = dateKey(today);

    const yesterday = new Date(today);
    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const yesterdayKey = dateKey(yesterday);

    const lastActivity =
      uniqueDates[uniqueDates.length - 1];

    let currentStreak = 0;

    if (lastActivity === todayKey) {
      currentStreak = 1;

      for (
        let i = uniqueDates.length - 2;
        i >= 0;
        i--
      ) {
        const current = new Date(
          `${uniqueDates[i]}T00:00:00`
        );

        const next = new Date(
          `${uniqueDates[i + 1]}T00:00:00`
        );

        const difference =
          Math.round(
            (next.getTime() -
              current.getTime()) /
              (1000 * 60 * 60 * 24)
          );

        if (difference !== 1) {
          break;
        }

        currentStreak++;
      }
    } else if (lastActivity === yesterdayKey) {
      currentStreak = 1;

      for (
        let i = uniqueDates.length - 2;
        i >= 0;
        i--
      ) {
        const current = new Date(
          `${uniqueDates[i]}T00:00:00`
        );

        const next = new Date(
          `${uniqueDates[i + 1]}T00:00:00`
        );

        const difference =
          Math.round(
            (next.getTime() -
              current.getTime()) /
              (1000 * 60 * 60 * 24)
          );

        if (difference !== 1) {
          break;
        }

        currentStreak++;
      }
    }

    return prisma.userXP.upsert({
      where: {
        userId,
      },

      update: {
        currentStreak,
        longestStreak,
      },

      create: {
        userId,
        currentStreak,
        longestStreak,
      },
    });
  }
}

export default new StreakService();