import { ReactNode } from "react";

interface ChatBubbleProps {
  children: ReactNode;
  tone?: "sky" | "mint" | "gold";
}

export default function ChatBubble({
  children,
  tone = "sky",
}: ChatBubbleProps) {
  const bg =
    tone === "mint"
      ? "bg-[var(--mint-soft)]"
      : tone === "gold"
      ? "bg-[var(--gold-soft)]"
      : "bg-surface";

  return (
    <div
      className={`rounded-2xl rounded-tl-md border border-border px-3.5 py-2.5 text-[12.5px] leading-relaxed text-foreground/90 ${bg}`}
    >
      {children}
    </div>
  );
}
