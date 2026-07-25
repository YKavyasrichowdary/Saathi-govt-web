import {
  CheckCircle2,
  AlertTriangle,
  Rocket,
} from "lucide-react";

interface Props {
  title: string;
  items: string[];
  variant: "success" | "warning" | "info";
}

export default function RecommendationSection({
  title,
  items,
  variant,
}: Props) {
  if (variant === "warning" && items.length === 0) {
    return (
      <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
        <p className="font-medium text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
          <span>🎉</span> No major gaps detected.
        </p>
      </div>
    );
  }

  if (items.length === 0) return null;

  const styles = {
    success: {
      icon: CheckCircle2,
      wrapper:
        "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30 text-green-900 dark:text-green-200",
      iconColor: "text-green-600 dark:text-green-400",
    },

    warning: {
      icon: AlertTriangle,
      wrapper:
        "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30 text-orange-900 dark:text-orange-200",
      iconColor: "text-orange-600 dark:text-orange-400",
    },

    info: {
      icon: Rocket,
      wrapper:
        "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  };

  const current = styles[variant];
  const Icon = current.icon;

  return (
    <div
      className={`mt-5 rounded-2xl border p-4 ${current.wrapper}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon
          className={`h-5 w-5 ${current.iconColor}`}
        />

        <h4 className="font-semibold text-sm">
          {title}
        </h4>
      </div>

      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="text-sm leading-6 text-foreground/80 flex items-start gap-2"
          >
            <span className="shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}