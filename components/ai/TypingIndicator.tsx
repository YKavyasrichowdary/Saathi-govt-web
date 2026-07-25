import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="h-5 w-5" />
        </div>

        <div className="rounded-2xl bg-muted px-5 py-4">
          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-primary"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-primary"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}