
import { Task } from "@/hooks/useTasks";
import { TaskItem } from "./TaskItem";

interface TaskGroupProps {
  title: string;
  tasks: Task[];
  onToggleStatus: (taskId: string) => void;
  variant: "overdue" | "today" | "upcoming" | "completed";
}

export function TaskGroup({ title, tasks, onToggleStatus, variant }: TaskGroupProps) {
  const getHeaderClassName = () => {
    switch (variant) {
      case "overdue":
        return "border-l-4 border-red-500 bg-red-50 text-red-800";
      case "today":
        return "border-l-4 border-amber-500 bg-amber-50 text-amber-800";
      case "upcoming":
        return "border-l-4 border-blue-500 bg-blue-50 text-blue-800";
      case "completed":
        return "border-l-4 border-green-500 bg-green-50 text-green-800";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className={`px-4 py-2 text-sm font-semibold ${getHeaderClassName()}`}>
        {title} ({tasks.length})
      </div>
      <div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggleStatus={onToggleStatus} />
        ))}
      </div>
    </div>
  );
}
