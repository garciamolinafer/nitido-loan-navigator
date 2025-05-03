
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NitidinaAvatar } from "@/components/ui/nitidina-avatar";

interface ChatWelcomeMessageProps {
  setMessage: (message: string) => void;
}

export function ChatWelcomeMessage({ setMessage }: ChatWelcomeMessageProps) {
  return (
    <div className="flex gap-2">
      <NitidinaAvatar size="sm" className="mt-1" />
      <div>
        <p className="bg-gray-100 rounded-lg p-3 text-sm">
          Good morning, Marina. How can I help you today? You can ask me about your tasks, upcoming deadlines, or assistance with specific workflows.
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={() => setMessage("Show me my overdue tasks")}>
            Overdue tasks
          </Button>
          <Button variant="outline" size="sm" onClick={() => setMessage("Help me with covenants")}>
            Covenant help
          </Button>
          <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0">
            <Link to="/coworker">Open Coworker</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
