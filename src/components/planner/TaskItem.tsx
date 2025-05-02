
import { useState } from "react";
import { Task } from "@/hooks/useTasks";
import { Link } from "react-router-dom";
import { Check, ExternalLink, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

interface TaskItemProps {
  task: Task;
  onToggleStatus: (taskId: string) => void;
}

export function TaskItem({ task, onToggleStatus }: TaskItemProps) {
  const [showActions, setShowActions] = useState(false);
  
  // Format the due date (e.g., "May 5, 2025")
  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getIconByType = (taskType: string) => {
    switch (taskType) {
      case "covenant":
        return <span className="text-purple-600 text-sm">🔍</span>; // FinScan
      case "document":
        return <span className="text-green-600 text-sm">📁</span>; // IntraLinks
      case "drawdown":
        return <span className="text-blue-600 text-sm">🏦</span>; // LoanIQ
      case "market":
        return <span className="text-amber-600 text-sm">📊</span>; // Versana 
      case "compliance":
        return <span className="text-red-600 text-sm">📋</span>; // Compliance
      default:
        return <span className="text-gray-600 text-sm">📝</span>;
    }
  };

  const getPriorityBadge = () => {
    switch (task.priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-amber-500 text-amber-700">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="border-green-500 text-green-700">Low</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    if (task.completed) {
      return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
    }
    
    switch (task.status) {
      case "in-progress":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "not-started":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Not Started</Badge>;
      default:
        return null;
    }
  };

  // Determine if task is overdue
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card 
      className={`border-t-0 rounded-none p-4 transition-colors ${
        task.completed ? 'bg-gray-50' : ''
      } ${
        isOverdue ? 'bg-red-50' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start md:items-center gap-3 relative">
        <div className="flex-shrink-0 mt-1 md:mt-0">
          {getIconByType(task.type)}
        </div>
        
        <div className="flex-grow">
          <div className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </div>
          <div className="text-sm text-muted-foreground flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <span>Deal: <Link to={`/deals/${task.dealId}`} className="text-blue-600 hover:underline">{task.dealName}</Link></span>
            <span className="hidden md:inline">•</span>
            <span>Due: {formattedDate}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          {getPriorityBadge()}
          {getStatusBadge()}
          
          {/* Quick action buttons */}
          <div className={`flex gap-2 ${showActions || task.completed ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant={task.completed ? "outline" : "default"}
                    className="h-8 w-8 p-0" 
                    onClick={() => onToggleStatus(task.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {task.completed ? "Mark as incomplete" : "Mark as complete"}
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-8 w-8 p-0" 
                    asChild
                  >
                    <Link to={`/deals/${task.dealId}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Open in Deal
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-8 w-8 p-0" 
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Ask Nitidina
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </Card>
  );
}
