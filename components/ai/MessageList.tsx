import MessageBubble from "./MessageBubble";
import { ChatMessage } from "./types";

interface Props {
  messages: ChatMessage[];
}

export default function MessageList({
  messages,
}: Props) {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
          isError={message.isError}
        />
      ))}
    </div>
  );
}