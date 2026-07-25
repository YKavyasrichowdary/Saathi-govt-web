"use client";

import { SendHorizontal } from "lucide-react";
import { useState } from "react";

interface Props {
  onSend(message: string): void;
  loading?: boolean;
}

export default function ChatInput({
  onSend,
  loading = false,
}: Props) {
  const [message, setMessage] = useState("");

  function send() {
    const text = message.trim();

    if (!text) return;

    onSend(text);

    setMessage("");
  }

  return (
    <div className="flex items-end gap-3 border-t border-border pt-4">

      <textarea
        rows={1}
        value={message}
        disabled={loading}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.shiftKey
          ) {
            e.preventDefault();
            send();
          }
        }}
        placeholder="Ask Saathi anything..."
        className="min-h-[52px] flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
      />

      <button
        disabled={loading}
        onClick={send}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
      >
        <SendHorizontal className="h-5 w-5" />
      </button>

    </div>
  );
}