import Link from "next/link";

interface Props {
  percentage: number;
  remaining: string[];
}

export default function ProfileCompletionCard({
  percentage,
  remaining,
}: Props) {
  const isComplete = percentage === 100;

  return (
    <div className="surface-card rounded-2xl p-6">
      <h2 className="text-lg font-semibold">Profile Completion</h2>

      <p className="mt-2 text-4xl font-bold">{percentage}%</p>

      <div className="mt-4 h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {isComplete ? (
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <h3 className="font-semibold">🎉 Profile Complete</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Your profile is fully optimized.
          </p>
        </div>
      ) : (
        remaining.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium">Complete these:</p>

            <ul className="mt-2 space-y-2">
              {remaining.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      <Link
        href="/profile"
        className="mt-6 inline-flex text-primary font-medium"
      >
        {isComplete ? "View Profile →" : "Complete Profile →"}
      </Link>
    </div>
  );
}