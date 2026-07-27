"use client";

import { Bell } from "lucide-react";

export interface NotificationActivity {
  id: string;
  title: string;
  message: string;
  createdAt: string | Date;
}

interface RecentActivityProps {
  activities?: NotificationActivity[];
}

function formatActivityTime(dateInput: string | Date): string {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";
    
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export default function RecentActivity({
  activities = [],
}: RecentActivityProps) {
  return (
    <div className="surface-card rounded-3xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <p className="text-sm text-muted-foreground">
          Your latest career progress.
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="py-8 text-center text-sm text-muted-foreground">
          No recent activity yet.
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div key={activity.id || index} className="relative flex gap-4">
              {index !== activities.length - 1 && (
                <div className="absolute left-[18px] top-10 h-full w-px bg-border" />
              )}

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bell className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-sm">{activity.title}</h3>

                  <span className="text-xs text-muted-foreground">
                    {formatActivityTime(activity.createdAt)}
                  </span>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  {activity.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}