import {
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const FEATURES = [
  "Find internships that match your profile",
  "Recommend scholarships",
  "Review your uploaded resume",
  "Build your career roadmap",
];

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-background p-12 text-center">

      <div className="rounded-2xl bg-primary/10 p-5">

        <Sparkles className="h-8 w-8 text-primary" />

      </div>

      <h2 className="mt-6 text-2xl font-bold">

        Welcome back 👋

      </h2>

      <p className="mt-2 max-w-xl text-muted-foreground">

        I've reviewed your profile.

        Ask me anything about your career,
        internships,
        scholarships,
        resume,
        or applications.

      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">

        {FEATURES.map((feature) => (

          <div
            key={feature}
            className="flex items-center gap-3 rounded-xl bg-muted/40 p-4"
          >

            <CheckCircle2 className="h-5 w-5 text-primary" />

            <span className="text-sm">

              {feature}

            </span>

          </div>

        ))}

      </div>

    </div>
  );
}