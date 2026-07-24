import { redirect } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";
import notificationService from "@/services/notification/notification.service";

function getRelativeTime(dateInput: Date | string) {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "SUCCESS":
      return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
    case "WARNING":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case "INFO":
    default:
      return <Bell className="h-5 w-5 text-primary" />;
  }
}

export default async function NotificationsPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const notifications =
    await notificationService.getNotifications(
      session.user.id
    );

  const unreadCount =
    await notificationService.unreadCount(
      session.user.id
    );

  return (
    <AppShell
      title="Notifications"
      subtitle={`${notifications.length} notifications`}
      unreadCount={unreadCount}
    >
      {notifications.length === 0 ? (
        <div className="surface-card rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold">
            You're all caught up 🎉
          </h2>

          <p className="mt-2 text-muted-foreground">
            No notifications yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification: any) => (
            <div
              key={notification.id}
              className={`surface-card rounded-2xl p-5 transition-all ${
                !notification.isRead
                  ? "border border-primary/20 bg-primary/5"
                  : "border border-border"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface border border-border">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {notification.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>

                    {!notification.isRead && (
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary shrink-0">
                        New
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground">
                    {getRelativeTime(notification.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}