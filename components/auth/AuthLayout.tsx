"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-25 dark:opacity-20 animate-pulse-glow"
          style={{
            background: "var(--gradient-primary)",
          }}
        />

        <div
          className="absolute -bottom-[30%] -right-[20%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-20 dark:opacity-15"
          style={{
            background: "var(--gradient-orb)",
          }}
        />
      </div>

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
        className="glass rounded-3xl shadow-elegant p-8 w-full max-w-md"
      >
        {children}
      </motion.div>
    </main>
  );
}