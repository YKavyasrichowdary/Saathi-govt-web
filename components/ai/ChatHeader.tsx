import { MessageSquareText } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between border-b border-border pb-4">
      <div>
        <h2 className="text-xl font-semibold">
          Conversation
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Ask Saathi anything about your career journey.
        </p>
      </div>

      <div className="rounded-xl bg-primary/10 p-3">
        <MessageSquareText className="h-5 w-5 text-primary" />
      </div>
    </div>
  );
}