interface ScoreCardProps {
  title: string;
  score: number;
  subtitle: string;
}

export default function ScoreCard({
  title,
  score,
  subtitle,
}: ScoreCardProps) {
  const scoreColor =
    score >= 80
      ? "text-green-600"
      : score >= 60
      ? "text-yellow-600"
      : "text-red-600";

  const progressColor =
    score >= 80
      ? "bg-green-500"
      : score >= 60
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="surface-card rounded-3xl border border-border p-6 shadow-sm">
      <p className="text-sm text-muted-foreground">{title}</p>

      <div className={`mt-3 text-5xl font-bold ${scoreColor}`}>
        {score}%
      </div>

      <p className="mt-2 text-sm font-medium text-foreground">
        {subtitle}
      </p>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}