import Link from "next/link";

import { AppShell } from "@/components/AppShell";
import { studentNavigation } from "@/config/student-navigation";
import { getSession } from "@/lib/auth";
import dashboardService from "@/services/dashboard/dashboard.service";
import {
  Card,
  StatCard,
  SectionTitle,
} from "@/components/PageBits";
import recommendationService from "@/services/recommendation/recommendation.service";
import RecommendationGrid from "@/components/recommendation/RecommendationGrid";

import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Flame,
  Sparkles,
  Bell,
} from "lucide-react";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Dashboard · SAATHI",
  description:
    "Your calm home base — what needs you today, and what to celebrate.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if ((user?.role as any) === "ADMIN") {
    redirect("/admin");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) {
    redirect("/onboarding");
  }

  const stats = await dashboardService.getStats(
  session.user.id
);

  const recommendations =
    await recommendationService.getRecommendations(
      session.user.id
    );

  const userName = session.user.name || "Ananya";
  const firstName = userName.split(" ")[0];

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <AppShell
      navigation={studentNavigation}
      title={`Good morning, ${firstName}.`}
      subtitle={`${today} · You have 3 gentle tasks today.`}
      actions={
        <Link
          href="/companion"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_8px_20px_-10px_oklch(0.55_0.2_262/0.6)]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask companion
        </Link>
      }
    >
      {/* Hero Banner */}

      <div className="surface-card mb-6 overflow-hidden bg-gradient-to-br from-primary/10 via-sky-soft to-gold-soft p-6 md:p-8">
        <div className="text-eyebrow">
          This week
        </div>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          You're 68% ready for the NMMS scholarship.
        </h2>

        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          SAATHI has your income certificate on file.
          Two documents left, and the essay draft is
          waiting for your voice.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/applications"
            className="btn-primary"
          >
            Continue application

            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/journey"
            className="btn-ghost"
          >
            See my journey
          </Link>
        </div>
      </div>

      {/* Stats */}

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
       <StatCard
  label="Saved"
  value={stats.savedCount.toString()}
  hint="Saved opportunities."
  tone="accent"
/>

        <StatCard
  label="Applications"
  value={stats.applicationCount.toString()}
  hint="Applications submitted."
  tone="primary"
/>

        <StatCard
  label="Open"
  value={stats.opportunityCount.toString()}
  hint="Available opportunities."
  tone="secondary"
/>

       <StatCard
  label="Featured"
  value={stats.featuredCount.toString()}
  hint="Featured opportunities."
  tone="primary"
/>
      </div>

      {/* Main Content */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <SectionTitle
              eyebrow="Today"
              title="Your 3 gentle tasks"
              action={
                <Link
                  href="/journey"
                  className="text-xs font-semibold text-primary"
                >
                  See all
                </Link>
              }
            />

            <ul className="space-y-2">
              {[
                {
                  done: true,
                  text: "Finish 20 questions of GATE — Data Structures",
                },
                {
                  done: false,
                  text: "Upload domicile certificate for NMMS scholarship",
                },
                {
                  done: false,
                  text: "15-minute reading: Editorial · The Hindu",
                },
              ].map((task, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                >
                  {task.done ? (
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-secondary" />
                  ) : (
                    <Circle className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  )}

                  <span
                    className={`flex-1 text-sm ${
                      task.done
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {task.text}
                  </span>

                  {!task.done && (
                    <button className="text-xs font-semibold text-primary">
                      Do it
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </Card>

          <section className="mt-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Recommended For You
              </h2>
              <p className="text-muted-foreground">
                Personalized opportunities based on your profile.
              </p>
            </div>
            <RecommendationGrid
              recommendations={recommendations.slice(0,4)}
            />
          </section>
        </div>

        {/* Right */}

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Flame className="h-4 w-4 text-accent" />
              Streak
            </div>

            <div className="mt-3 grid grid-cols-7 gap-1.5">
              {Array.from({
                length: 28,
              }).map((_, index) => (
                <div
                  key={index}
                  className={`h-6 rounded-md ${
                    index < 14
                      ? "bg-accent"
                      : index < 20
                      ? "bg-accent/40"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              You've shown up 14 days in a row.
              Small steps compound.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Bell className="h-4 w-4 text-primary" />
              Nudges
            </div>

            <ul className="mt-3 space-y-3 text-sm">
              <li className="rounded-xl bg-mint-soft/60 p-3 text-foreground">
                Post Matric Scholarship opens tomorrow —
                SAATHI has your docs ready.
              </li>

              <li className="rounded-xl bg-sky-soft/60 p-3 text-foreground">
                Your mock test at 6pm today.
                45 min, calm space.
              </li>

              <li className="rounded-xl bg-gold-soft/60 p-3 text-foreground">
                A student like you cleared NMMS last year.
                Read her note.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}