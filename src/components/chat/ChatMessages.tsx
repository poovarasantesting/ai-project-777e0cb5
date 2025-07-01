import { useEffect, useRef } from "react";
import { Message } from "@/pages/ChatPage";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex flex-col max-w-[80%]",
            message.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
          )}
        >
          <div
            className={cn(
              "px-4 py-3 rounded-lg",
              message.sender === "user"
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none"
            )}
          >
            {message.content}
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {format(message.timestamp, "p")}
          </span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}