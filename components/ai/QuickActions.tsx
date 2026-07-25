"use client";

import {
  BriefcaseBusiness,
  GraduationCap,
  FileSearch,
  Target,
  ArrowUpRight,
} from "lucide-react";

interface Props {
  onSelect?(prompt: string): void;
}

const actions = [
  {
    id: 1,
    title: "Recommend Internships",
    description:
      "Find internships that match your profile and skills.",
    prompt: "Recommend internships based on my profile.",
    icon: BriefcaseBusiness,
  },
  {
    id: 2,
    title: "Find Scholarships",
    description:
      "Discover scholarships you're eligible for.",
    prompt: "Recommend scholarships for me.",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Review Resume",
    description:
      "Analyze my uploaded resume and suggest improvements.",
    prompt: "Review my resume.",
    icon: FileSearch,
  },
  {
    id: 4,
    title: "Career Roadmap",
    description:
      "Create my personalized career roadmap.",
    prompt: "Create a career roadmap for me.",
    icon: Target,
  },
];

export default function QuickActions({
  onSelect,
}: Props) {
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <p className="text-sm text-muted-foreground">
          Let Saathi help you instantly.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {actions.map((action) => {

          const Icon = action.icon;

          return (

            <button
              key={action.id}
              onClick={() =>
                onSelect?.(action.prompt)
              }
              className="group surface-card rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-primary/10 p-3">

                  <Icon className="h-6 w-6 text-primary" />

                </div>

                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

              </div>

              <h3 className="mt-6 text-lg font-semibold">

                {action.title}

              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-6">

                {action.description}

              </p>

            </button>

          );

        })}

      </div>

    </section>
  );
}