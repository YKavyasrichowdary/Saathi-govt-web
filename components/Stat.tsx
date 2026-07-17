interface StatProps {
  label: string;
  value: string;
  tone: "sky" | "mint" | "gold";
}

export default function Stat({
  label,
  value,
  tone,
}: StatProps) {
  const bg =
    tone === "mint"
      ? "bg-[var(--mint-soft)]"
      : tone === "gold"
      ? "bg-[var(--gold-soft)]"
      : "bg-[var(--sky-soft)]";

  return (
    <div
      className={`rounded-2xl border border-border p-3.5 ${bg}`}
    >
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>

      <div className="mt-1 text-[18px] font-semibold tracking-tight">
        {value}
      </div>
    </div>
  );
}
