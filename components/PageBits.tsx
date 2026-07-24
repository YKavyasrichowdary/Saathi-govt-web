import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({
  className = "",
  children,
}: CardProps) {
  return (
    <div className={`surface-card p-5 ${className}`}>
      {children}
    </div>
  );
}

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

export function SectionTitle({
  eyebrow,
  title,
  action,
}: SectionTitleProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="text-eyebrow">
            {eyebrow}
          </div>
        )}

        <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
      </div>

      {action}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: "primary" | "secondary" | "accent";
}

export function StatCard({
  label,
  value,
  hint,
  tone = "primary",
}: StatCardProps) {
  const bg =
    tone === "primary"
      ? "from-primary/10 to-primary/5"
      : tone === "secondary"
      ? "from-secondary/15 to-secondary/5"
      : "from-accent/20 to-accent/5";

  return (
    <div
      className={`surface-card overflow-hidden bg-gradient-to-br ${bg}`}
    >
      <div className="p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </div>

        <div className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          {value}
        </div>

        {hint && (
          <div className="mt-1 text-xs text-muted-foreground">
            {hint}
          </div>
        )}
      </div>
    </div>
  );
}

export { default as OpportunityCard } from "@/components/opportunity/OpportunityCard";

interface EmptyNudgeProps {
  title: string;
  body: string;
  cta?: string;
  to?: string;
}

export function EmptyNudge({
  title,
  body,
  cta,
  to,
}: EmptyNudgeProps) {
  return (
    <div className="surface-card flex flex-col items-center gap-3 p-10 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="h-5 w-5" />
      </span>

      <h3 className="text-base font-semibold text-foreground">
        {title}
      </h3>

      <p className="max-w-sm text-sm text-muted-foreground">
        {body}
      </p>

      {cta && to && (
        <Link
          href={to}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          {cta}

          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}