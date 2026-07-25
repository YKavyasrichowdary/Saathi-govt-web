"use client";

import React from "react";
import { Sparkles } from "lucide-react";

const QUESTIONS = [
  "What should I do today?",
  "Recommend internships",
  "Recommend scholarships",
  "Improve my profile",
  "Review my applications",
  "How can I improve my resume?",
];

interface Props {
  onSelect(question: string): void;
  disabled?: boolean;
}

export default function SuggestedQuestions({ onSelect, disabled }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-3">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span>Suggested Questions</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {QUESTIONS.map((question, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(question)}
            disabled={disabled}
            className="
              group
              inline-flex
              items-center
              rounded-full
              border
              border-border
              bg-background
              px-5
              py-2.5
              text-sm
              font-medium
              text-foreground
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-primary
              hover:bg-primary/10
              hover:text-primary
              hover:shadow-md
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            <Sparkles className="mr-2 h-3.5 w-3.5 text-primary shrink-0 transition-transform group-hover:scale-110" />
            <span>{question}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
