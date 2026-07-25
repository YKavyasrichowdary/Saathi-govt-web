import { PriorityItem } from "./priority";

interface PriorityContext {
  profileCompletion: number;
  recommendations: any[];
  documents: any[];
  notifications: any[];
}

export function buildPriorities(
  context: PriorityContext
): PriorityItem[] {
  const priorities: PriorityItem[] = [];

  // Step 3 — Rule 1: Profile
  if (context.profileCompletion < 100) {
    priorities.push({
      type: "PROFILE",
      title: "Complete your profile",
      description: `Your profile is ${context.profileCompletion}% complete.`,
      action: "/profile",
      priority: 1,
    });
  }

  // Step 4 — Rule 2: Recommendations
  if (context.recommendations.length > 0) {
    const top = context.recommendations[0];
    const title =
      top.opportunity?.title ?? top.title ?? "Recommended Opportunity";
    const matchScore = top.matchScore ?? 90;

    priorities.push({
      type: "OPPORTUNITY",
      title,
      description: `${matchScore}% match for your profile.`,
      action: "/opportunities",
      priority: 2,
    });
  }

  // Step 5 — Rule 3: Resume
  const hasResume = context.documents.some(
    (doc: any) => doc.type === "RESUME"
  );

  if (!hasResume) {
    priorities.push({
      type: "DOCUMENT",
      title: "Upload your resume",
      description: "A resume unlocks better recommendations.",
      action: "/documents",
      priority: 3,
    });
  }

  // Step 6 — Rule 4: Notifications
  const unread = context.notifications.filter(
    (notification: any) => !notification.isRead
  ).length;

  if (unread > 0) {
    priorities.push({
      type: "NOTIFICATION",
      title: "Review notifications",
      description: `${unread} unread notification${unread > 1 ? "s" : ""}.`,
      action: "/notifications",
      priority: 4,
    });
  }

  // Step 7 — Sort and Return top 3
  return priorities
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);
}