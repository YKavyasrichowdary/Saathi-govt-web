"use client";

import { motion } from "framer-motion";
import ProgressCircle from "./ProgressCircle";

interface ScoreCardProps {
  title: string;
  score: number;
  description: string;
  subtitle?: string;
  variant?: "primary" | "success" | "warning" | "danger";
}

const variants = {
  primary: {
    border: "border-indigo-500/20",
    bg: "from-indigo-500/10 via-indigo-500/5 to-transparent",
    badge: "text-indigo-600 dark:text-indigo-400",
  },
  success: {
    border: "border-green-500/20",
    bg: "from-green-500/10 via-green-500/5 to-transparent",
    badge: "text-green-600 dark:text-green-400",
  },
  warning: {
    border: "border-yellow-500/20",
    bg: "from-yellow-500/10 via-yellow-500/5 to-transparent",
    badge: "text-yellow-600 dark:text-yellow-400",
  },
  danger: {
    border: "border-red-500/20",
    bg: "from-red-500/10 via-red-500/5 to-transparent",
    badge: "text-red-600 dark:text-red-400",
  },
};

export default function ScoreCard({
  title,
  score,
  description,
  subtitle,
  variant = "primary",
}: ScoreCardProps) {
  const style = variants[variant];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      whileHover={{
        y: -4,
      }}
      className={`
        rounded-3xl
        border
        ${style.border}
        bg-gradient-to-br
        ${style.bg}
        surface-card
        p-6
        shadow-sm
        flex
        flex-col
        justify-between
      `}
    >
      <h3 className="text-lg font-semibold text-foreground text-center sm:text-left">
        {title}
      </h3>

      <div className="my-6 flex justify-center">
        <ProgressCircle
          value={score}
          variant={variant}
          size={140}
        />
      </div>

      <div className="text-center space-y-1">
        <p className={`font-semibold text-base ${style.badge}`}>
          {description}
        </p>

        {subtitle && (
          <p className="text-xs text-muted-foreground max-w-[240px] mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}