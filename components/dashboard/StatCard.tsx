"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  color: string;
}

export default function StatCard({
  icon,
  label,
  value,
  color,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="rounded-2xl border border-border bg-background p-5"
    >
      <div
        className={`mb-4 inline-flex rounded-xl p-3 ${color}`}
      >
        {icon}
      </div>

      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>
    </motion.div>
  );
}