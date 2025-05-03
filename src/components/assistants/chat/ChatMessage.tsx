
import { NitidinaAvatar } from "@/components/ui/nitidina-avatar";

interface ChatMessageProps {
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
  index: number;
}

export function ChatMessage({ sender, text, timestamp, index }: ChatMessageProps) {
  return (
    <div className={`flex gap-2 ${sender === "user" ? "justify-end" : ""}`}>
      {sender === "assistant" && <NitidinaAvatar size="sm" className="mt-1" />}
      <div className={`max-w-[80%] ${sender === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100"} rounded-lg p-3 text-sm`}>
        {text.split('\n').map((line, i) => (
          <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
        ))}
      </div>
      {sender === "user" && <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">M</div>}
    </div>
  );
}
