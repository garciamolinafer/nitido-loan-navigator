
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  dealId: string;
  dealName: string;
  description: string;
  dueDate: string;
  status: "Overdue" | "Due Today" | "Upcoming" | "Open" | "Scheduled" | "Completed";
  priority: "Low" | "Medium" | "High";
  category: "Document" | "LoanIQ" | "Compliance" | "KYC" | "Communications" | "Versana" | "IntraLinks" | "Other";
  isAutomatable?: boolean;
}

interface TaskItemProps {
  task: Task;
  onAssistClick: (task: Task) => void;
  onMarkComplete: (taskId: string) => void;
}

export function TaskItem({ task, onAssistClick, onMarkComplete }: TaskItemProps) {
  // Determine if task is overdue
  const isOverdue = task.status === "Overdue";
  const isDueToday = task.status === "Due Today";
  
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Document":
        return "/lovable-uploads/doc-icon.svg";
      case "LoanIQ":
        return "/lovable-uploads/loaniq-icon.svg";
      case "IntraLinks":
        return "/lovable-uploads/intralinks-icon.svg";
      case "KYC":
        return "/lovable-uploads/finscan-icon.svg";
      default:
        return "/placeholder.svg";
    }
  };

  return (
    <div className={cn(
      "group flex items-center p-3 border-b hover:bg-slate-50 transition-colors",
      isOverdue && "bg-red-50",
      isDueToday && "bg-amber-50"
    )}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <img 
            src={getCategoryIcon(task.category)} 
            alt={task.category} 
            className="w-4 h-4"
          />
          <Link 
            to={`/deals/${task.dealId}`} 
            className="font-medium text-blue-600 hover:underline truncate"
          >
            {task.dealName}
          </Link>
          {task.priority === "High" && (
            <Badge variant="destructive" className="ml-auto">High Priority</Badge>
          )}
        </div>
        <p className="text-sm text-gray-700 mb-1">{task.description}</p>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span className={cn(
            isOverdue && "text-red-600 font-medium",
            isDueToday && "text-amber-600 font-medium"
          )}>
            {isOverdue ? "Overdue: " : "Due: "}
            {formatDate(task.dueDate)}
          </span>
          
          <Badge variant={
            isOverdue ? "destructive" : 
            isDueToday ? "default" :
            task.status === "Completed" ? "outline" : "secondary"
          } className="ml-2 px-2 py-0 h-5">
            {task.status}
          </Badge>
        </div>
      </div>
      
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {task.isAutomatable && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0" 
                onClick={() => onAssistClick(task)}
              >
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Get assistance</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ask Nitidina for help</TooltipContent>
          </Tooltip>
        )}
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="sm" 
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => onMarkComplete(task.id)} 
            >
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Mark as complete</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mark as complete</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Link to={`/deals/${task.dealId}`}>
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Open deal</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open deal</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
