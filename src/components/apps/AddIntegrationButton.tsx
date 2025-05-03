
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddIntegrationButtonProps {
  onClick: () => void;
}

export function AddIntegrationButton({ onClick }: AddIntegrationButtonProps) {
  return (
    <Button onClick={onClick} className="whitespace-nowrap">
      <Plus className="h-4 w-4 mr-2" /> Add Integration
    </Button>
  );
}
