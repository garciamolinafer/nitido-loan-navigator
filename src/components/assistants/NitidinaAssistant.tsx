
import { useState, useEffect } from "react";
import { useNitidinaChat } from "@/hooks/useNitidinaChat";
import { useNitidinaResponseGenerator } from "@/hooks/useNitidinaResponseGenerator";
import { NitidinaButton } from "./chat/NitidinaButton";
import { ChatWindow } from "./chat/ChatWindow";
import { MinimizedChat } from "./chat/MinimizedChat";

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export function NitidinaAssistant() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const { handleNitidinaResponse } = useNitidinaResponseGenerator();
  
  const { 
    isNitidinaOpen: isOpen, 
    nitidinaMessage, 
    openNitidinaChat, 
    closeNitidinaChat,
    setNitidinaMessage 
  } = useNitidinaChat();
  
  // Handle incoming messages from tasks
  useEffect(() => {
    if (nitidinaMessage && isOpen) {
      // Add system message based on the prompt
      handleNitidinaResponse(nitidinaMessage);
      // Clear the message from store after processing
      setNitidinaMessage("");
    }
  }, [nitidinaMessage, isOpen, setNitidinaMessage]);

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      if (!isOpen) {
        openNitidinaChat("");
      } else {
        closeNitidinaChat();
      }
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message to chat
      const userMessage: ChatMessage = {
        sender: "user",
        text: message,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      
      // Generate response based on user message
      const response = handleNitidinaResponse(message);
      
      // Clear input
      setMessage("");
      
      // Add assistant message to chat with a slight delay to feel more natural
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          sender: "assistant",
          text: response,
          timestamp: new Date()
        };
        
        setChatHistory(prev => [...prev, assistantMessage]);
      }, 500);
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <NitidinaButton onClick={toggleChat} />

      {/* Chat window */}
      {isOpen && !isMinimized && (
        <ChatWindow 
          isMinimized={isMinimized}
          chatHistory={chatHistory}
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
          minimizeChat={minimizeChat}
          closeChat={closeNitidinaChat}
        />
      )}

      {/* Minimized chat window */}
      {isMinimized && <MinimizedChat onClick={() => setIsMinimized(false)} />}
    </>
  );
}
