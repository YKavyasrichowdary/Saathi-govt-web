import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function ErrorState({
  title,
  description,
  action,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl border border-destructive/30 bg-destructive/5 p-8 text-center">
      <AlertTriangle className="mb-4 h-10 w-10 text-destructive" />

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
