import { AppShell } from "@/components/AppShell";
import {
  Bell,
  CalendarClock,
  FileCheck2,
  Trophy,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Notifications | SAATHI",
  description: "Only the nudges that matter — never noise.",
};

const GROUPS = [
  {
    label: "Today",
    items: [
      {
        icon: <CalendarClock className="h-4 w-4" />,
        tone: "primary",
        title: "NMMS deadline in 9 days",
        body: "One document left. Upload domicile certificate to keep 68% completion.",
      },
      {
        icon: <Trophy className="h-4 w-4" />,
        tone: "accent",
        title: "You crossed a 14-day streak",
        body: "Longest yet. Something to feel good about.",
      },
    ],
  },
  {
    label: "This week",
    items: [
      {
        icon: <Sparkles className="h-4 w-4" />,
        tone: "secondary",
        title: "3 new scholarships match your profile",
        body: "SAATHI shortlisted these for you.",
      },
      {
        icon: <FileCheck2 className="h-4 w-4" />,
        tone: "primary",
        title: "Your caste certificate was verified",
        body: "It unlocks 12 more scholarships.",
      },
      {
        icon: <Bell className="h-4 w-4" />,
        tone: "muted",
        title: "Mock test scheduled for Friday 7am",
        body: "Full-length JEE Main, 3 hours.",
      },
    ],
  },
];

export default function NotificationsPage() {
  return (
    <AppShell
      title="Notifications"
      subtitle="Only nudges that move you forward. Nothing else."
    >
      <div className="space-y-8">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {group.label}
            </div>

            <ul className="space-y-2">
              {group.items.map((notification, index) => {
                const bg =
                  notification.tone === "primary"
                    ? "bg-sky-soft/60"
                    : notification.tone === "accent"
                    ? "bg-gold-soft/70"
                    : notification.tone === "secondary"
                    ? "bg-mint-soft/60"
                    : "bg-muted";

                return (
                  <li
                    key={index}
                    className={`surface-card flex items-start gap-3 p-4 ${bg}`}
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-surface text-foreground">
                      {notification.icon}
                    </span>

                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">
                        {notification.title}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {notification.body}
                      </div>
                    </div>

                    <button className="text-[11px] font-semibold text-muted-foreground hover:text-foreground">
                      Dismiss
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </AppShell>
  );
}