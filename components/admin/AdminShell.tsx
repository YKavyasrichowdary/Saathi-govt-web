"use client";

import { AppShell } from "@/components/AppShell";
import { adminNavigation } from "@/config/admin-navigation";

export default function AdminShell({
  user,
  children,
}: {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  children: React.ReactNode;
}) {
  return (
    <AppShell
      navigation={adminNavigation}
      title="Admin Portal"
      subtitle={`Welcome back, ${user?.name || "Admin"}`}
    >
      {children}
    </AppShell>
  );
}
