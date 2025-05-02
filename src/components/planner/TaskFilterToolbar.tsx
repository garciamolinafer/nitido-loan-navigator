
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFilters {
  deal: string;
  taskType: string;
  assignee: string;
  search: string;
}

interface TaskFilterToolbarProps {
  filters: TaskFilters;
  onFilterChange: (filters: Partial<TaskFilters>) => void;
}

export function TaskFilterToolbar({ filters, onFilterChange }: TaskFilterToolbarProps) {
  // Sample data for filter options
  const deals = [
    { id: "all", name: "All Deals" },
    { id: "orion-bridge", name: "Orion Bridge Loan" },
    { id: "apex-syndicate", name: "Apex Syndicate Loan" },
    { id: "betacorp", name: "BetaCorp Revolver" },
    { id: "gammaltd", name: "GammaLtd Credit" },
    { id: "epsilon-green", name: "Epsilon Green Loan" },
    { id: "omega-debt", name: "Omega Debt Facility" },
  ];

  const taskTypes = [
    { id: "all", name: "All Types" },
    { id: "covenant", name: "Covenants" },
    { id: "document", name: "Documentation" },
    { id: "notice", name: "Notices" },
    { id: "kyc", name: "KYC / Compliance" },
    { id: "drawdown", name: "Drawdown Requests" },
    { id: "interest", name: "Interest & Payments" },
  ];

  const assignees = [
    { id: "my-tasks", name: "My Tasks" },
    { id: "team-tasks", name: "Team Tasks" },
    { id: "all-tasks", name: "All Tasks" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
      <Select
        value={filters.deal}
        onValueChange={(value) => onFilterChange({ deal: value })}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Select Deal" />
        </SelectTrigger>
        <SelectContent>
          {deals.map((deal) => (
            <SelectItem key={deal.id} value={deal.id}>
              {deal.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.taskType}
        onValueChange={(value) => onFilterChange({ taskType: value })}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Task Type" />
        </SelectTrigger>
        <SelectContent>
          {taskTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.assignee}
        onValueChange={(value) => onFilterChange({ assignee: value })}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Assignee" />
        </SelectTrigger>
        <SelectContent>
          {assignees.map((assignee) => (
            <SelectItem key={assignee.id} value={assignee.id}>
              {assignee.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative w-full md:w-[200px]">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="pl-8"
        />
      </div>
    </div>
  );
}
