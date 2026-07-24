import prisma from "@/lib/prisma";

class NotificationRepository {
  async create(
    userId: string,
    title: string,
    message: string,
    type: "INFO" | "SUCCESS" | "WARNING"
  ) {
    if (!(prisma as any).notification) return null;
    return (prisma as any).notification.create({
      data: {
        userId,
        title,
        message,
        type,
      },
    });
  }

  async getByUser(userId: string) {
    if (!(prisma as any).notification) return [];
    return (prisma as any).notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async unreadCount(userId: string) {
    if (!(prisma as any).notification) return 0;
    return (prisma as any).notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  async markAsRead(id: string) {
    if (!(prisma as any).notification) return null;
    return (prisma as any).notification.update({
      where: {
        id,
      },

      data: {
        isRead: true,
      },
    });
  }

  async markAllAsRead(userId: string) {
    if (!(prisma as any).notification) return { count: 0 };
    return (prisma as any).notification.updateMany({
      where: {
        userId,
        isRead: false,
      },

      data: {
        isRead: true,
      },
    });
  }
}

export default new NotificationRepository();