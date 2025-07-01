import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { format } from "date-fns";
import { nanoid } from "nanoid";
import { useAuth } from "./AuthContext";

type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
};

type ChatContextType = {
  messages: Message[];
  sendMessage: (text: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  // Save messages to localStorage when they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || !user) return;

    const newMessage = {
      id: nanoid(),
      text,
      sender: user.username,
      timestamp: format(new Date(), "h:mm a"),
      isCurrentUser: true
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate a reply after a short delay
    setTimeout(() => {
      const botReplies = [
        "That's interesting!",
        "Tell me more about that.",
        "I understand what you mean.",
        "Great point!",
        "I hadn't thought of it that way.",
        "Thanks for sharing that.",
      ];
      
      const botMessage = {
        id: nanoid(),
        text: botReplies[Math.floor(Math.random() * botReplies.length)],
        sender: "ChatBot",
        timestamp: format(new Date(), "h:mm a"),
        isCurrentUser: false
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}