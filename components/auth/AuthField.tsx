"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface AuthFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
}

export default function AuthField({
  label,
  icon: Icon,
  error,
  ...props
}: AuthFieldProps) {
  return (
    <div>
      <Label>{label}</Label>

      <div className="relative mt-1">
        <Icon className="absolute left-3 top-3.5 w-4 text-muted-foreground" />

        <Input
          {...props}
          className="pl-10 rounded-xl h-11"
        />
      </div>

      {error && (
        <p className="text-xs text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
}