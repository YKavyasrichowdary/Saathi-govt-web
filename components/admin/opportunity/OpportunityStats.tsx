import {
  Briefcase,
  CheckCircle2,
  Clock3,
  Archive,
} from "lucide-react";

interface Props {
  total: number;
  open: number;
  draft: number;
  expired: number;
}

export default function OpportunityStats({
  total,
  open,
  draft,
  expired,
}: Props) {
  const stats = [
    {
      label: "Total Opportunities",
      value: total,
      icon: Briefcase,
    },
    {
      label: "Open",
      value: open,
      icon: CheckCircle2,
    },
    {
      label: "Draft",
      value: draft,
      icon: Clock3,
    },
    {
      label: "Expired",
      value: expired,
      icon: Archive,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="surface-card p-6"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  {item.label}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {item.value}
                </h2>

              </div>

              <Icon className="h-8 w-8 text-primary" />

            </div>
          </div>
        );
      })}
    </div>
  );
}