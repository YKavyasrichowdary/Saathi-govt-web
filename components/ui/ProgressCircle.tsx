"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

export type ProgressVariant = "primary" | "success" | "warning" | "danger";

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  variant?: ProgressVariant;
  color?: string;
}

const variantColors: Record<ProgressVariant, string> = {
  primary: "#6366F1",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
};

export default function ProgressCircle({
  value,
  size = 130,
  strokeWidth = 10,
  label,
  variant = "primary",
  color,
}: ProgressCircleProps) {
  const strokeColor = color || variantColors[variant] || variantColors.primary;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / 100) * circumference;

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [value]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
          fill="none"
        />

        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: progress,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          style={{
            filter: `drop-shadow(0 0 6px ${strokeColor}40)`,
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-foreground">
          {displayValue}%
        </span>

        {label && (
          <span className="mt-1 text-xs text-muted-foreground">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}