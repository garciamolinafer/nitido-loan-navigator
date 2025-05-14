import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Team members from the Contacts tab
const teamMembers = [
  {
    id: "team-1",
    name: "Marina Neumann",
    role: "Senior Deal Manager",
    location: "San Francisco, USA",
    avatar: "/nitidina_image.jpg"
  },
  {
    id: "team-2",
    name: "Carlos Mendoza",
    role: "Deal Analytics Lead",
    location: "Madrid, Spain",
    avatar: null
  },
  {
    id: "team-3",
    name: "Sophie Chen",
    role: "Legal Operations Manager",
    location: "Hong Kong",
    avatar: null
  },
  {
    id: "team-4",
    name: "Lucas Silva",
    role: "Document Intelligence Specialist",
    location: "São Paulo, Brazil",
    avatar: null
  },
  {
    id: "team-5",
    name: "Sarah O'Connor",
    role: "Client Success Manager",
    location: "London, UK",
    avatar: null
  }
];

interface TeamAssignmentPopupProps {
  onAssign: (selectedMembers: string[]) => void;
  task: any; // Replace with proper task type
}

export function TeamAssignmentPopup({ onAssign, task }: TeamAssignmentPopupProps) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleAssign = () => {
    onAssign(selectedMembers);
    setIsOpen(false);
    setSelectedMembers([]);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          title="Assign to team members"
        >
          <Users className="h-4 w-4 text-blue-600" />
          <span className="sr-only">Assign to team members</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h4 className="font-medium">Assign Task</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Select team members to assign this task
          </p>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="p-4 space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-start space-x-3">
                <Checkbox
                  id={member.id}
                  checked={selectedMembers.includes(member.id)}
                  onCheckedChange={(checked) => {
                    setSelectedMembers(prev =>
                      checked
                        ? [...prev, member.id]
                        : prev.filter(id => id !== member.id)
                    );
                  }}
                />
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar || undefined} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <label
                      htmlFor={member.id}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {member.name}
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {member.role}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs mt-1 px-1 py-0 h-4"
                    >
                      {member.location}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-4 bg-muted/20">
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsOpen(false);
                setSelectedMembers([]);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAssign}
              disabled={selectedMembers.length === 0}
            >
              Assign ({selectedMembers.length})
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 