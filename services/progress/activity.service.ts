import prisma from "@/lib/prisma";

class ActivityService {
  async recordActivity(userId: string) {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    if (!prisma.userActivityDay) {
      return null;
    }

    return prisma.userActivityDay.upsert({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
      update: {},
      create: {
        userId,
        date,
      },
    });
  }

  async getActivityDays(
    userId: string,
    days = 84
  ) {
    const end = new Date();

    end.setHours(0, 0, 0, 0);

    const start = new Date(end);

    start.setDate(
      start.getDate() - (days - 1)
    );

    if (!prisma.userActivityDay) {
      return [];
    }

    return prisma.userActivityDay.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  }

  async getCurrentStreak(userId: string) {
    const activities =
      await this.getActivityDays(userId, 365);

    const activeDates = new Set(
      activities.map((activity: any) =>
        activity.date
          .toISOString()
          .slice(0, 10)
      )
    );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayKey = today
      .toISOString()
      .slice(0, 10);

    const yesterday = new Date(today);

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const yesterdayKey = yesterday
      .toISOString()
      .slice(0, 10);

    /*
     * If the user hasn't completed today's task,
     * don't count today as a broken streak yet.
     *
     * Start checking from yesterday.
     */
    let cursor: Date;

    if (activeDates.has(todayKey)) {
      cursor = today;
    } else if (activeDates.has(yesterdayKey)) {
      cursor = yesterday;
    } else {
      return 0;
    }

    let streak = 0;

    while (true) {
      const key = cursor
        .toISOString()
        .slice(0, 10);

      if (!activeDates.has(key)) {
        break;
      }

      streak++;

      cursor = new Date(cursor);

      cursor.setDate(
        cursor.getDate() - 1
      );
    }

    return streak;
  }

  async getLongestStreak(userId: string) {
    const activities =
      await this.getActivityDays(userId, 3650);

    const activeDates = new Set(
      activities.map((activity: any) =>
        activity.date
          .toISOString()
          .slice(0, 10)
      )
    );

    if (activeDates.size === 0) {
      return 0;
    }

    const dates = Array.from(activeDates)
      .sort();

    let longest = 1;
    let current = 1;

    for (let i = 1; i < dates.length; i++) {
      const previous = new Date(
        `${dates[i - 1]}T00:00:00`
      );

      const currentDate = new Date(
        `${dates[i]}T00:00:00`
      );

      const difference =
        Math.round(
          (currentDate.getTime() -
            previous.getTime()) /
            (1000 * 60 * 60 * 24)
        );

      if (difference === 1) {
        current++;
        longest = Math.max(
          longest,
          current
        );
      } else {
        current = 1;
      }
    }

    return longest;
  }
}

export default new ActivityService();