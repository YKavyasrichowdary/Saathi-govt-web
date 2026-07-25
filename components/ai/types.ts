export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
  isError?: boolean;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: string;
}

export interface SuggestedQuestion {
  id: string;
  title: string;
  prompt: string;
}
export interface DailySummary {
  greeting: string;

  priority: string;

  profile: string;

  opportunities: string;

  advice: string;
}