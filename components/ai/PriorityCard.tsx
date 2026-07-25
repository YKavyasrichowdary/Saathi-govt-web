import {
  Flame,
  Clock3,
  ChevronRight,
  UserRound,
  FileText,
  Bell,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { PriorityItem } from "@/lib/ai/priority";

interface PriorityCardProps {
  priorities?: PriorityItem[];
}

const TYPE_ICONS = {
  PROFILE: UserRound,
  OPPORTUNITY: Sparkles,
  DOCUMENT: FileText,
  APPLICATION: Flame,
  NOTIFICATION: Bell,
};

export default function PriorityCard({
  priorities = [],
}: PriorityCardProps) {
  return (
    <section className="surface-card rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Today's Priorities
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Focus on these next.
          </p>
        </div>

        <Clock3 className="h-5 w-5 text-primary" />
      </div>

      <div className="mt-6 space-y-4">
        {priorities.length > 0 ? (
          priorities.map((priority, index) => {
            const Icon = TYPE_ICONS[priority.type] || Sparkles;

            return (
              <Link
                key={index}
                href={priority.action}
                className="group flex w-full items-start gap-4 rounded-2xl border border-border p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <div className="rounded-xl bg-primary/10 p-3 text-primary shrink-0">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">
                    {priority.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground truncate">
                    {priority.description}
                  </p>
                </div>

                <ChevronRight className="mt-1 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-6 text-center">
            <h3 className="font-semibold">
              🎉 You're all caught up!
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              No urgent actions right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}