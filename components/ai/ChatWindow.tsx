"use client";

import React, { useState, useRef, useEffect } from "react";
import { CheckCircle2, Bot, Sparkles } from "lucide-react";
import { ChatMessage } from "./types";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: messageText,
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
          message: messageText,
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const assistantMessage: ChatMessage = {
          id: Date.now().toString() + "-assistant",
          role: "assistant",
          content: data.reply,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: Date.now().toString() + "-error",
          role: "assistant",
          content: "⚠️ Unable to reach Saathi.\n\nPlease try again in a few seconds.",
          isError: true,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("AI Request Failed:", error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + "-error",
        role: "assistant",
        content: "⚠️ Unable to reach Saathi.\n\nPlease try again in a few seconds.",
        isError: true,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/50 text-emerald-400">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            Saathi AI Companion
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </h2>
          <p className="text-xs text-zinc-400">Your 24/7 personal career assistant</p>
        </div>
      </div>

      {/* Messages / Empty State Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          /* Step 7: Empty State */
          <div className="flex flex-col items-center justify-center min-h-[380px] text-center max-w-md mx-auto my-auto space-y-6">
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 shadow-xl">
                <span className="text-3xl" role="img" aria-label="Bot">
                  🤖
                </span>
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-emerald-400 animate-bounce" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-zinc-100 mb-1">Hi there!</h3>
              <p className="text-base font-semibold text-emerald-400 mb-4">I&apos;m Saathi.</p>
              <p className="text-xs text-zinc-400 mb-4">I can help you:</p>

              <ul className="text-left space-y-2 text-sm text-zinc-300 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Find internships</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Discover scholarships</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Improve your profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Review applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Plan your career</span>
                </li>
              </ul>
            </div>

            {/* Suggested Questions in Empty State */}
            <div className="w-full pt-2">
              <SuggestedQuestions onSelect={handleSend} disabled={loading} />
            </div>
          </div>
        ) : (
          /* Render Messages */
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} role={msg.role} content={msg.content} isError={msg.isError} />
            ))}

            {/* Step 9: Typing Indicator */}
            {loading && (
              <div className="flex items-start gap-3 my-3 mr-auto">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-700/50 text-base">
                  <span role="img" aria-label="Saathi Bot">
                    🤖
                  </span>
                </div>
                <div className="rounded-2xl rounded-tl-xs px-4 py-3 bg-zinc-900/90 text-zinc-300 border border-zinc-800 text-sm flex items-center gap-3 shadow-sm">
                  <span className="font-medium text-xs text-emerald-400">
                    Saathi is thinking...
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Suggested Questions above input when messages exist */}
      {messages.length > 0 && (
        <div className="px-6 py-2 border-t border-zinc-800/40 bg-zinc-950/50">
          <SuggestedQuestions onSelect={handleSend} disabled={loading} />
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md">
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
}
