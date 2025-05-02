
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task } from "./TaskItem";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

interface CalendarViewProps {
  tasks: Task[];
}

export function CalendarView({ tasks }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get tasks for the selected date
  const getTasksForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get dates with tasks
  const getDatesWithTasks = () => {
    const dates: Date[] = [];
    tasks.forEach(task => {
      dates.push(new Date(task.dueDate));
    });
    return dates;
  };
  
  const tasksForSelectedDate = getTasksForDate(selectedDate);
  const datesWithTasks = getDatesWithTasks();

  // Render calendar day with task indicators
  const renderCalendarDay = (day: Date) => {
    const tasksForDay = getTasksForDate(day);
    
    if (tasksForDay.length === 0) return null;
    
    // Count tasks by status
    const overdueCount = tasksForDay.filter(t => t.status === "Overdue").length;
    const highPriorityCount = tasksForDay.filter(t => t.priority === "High").length;
    
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        {overdueCount > 0 && (
          <div className="h-1 w-1 bg-red-500 rounded-full mb-0.5"></div>
        )}
        {highPriorityCount > 0 && overdueCount === 0 && (
          <div className="h-1 w-1 bg-amber-500 rounded-full mb-0.5"></div>
        )}
        {overdueCount === 0 && highPriorityCount === 0 && tasksForDay.length > 0 && (
          <div className="h-1 w-1 bg-blue-500 rounded-full mb-0.5"></div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-1">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="border rounded-md p-4 bg-white"
          classNames={{
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-gray-100 text-gray-900",
          }}
          components={{
            DayContent: ({ day }) => (
              <div className="flex flex-col items-center">
                <div className="text-sm">{day.day}</div>
                {renderCalendarDay(day.date)}
              </div>
            ),
          }}
        />
      </div>
      
      <div className="col-span-1 lg:col-span-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-4">
              {selectedDate ? (
                <span>
                  Tasks for {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              ) : 'Select a date'}
            </h3>
            
            {tasksForSelectedDate.length === 0 ? (
              <p className="text-muted-foreground">No tasks scheduled for this date.</p>
            ) : (
              <div className="space-y-3">
                {tasksForSelectedDate.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-md border hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <Link 
                        to={`/deals/${task.dealId}`} 
                        className="font-medium text-blue-600 hover:underline block"
                      >
                        {task.dealName}
                      </Link>
                      <p className="text-sm text-gray-700">{task.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={
                            task.status === "Overdue" ? "destructive" : 
                            task.status === "Due Today" ? "default" :
                            task.status === "Completed" ? "outline" : "secondary"
                          }
                        >
                          {task.status}
                        </Badge>
                        {task.priority === "High" && (
                          <Badge variant="outline" className="border-red-500 text-red-500">
                            High Priority
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link 
                          to={`/deals/${task.dealId}`}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          View Deal →
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Open deal details</TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
