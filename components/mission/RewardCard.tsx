"use client";

import {
  Trophy,
  Sparkles,
  FileText,
  Rocket,
  User,
} from "lucide-react";

interface RewardCardProps {
  mission: {
    rewardXP?: number | null;
    rewardResumeScore?: number | null;
    rewardOpportunityMatch?: number | null;
    rewardProfileScore?: number | null;
  };
}

export default function RewardCard({
  mission,
}: RewardCardProps) {
  return (
    <div className="surface-card rounded-3xl border border-border p-8">

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-600">
          <Trophy className="h-6 w-6" />
        </div>

        <div>

          <h2 className="text-xl font-bold">
            Rewards
          </h2>

          <p className="text-sm text-muted-foreground">
            Complete this mission to unlock these rewards.
          </p>

        </div>

      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">

        {mission.rewardXP ? (
          <RewardItem
            icon={<Sparkles className="h-5 w-5" />}
            label="XP"
            value={`+${mission.rewardXP}`}
            color="text-yellow-600"
          />
        ) : null}

        {mission.rewardResumeScore ? (
          <RewardItem
            icon={<FileText className="h-5 w-5" />}
            label="Resume Score"
            value={`+${mission.rewardResumeScore}`}
            color="text-blue-600"
          />
        ) : null}

        {mission.rewardOpportunityMatch ? (
          <RewardItem
            icon={<Rocket className="h-5 w-5" />}
            label="Match Score"
            value={`+${mission.rewardOpportunityMatch}%`}
            color="text-green-600"
          />
        ) : null}

        {mission.rewardProfileScore ? (
          <RewardItem
            icon={<User className="h-5 w-5" />}
            label="Profile Score"
            value={`+${mission.rewardProfileScore}`}
            color="text-purple-600"
          />
        ) : null}

      </div>

      <div className="mt-8 rounded-2xl bg-primary/5 border border-primary/10 p-4">

        <p className="text-sm text-muted-foreground">
          💡 Keep completing missions to earn XP, improve your profile,
          and unlock better opportunities.
        </p>

      </div>

    </div>
  );
}

interface RewardItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function RewardItem({
  icon,
  label,
  value,
  color,
}: RewardItemProps) {
  return (
    <div className="rounded-2xl border border-border p-4 transition-all hover:shadow-sm">

      <div className={`mb-3 ${color}`}>
        {icon}
      </div>

      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <h3 className="mt-1 text-xl font-bold">
        {value}
      </h3>

    </div>
  );
}