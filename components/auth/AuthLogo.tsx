"use client";

import Link from "next/link";

export default function AuthLogo() {
  return (
    <Link
      href="/"
      className="flex justify-center items-center gap-2 mb-8"
    >
      <div
        className="w-10 h-10 rounded-xl animate-pulse-glow"
        style={{
          background: "var(--gradient-orb)",
        }}
      />

      <h1 className="text-2xl font-semibold">
        Saathi
      </h1>
    </Link>
  );
}