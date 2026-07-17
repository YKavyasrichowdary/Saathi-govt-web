"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="rounded-full hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all flex items-center gap-2 cursor-pointer h-10 px-4 text-sm font-medium"
    >
      <LogOut className="w-4 h-4" />
      Sign out
    </Button>
  );
}
