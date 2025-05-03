
import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatWelcomeMessage } from "./ChatWelcomeMessage";
import { ChatInput } from "./ChatInput";
import { Button } from "@/components/ui/button";
import { X, MinusCircle } from "lucide-react";
import { NitidinaAvatar } from "@/components/ui/nitidina-avatar";

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

interface ChatWindowProps {
  isMinimized: boolean;
  chatHistory: ChatMessage[];
  message: string;
  setMessage: (message: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  minimizeChat: () => void;
  closeChat: () => void;
}

export function ChatWindow({
  isMinimized,
  chatHistory,
  message,
  setMessage,
  handleSubmit,
  minimizeChat,
  closeChat
}: ChatWindowProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-lg z-50 flex flex-col border">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <NitidinaAvatar size="sm" />
          <span className="font-medium">Nitidina</span>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={minimizeChat}>
            <MinusCircle className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={closeChat}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-3 h-80 flex flex-col gap-3">
        {chatHistory.length === 0 ? (
          <ChatWelcomeMessage setMessage={setMessage} />
        ) : (
          chatHistory.map((msg, index) => (
            <ChatMessage key={index} {...msg} index={index} />
          ))
        )}
        <div ref={chatEndRef} />
      </div>
      <ChatInput 
        message={message}
        setMessage={setMessage}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
