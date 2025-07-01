import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { LogOut, Send } from "lucide-react";

export default function ChatRoom() {
  const { user, logout } = useAuth();
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white border-b shadow-sm py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Chat Room</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Logged in as <span className="font-semibold">{user?.username}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.isCurrentUser ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={message.isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-300"}>
                      {message.sender.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{message.sender}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.isCurrentUser
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <footer className="bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow"
            />
            <Button type="submit" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
}