
import { Task } from "@/hooks/useTasks";
import { TaskGroup } from "./TaskGroup";

interface ListViewProps {
  tasks: Task[];
  onToggleStatus: (taskId: string) => void;
}

export function ListView({ tasks, onToggleStatus }: ListViewProps) {
  // Group tasks by their time category
  const overdueTasks = tasks.filter(task => new Date(task.dueDate) < new Date() && !task.completed);
  const todayTasks = tasks.filter(task => {
    const today = new Date();
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === today.toDateString() && !task.completed;
  });
  
  const nextWeekTasks = tasks.filter(task => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const taskDate = new Date(task.dueDate);
    return taskDate > today && 
           taskDate <= nextWeek && 
           taskDate.toDateString() !== today.toDateString() &&
           !task.completed;
  });
  
  const upcomingTasks = tasks.filter(task => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const taskDate = new Date(task.dueDate);
    return taskDate > nextWeek && !task.completed;
  });
  
  const completedTasks = tasks.filter(task => task.completed);

  // Show empty state if no tasks match the filters
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-12 text-center">
        <h3 className="text-lg font-medium mb-2">No tasks found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or adding a new task</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {overdueTasks.length > 0 && (
        <TaskGroup 
          title="Overdue" 
          tasks={overdueTasks} 
          onToggleStatus={onToggleStatus} 
          variant="overdue"
        />
      )}
      
      {todayTasks.length > 0 && (
        <TaskGroup 
          title="Due Today" 
          tasks={todayTasks} 
          onToggleStatus={onToggleStatus} 
          variant="today"
        />
      )}
      
      {nextWeekTasks.length > 0 && (
        <TaskGroup 
          title="Next 7 Days" 
          tasks={nextWeekTasks} 
          onToggleStatus={onToggleStatus} 
          variant="upcoming"
        />
      )}
      
      {upcomingTasks.length > 0 && (
        <TaskGroup 
          title="Upcoming" 
          tasks={upcomingTasks} 
          onToggleStatus={onToggleStatus} 
          variant="upcoming"
        />
      )}
      
      {completedTasks.length > 0 && (
        <TaskGroup 
          title="Completed" 
          tasks={completedTasks} 
          onToggleStatus={onToggleStatus} 
          variant="completed"
        />
      )}
    </div>
  );
}
