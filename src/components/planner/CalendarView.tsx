
import { useState } from "react";
import { Task } from "@/hooks/useTasks";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { TaskItem } from "./TaskItem";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { DayContentProps } from "react-day-picker";

interface CalendarViewProps {
  tasks: Task[];
  onToggleStatus: (taskId: string) => void;
}

export function CalendarView({ tasks, onToggleStatus }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dayTasks, setDayTasks] = useState<Task[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Function to get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Handle day selection
  const handleDayClick = (date: Date | undefined) => {
    if (date) {
      const tasksForDay = getTasksForDate(date);
      setSelectedDate(date);
      setDayTasks(tasksForDay);
      if (tasksForDay.length > 0) {
        setIsSheetOpen(true);
      }
    }
  };

  // Render custom day content with task indicators
  const renderDayContent = (props: DayContentProps) => {
    if (!props.date) return null;
    
    const tasksForDay = getTasksForDate(props.date);
    
    const hasOverdueTasks = tasksForDay.some(task => 
      new Date(task.dueDate) < new Date() && !task.completed
    );
    
    const hasHighPriorityTasks = tasksForDay.some(task => 
      task.priority === "high" && !task.completed
    );
    
    return (
      <div className="relative w-full h-full flex flex-col items-center">
        <div className="pointer-events-auto">{props.date.getDate()}</div>
        {tasksForDay.length > 0 && (
          <div className="flex gap-1 mt-1">
            <div 
              className={`w-2 h-2 rounded-full ${
                hasOverdueTasks 
                  ? "bg-red-500" 
                  : hasHighPriorityTasks 
                  ? "bg-amber-500" 
                  : "bg-blue-500"
              }`}
            />
            {tasksForDay.length > 1 && (
              <div className="text-xs font-medium text-muted-foreground">
                +{tasksForDay.length - 1}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex flex-col items-center">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={handleDayClick}
          className="rounded-md border pointer-events-auto"
          components={{
            DayContent: renderDayContent
          }}
        />
        
        {selectedDate && (
          <Card className="mt-4 p-4 w-full">
            <h3 className="font-medium mb-2">
              Tasks for {format(selectedDate, "MMMM d, yyyy")}
            </h3>
            <div className="space-y-2">
              {getTasksForDate(selectedDate).length === 0 ? (
                <p className="text-muted-foreground text-sm">No tasks scheduled for this day</p>
              ) : (
                getTasksForDate(selectedDate).map(task => (
                  <div key={task.id} className="flex items-center gap-2">
                    <Badge 
                      variant={task.priority === "high" ? "destructive" : "outline"}
                      className="w-16 justify-center"
                    >
                      {task.priority}
                    </Badge>
                    <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                      {task.title}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>
        )}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Tasks for {selectedDate && format(selectedDate, "MMMM d, yyyy")}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {dayTasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggleStatus={onToggleStatus} 
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
