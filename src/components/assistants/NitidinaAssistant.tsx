
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Send, MinusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { NitidinaAvatar } from "./NitidinaAvatar";

export function NitidinaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, we would send the message to the AI
      console.log("User message:", message);
      setMessage("");
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={toggleChat}
        className="fixed right-6 bottom-6 rounded-full h-12 w-12 shadow-lg p-0 animate-pulse hover:animate-none z-50"
        variant="default"
      >
        <NitidinaAvatar size="lg" />
      </Button>

      {/* Chat window */}
      {isOpen && !isMinimized && (
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
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-3 h-80 flex flex-col gap-3">
            <div className="flex gap-2">
              <NitidinaAvatar size="sm" className="mt-1" />
              <div>
                <p className="bg-gray-100 rounded-lg p-3 text-sm">
                  Good morning, Marina. Today I've reconciled your Outlook calendar with pending portfolio actions. 
                  There are several validations awaiting in{" "}
                  <Link to="/coworker" className="text-blue-500 hover:underline">Nítido Coworker</Link> — shall we start there?
                </p>
                <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0">
                  <Link to="/coworker">Open Coworker</Link>
                </Button>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Minimized chat window */}
      {isMinimized && (
        <Card className="fixed bottom-20 right-6 w-60 shadow-lg z-50 cursor-pointer" onClick={() => setIsMinimized(false)}>
          <CardContent className="p-3 flex items-center gap-2">
            <NitidinaAvatar size="sm" />
            <span className="text-sm">Chat with Nitidina</span>
          </CardContent>
        </Card>
      )}
    </>
  );
}
