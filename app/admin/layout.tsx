import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
      name: true,
      email: true,
      image: true,
    },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <AdminShell
      user={user}
    >
      {children}
    </AdminShell>
  );
}