import { ReactNode } from "react";

interface InsightSectionProps {
  title: string;
  items: string[];
  icon: ReactNode;
}

export default function InsightSection({
  title,
  items,
  icon,
}: InsightSectionProps) {
  if (!items.length) return null;

  return (
    <div className="surface-card rounded-3xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-3">
        {icon}

        <h3 className="text-lg font-semibold">
          {title}
        </h3>
      </div>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
          >
            <span className="mt-1 h-2 w-2 rounded-full bg-primary" />

            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}