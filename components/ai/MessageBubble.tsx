import { Bot, UserRound } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

export default function MessageBubble({
  role,
  content,
  isError: isErrorProp,
}: Props) {
  const isUser = role === "user";
  const isError = isErrorProp || content.includes("Unable to reach Saathi");

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[80%] gap-3 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isError
              ? "bg-destructive/10 text-destructive border border-destructive/20"
              : isUser
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {isUser ? (
            <UserRound className="h-5 w-5" />
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </div>

        {/* Content Column */}
        <div className="flex flex-col min-w-0">
          {!isUser && (
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold text-primary">
                ✨ Saathi
              </span>
            </div>
          )}

          {isUser && (
            <div className="mb-2 text-right text-sm font-medium text-muted-foreground">
              You
            </div>
          )}

          {/* Bubble */}
          <div
            className={`rounded-2xl px-5 py-4 shadow-sm ${
              isError
                ? "bg-destructive/10 text-destructive border border-destructive/20"
                : isUser
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <div
              className={`prose prose-sm max-w-none ${
                isError
                  ? "text-destructive prose-p:text-destructive"
                  : isUser
                  ? "prose-invert text-primary-foreground"
                  : "dark:prose-invert"
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}