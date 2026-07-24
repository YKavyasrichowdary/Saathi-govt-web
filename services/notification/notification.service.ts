import repository from "@/repositories/notification/notification.repository";

class NotificationService {
  async notify(
    userId: string,
    title: string,
    message: string,
    type: "INFO" | "SUCCESS" | "WARNING" = "INFO"
  ) {
    return repository.create(
      userId,
      title,
      message,
      type
    );
  }

  async getNotifications(userId: string) {
    return repository.getByUser(userId);
  }

  async unreadCount(userId: string) {
    return repository.unreadCount(userId);
  }

  async markAsRead(id: string) {
    return repository.markAsRead(id);
  }

  async markAllAsRead(userId: string) {
    return repository.markAllAsRead(userId);
  }
  async createProfileReminder(userId: string) {
  return this.notify(
    userId,
    "Complete your profile",
    "Complete your profile to improve recommendations.",
    "WARNING"
  );
}

async createRecommendationNotification(
  userId: string,
  title: string
) {
  return this.notify(
    userId,
    "New Recommendation",
    `${title} matches your profile.`,
    "SUCCESS"
  );
}

async createDeadlineReminder(
  userId: string,
  title: string
) {
  return this.notify(
    userId,
    "Deadline Approaching",
    `${title} closes soon.`,
    "WARNING"
  );
}
}

export default new NotificationService();