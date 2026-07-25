"use client";

import { useEffect, useRef, useState } from "react";

import EmptyState from "./EmptyState";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import TypingIndicator from "./TypingIndicator";
import { ChatMessage } from "./types";

export default function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSend(message: string) {
    if (!message.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "⚠️ Unable to reach Saathi.\n\nPlease try again in a few seconds.",
            isError: true,
            createdAt: new Date(),
          },
        ]);
        return;
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        createdAt: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "⚠️ Unable to reach Saathi.\n\nPlease try again in a few seconds.",
          isError: true,
          createdAt: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="surface-card rounded-3xl p-8">

      <ChatHeader />

      <div className="mt-8 space-y-6">

        {messages.length === 0 ? (
          <>
            <EmptyState />

            <SuggestedQuestions
              onSelect={handleSend}
            />
          </>
        ) : (
          <>
            <MessageList
              messages={messages}
            />

            {loading && (
              <TypingIndicator />
            )}
          </>
        )}

        <div ref={bottomRef} />

      </div>

      <div className="mt-8">

        <ChatInput
          onSend={handleSend}
          loading={loading}
        />

      </div>

    </section>
  );
}