import { useState } from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { v4 as uuidv4 } from "uuid";

export type Message = {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
};

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "other",
      timestamp: new Date(),
    },
  ]);

  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: uuidv4(),
        content: "Thanks for your message! This is a simulated response.",
        sender: "other",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}