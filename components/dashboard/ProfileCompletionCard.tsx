import Link from "next/link";

interface Props {
  percentage: number;
  remaining: string[];
}

export default function ProfileCompletionCard({
  percentage,
  remaining,
}: Props) {
  return (
    <div className="surface-card rounded-2xl p-6">

      <h2 className="text-lg font-semibold">
        Profile Completion
      </h2>

      <p className="mt-2 text-4xl font-bold">
        {percentage}%
      </p>

      <div className="mt-4 h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {remaining.length > 0 && (
        <div className="mt-6">

          <p className="text-sm font-medium">
            Complete these:
          </p>

          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">

            {remaining.slice(0,4).map(item => (

              <li key={item}>
                • {item}
              </li>

            ))}

          </ul>

        </div>
      )}

      <Link
        href="/profile"
        className="mt-6 inline-flex text-primary font-medium"
      >
        Complete Profile →
      </Link>

    </div>
  );
}