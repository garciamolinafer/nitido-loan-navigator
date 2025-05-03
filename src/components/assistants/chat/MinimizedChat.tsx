
import { Card, CardContent } from "@/components/ui/card";
import { NitidinaAvatar } from "@/components/ui/nitidina-avatar";

interface MinimizedChatProps {
  onClick: () => void;
}

export function MinimizedChat({ onClick }: MinimizedChatProps) {
  return (
    <Card className="fixed bottom-20 right-6 w-60 shadow-lg z-50 cursor-pointer" onClick={onClick}>
      <CardContent className="p-3 flex items-center gap-2">
        <NitidinaAvatar size="sm" />
        <span className="text-sm">Chat with Nitidina</span>
      </CardContent>
    </Card>
  );
}
