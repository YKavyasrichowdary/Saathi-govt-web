import {
  Brain,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";

interface AIInsightsProps {
  summary: string;
  strengths: string[];
  improvements: string[];
}

export default function AIInsights({
  summary,
  strengths,
  improvements,
}: AIInsightsProps) {
  return (
    <section className="surface-card rounded-3xl border border-border p-8">

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <Brain className="h-6 w-6" />
        </div>

        <div>

          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            AI Insights
          </p>

          <h2 className="text-2xl font-bold">
            Why this Success Plan?
          </h2>

        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-primary/5 p-5 border border-primary/10">

        <p className="leading-7 text-muted-foreground">
          {summary}
        </p>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div>

          <div className="mb-4 flex items-center gap-2">

            <CircleCheck className="h-5 w-5 text-green-500" />

            <h3 className="font-semibold">
              Your Strengths
            </h3>

          </div>

          <div className="space-y-3">

            {strengths.map((item) => (

              <div
                key={item}
                className="rounded-xl border border-border p-4"
              >
                {item}
              </div>

            ))}

          </div>

        </div>

        <div>

          <div className="mb-4 flex items-center gap-2">

            <TriangleAlert className="h-5 w-5 text-yellow-500" />

            <h3 className="font-semibold">
              Focus Areas
            </h3>

          </div>

          <div className="space-y-3">

            {improvements.map((item) => (

              <div
                key={item}
                className="rounded-xl border border-border p-4"
              >
                {item}
              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}