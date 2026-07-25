"use client";

import { Sparkles } from "lucide-react";

const QUESTIONS = [
  "Recommend internships for me",
  "Find scholarships",
  "Review my resume",
  "Improve my profile",
  "Create my career roadmap",
  "What should I do today?",
];

interface Props {
  onSelect(question: string): void;
}

export default function SuggestedQuestions({
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {QUESTIONS.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
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
            cursor-pointer
          "
        >
          <Sparkles className="mr-2 h-3.5 w-3.5 text-primary shrink-0 transition-transform group-hover:scale-110" />
          <span>{question}</span>
        </button>
      ))}
    </div>
  );
}