import Link from "next/link";
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

import { ProfileStrength } from "@/lib/intelligence/profile-strength";

interface Props {
  strength: ProfileStrength;
}

export default function ProfileStrengthCard({
  strength,
}: Props) {
  return (
    <div className="surface-card rounded-3xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Profile Strength
          </h2>

          <p className="text-sm text-muted-foreground">
            Placement readiness
          </p>

        </div>

        <Award className="h-7 w-7 text-primary" />

      </div>

      {/* Score */}

      <div className="mt-8 text-center">

        <div className="text-5xl font-bold">

          {strength.score}%

        </div>

        <div className="mt-3 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">

          {strength.status}

        </div>

      </div>

      {/* Progress */}

      <div className="mt-8 h-3 overflow-hidden rounded-full bg-muted">

        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${strength.score}%`,
          }}
        />

      </div>

      {/* Strengths */}

      {strength.strengths.length > 0 && (
        <div className="mt-8">

          <h3 className="font-semibold">
            Strengths
          </h3>

          <div className="mt-4 space-y-3">

            {strength.strengths.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >

                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />

                <span className="text-sm">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>
      )}

      {/* Missing */}

      {strength.missing.length > 0 && (
        <div className="mt-8">

          <h3 className="font-semibold">
            Needs Improvement
          </h3>

          <div className="mt-4 space-y-3">

            {strength.missing.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >

                <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />

                <span className="text-sm">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>
      )}

      {/* Actions */}

      {strength.actions.length > 0 && (
        <div className="mt-8">

          <h3 className="font-semibold">
            Suggested Actions
          </h3>

          <div className="mt-4 space-y-3">

            {strength.actions.map((action) => (

              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between rounded-xl border border-border p-3 transition hover:bg-muted"
              >

                <span className="text-sm font-medium">

                  {action.label}

                </span>

                <ArrowRight className="h-4 w-4 text-primary" />

              </Link>

            ))}

          </div>

        </div>
      )}

    </div>
  );
}