import { Button } from "@/components/ui/button";
import { NitidinaAvatar } from "@/components/ui/nitidina-avatar";

interface NitidinaButtonProps {
  onClick: () => void;
}

export function NitidinaButton({ onClick }: NitidinaButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed right-6 bottom-6 rounded-full h-[60px] w-[60px] shadow-lg p-0 animate-pulse hover:animate-none z-50"
      variant="default"
    >
      <NitidinaAvatar size="xl" />
    </Button>
  );
}
