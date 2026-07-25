import {
  UserRound,
  Sparkles,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  Bell,
} from "lucide-react";

interface SnapshotCardProps {
  profileCompletion: number;
  recommendations: number;
  applications: number;
  saved: number;
  documents: number;
  notifications: number;
}

export default function SnapshotCard({
  profileCompletion,
  recommendations,
  applications,
  saved,
  documents,
  notifications,
}: SnapshotCardProps) {
  const stats = [
    {
      label: "Profile",
      value: `${profileCompletion}%`,
      icon: UserRound,
    },
    {
      label: "Recommendations",
      value: recommendations.toString(),
      icon: Sparkles,
    },
    {
      label: "Applications",
      value: applications.toString(),
      icon: BriefcaseBusiness,
    },
    {
      label: "Saved",
      value: saved.toString(),
      icon: Bookmark,
    },
    {
      label: "Documents",
      value: documents.toString(),
      icon: FileText,
    },
    {
      label: "Notifications",
      value: notifications.toString(),
      icon: Bell,
    },
  ];

  return (
    <section className="surface-card rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Today's Snapshot
        </h2>

        <Sparkles className="h-5 w-5 text-primary" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-background p-4 transition-all hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-primary" />

                <span className="text-2xl font-bold">
                  {item.value}
                </span>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}