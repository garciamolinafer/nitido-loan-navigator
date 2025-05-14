import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle, CheckCircle, Clock, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useNitidinaChat } from "@/hooks/useNitidinaChat";
import { TeamAssignmentPopup } from "./TeamAssignmentPopup";

// Mock data for tasks
const mockTasks = [
  {
    id: "task-1",
    title: "Prepare waiver letter for covenant breach",
    status: "in-progress",
    priority: "high",
    dueDate: "May 5, 2025",
    assignee: "Marina K.",
    relatedTab: "covenants",
    description: "Covenant breach of Net Leverage; need to draft a waiver for lenders."
  },
  {
    id: "task-2",
    title: "Submit KYC documents for new lender (Delta Bank)",
    status: "pending",
    priority: "medium",
    dueDate: "May 10, 2025",
    assignee: "Compliance Team",
    relatedTab: "kyc",
    description: "A new lender joined; KYC/AML checks pending.",
    integration: "FinScan"
  },
  {
    id: "task-3",
    title: "Distribute Q1 financial statements to lenders",
    status: "completed",
    priority: "medium",
    dueDate: "Apr 20, 2025",
    assignee: "Marina K.",
    relatedTab: "documents",
    description: "Q1 2025 Financials uploaded and distributed to lenders.",
    completedDate: "Apr 20, 2025"
  },
  {
    id: "task-4",
    title: "Review collateral documentation",
    status: "in-progress",
    priority: "medium",
    dueDate: "Apr 30, 2025",
    assignee: "Legal Counsel",
    relatedTab: "documents",
    description: "Legal team to review if all collateral filings are in place."
  },
  {
    id: "task-5",
    title: "Schedule lender meeting for annual review",
    status: "pending",
    priority: "low",
    dueDate: "Jun 15, 2025",
    assignee: "Marina K.",
    relatedTab: null,
    description: "Agent to set up a meeting for annual review discussion."
  },
  {
    id: "task-6",
    title: "Interest rate change notification",
    status: "completed",
    priority: "high",
    dueDate: "Mar 1, 2025",
    assignee: "John D.",
    relatedTab: "communications",
    description: "Sent notice of LIBOR rate reset to all participants.",
    completedDate: "Mar 1, 2025"
  },
  {
    id: "task-7",
    title: "Update deal participants list after amendment",
    status: "completed",
    priority: "medium",
    dueDate: "Mar 25, 2025",
    assignee: "Sarah L.",
    relatedTab: "contacts",
    description: "After Amendment No.1, updated the Contacts tab with new lenders.",
    completedDate: "Mar 22, 2025"
  },
  {
    id: "task-8",
    title: "Obtain signed credit agreement from borrower",
    status: "completed",
    priority: "high",
    dueDate: "Jan 5, 2025",
    assignee: "Marina K.",
    relatedTab: "documents",
    description: "All signatures collected and document stored.",
    completedDate: "Jan 5, 2025"
  },
  {
    id: "task-9",
    title: "Initial funding disbursement",
    status: "completed",
    priority: "high",
    dueDate: "Jan 15, 2025",
    assignee: "Finance Dept.",
    relatedTab: "loanAdmin",
    description: "Funds were disbursed according to credit agreement terms.",
    completedDate: "Jan 15, 2025"
  },
  {
    id: "task-10",
    title: "All Conditions Precedent satisfied",
    status: "completed",
    priority: "high", 
    dueDate: "Jan 15, 2025",
    assignee: "Marina K.",
    relatedTab: "documents",
    description: "CP checklist items all verified and completed.",
    completedDate: "Jan 12, 2025"
  }
];

const TasksTab = () => {
  const [filter, setFilter] = useState("open"); // open, completed, all
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { openNitidinaChat } = useNitidinaChat();
  
  // Filter tasks based on the selected filter
  const openTasks = mockTasks.filter(task => task.status !== "completed");
  const completedTasks = mockTasks.filter(task => task.status === "completed");
  
  const filteredTasks = filter === "all" 
    ? mockTasks 
    : filter === "open" 
      ? openTasks 
      : completedTasks;

  const handleTaskAction = (task: typeof mockTasks[0], action: string) => {
    if (action === "complete") {
      toast({
        title: "Task marked as complete",
        description: `"${task.title}" has been marked as complete.`,
      });
    } else if (action === "delegate") {
      // Generate a prompt for Nitidina about delegating the task
      const prompt = `I'd like to delegate this task: "${task.title}". Can you help me set up an automated workflow in Nítido Coworker?`;
      openNitidinaChat(prompt);
      
      toast({
        title: "Opening Nitidina chat",
        description: "Asking about delegating this task to Coworker.",
      });
    } else if (action === "navigate" && task.relatedTab) {
      // Navigate to the related tab
      navigate(`#${task.relatedTab}`);
      toast({
        title: "Navigating",
        description: `Going to ${task.relatedTab.charAt(0).toUpperCase() + task.relatedTab.slice(1)} tab.`,
      });
    } else if (action === "ask") {
      // Generate a task-specific prompt for Nitidina
      const isOverdue = new Date(task.dueDate) < new Date();
      const prompt = `I need help with a ${task.priority} priority task: "${task.title}", due on ${task.dueDate}.${isOverdue ? ' This task is overdue.' : ''} 
      ${task.description ? `Task details: ${task.description}` : ''}
      ${task.relatedTab ? `This is related to the ${task.relatedTab} section.` : ''}
      Can you help me with this?`;
      
      openNitidinaChat(prompt);
    }
  };
  
  const handleTeamAssignment = (taskId: string, selectedMembers: string[]) => {
    // In a real application, this would update the task's assignees in the backend
    toast({
      title: "Task assigned",
      description: `Task assigned to ${selectedMembers.length} team member${selectedMembers.length > 1 ? 's' : ''}.`,
    });
  };
  
  const renderTaskActions = (task: typeof mockTasks[0]) => (
    <div className="flex gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleTaskAction(task, "complete")}
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="sr-only">Mark as Complete</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as Complete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TeamAssignmentPopup 
        task={task}
        onAssign={(selectedMembers) => handleTeamAssignment(task.id, selectedMembers)}
      />
      
      {task.integration && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleTaskAction(task, "delegate")}
              >
                <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8V4m0 4 3-3m-3 3-3-3" />
                  <path d="M9 9h6v6h6l-3 3-3 3H9l-3-3-3-3h6V9Z" />
                </svg>
                <span className="sr-only">Delegate to AI</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delegate to AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleTaskAction(task, "ask")}
            >
              <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="sr-only">Ask Nitidina</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ask Nitidina</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {task.relatedTab && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleTaskAction(task, "navigate")}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m10 8 6 4-6 4V8Z" />
                </svg>
                <span className="sr-only">Go to {task.relatedTab}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to {task.relatedTab.charAt(0).toUpperCase() + task.relatedTab.slice(1)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
  
  // Check if a task is overdue
  const isOverdue = (dueDate: string) => {
    const today = new Date();
    const taskDate = new Date(dueDate);
    return taskDate < today;
  };
  
  // Check if a task is due soon (within 2 days)
  const isDueSoon = (dueDate: string) => {
    const today = new Date();
    const taskDate = new Date(dueDate);
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 2 && diffDays >= 0;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-lg font-medium">Deal Tasks</h2>
          <p className="text-sm text-muted-foreground">
            Manage tasks and deadlines specific to this deal
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2" onClick={() => toast({
            title: "Coming Soon",
            description: "This feature will be available in a future update."
          })}>
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate("/planner")}
            className="gap-1"
          >
            <Calendar className="h-4 w-4" />
            View All Tasks
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant={filter === "open" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("open")}
          className="gap-1"
        >
          <Clock className="h-3.5 w-3.5 text-blue-500" />
          Open Tasks ({openTasks.length})
        </Button>
        <Button 
          variant={filter === "completed" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("completed")}
          className="gap-1"
        >
          <CheckCircle className="h-3.5 w-3.5 text-green-500" />
          Completed Tasks ({completedTasks.length})
        </Button>
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("all")}
        >
          All Tasks
        </Button>
      </div>
      
      {filter === "open" && (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No open tasks found. All tasks have been completed!
                  </TableCell>
                </TableRow>
              ) : (
                openTasks.map((task) => (
                  <TableRow key={task.id} className={
                    isOverdue(task.dueDate) ? "bg-red-50" : 
                    isDueSoon(task.dueDate) ? "bg-yellow-50" : ""
                  }>
                    <TableCell>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-xs text-muted-foreground mt-1 max-w-md">
                        {task.description}
                      </div>
                      {task.relatedTab && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Related: <Button 
                            variant="link" 
                            size="sm" 
                            className="h-auto p-0 text-xs"
                            onClick={() => handleTaskAction(task, "navigate")}
                          >
                            {task.relatedTab.charAt(0).toUpperCase() + task.relatedTab.slice(1)}
                          </Button>
                        </div>
                      )}
                      {task.integration && (
                        <Badge variant="outline" className="text-xs mt-1 border-blue-200 text-blue-600">
                          {task.integration} Integration
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className={
                      isOverdue(task.dueDate) ? "text-red-600 font-medium" : 
                      isDueSoon(task.dueDate) ? "text-yellow-700 font-medium" : ""
                    }>
                      <div className="flex items-center gap-2">
                        {isOverdue(task.dueDate) && <AlertCircle className="h-4 w-4 text-red-500" />}
                        {isDueSoon(task.dueDate) && !isOverdue(task.dueDate) && <Clock className="h-4 w-4 text-yellow-500" />}
                        {task.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          task.status === "in-progress" ? "secondary" : 
                          "default"
                        }
                        className={
                          task.status === "in-progress" ? "text-blue-500 bg-blue-50" : 
                          "text-yellow-500 bg-yellow-50"
                        }
                      >
                        {task.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                        {task.status === "pending" && <AlertCircle className="h-3 w-3 mr-1" />}
                        {task.status === "in-progress" ? "In Progress" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {renderTaskActions(task)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
      
      {filter === "completed" && (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="font-medium line-through opacity-70">{task.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 max-w-md">
                      {task.description}
                    </div>
                    {task.relatedTab && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Related: <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-xs"
                          onClick={() => handleTaskAction(task, "navigate")}
                        >
                          {task.relatedTab.charAt(0).toUpperCase() + task.relatedTab.slice(1)}
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="opacity-70">{task.dueDate}</TableCell>
                  <TableCell className="text-green-600">{task.completedDate}</TableCell>
                  <TableCell className="opacity-70">{task.assignee}</TableCell>
                  <TableCell>
                    {task.relatedTab && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleTaskAction(task, "navigate")}
                      >
                        View
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {filter === "all" && (
        <div className="space-y-4">
          <div className="border rounded-md">
            <div className="bg-muted/30 px-4 py-2 border-b">
              <h3 className="font-medium">Open Tasks ({openTasks.length})</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openTasks.map((task) => (
                  <TableRow key={task.id} className={
                    isOverdue(task.dueDate) ? "bg-red-50" : 
                    isDueSoon(task.dueDate) ? "bg-yellow-50" : ""
                  }>
                    <TableCell>
                      <div className="font-medium">{task.title}</div>
                      {task.relatedTab && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Related: <Button 
                            variant="link" 
                            size="sm" 
                            className="h-auto p-0 text-xs"
                            onClick={() => handleTaskAction(task, "navigate")}
                          >
                            {task.relatedTab.charAt(0).toUpperCase() + task.relatedTab.slice(1)}
                          </Button>
                        </div>
                      )}
                      {task.integration && (
                        <Badge variant="outline" className="text-xs mt-1 border-blue-200 text-blue-600">
                          {task.integration} Integration
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className={
                      isOverdue(task.dueDate) ? "text-red-600 font-medium" : 
                      isDueSoon(task.dueDate) ? "text-yellow-700 font-medium" : ""
                    }>
                      <div className="flex items-center gap-2">
                        {isOverdue(task.dueDate) && <AlertCircle className="h-4 w-4 text-red-500" />}
                        {isDueSoon(task.dueDate) && !isOverdue(task.dueDate) && <Clock className="h-4 w-4 text-yellow-500" />}
                        {task.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          task.status === "in-progress" ? "secondary" : 
                          "default"
                        }
                        className={
                          task.status === "in-progress" ? "text-blue-500 bg-blue-50" : 
                          "text-yellow-500 bg-yellow-50"
                        }
                      >
                        {task.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                        {task.status === "pending" && <AlertCircle className="h-3 w-3 mr-1" />}
                        {task.status === "in-progress" ? "In Progress" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {renderTaskActions(task)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Collapsible open={isCompletedOpen} onOpenChange={setIsCompletedOpen}>
            <div className="border rounded-md">
              <CollapsibleTrigger className="w-full">
                <div className="bg-muted/30 px-4 py-2 border-b flex justify-between items-center">
                  <h3 className="font-medium">Completed Tasks ({completedTasks.length})</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {isCompletedOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div className="font-medium line-through opacity-70">{task.title}</div>
                          {task.relatedTab && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Related: <Button 
                                variant="link" 
                                size="sm" 
                                className="h-auto p-0 text-xs"
                                onClick={() => handleTaskAction(task, "navigate")}
                              >
                                {task.relatedTab.charAt(0).toUpperCase() + task.relatedTab.slice(1)}
                              </Button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="opacity-70">{task.dueDate}</TableCell>
                        <TableCell className="text-green-600">{task.completedDate}</TableCell>
                        <TableCell className="opacity-70">{task.assignee}</TableCell>
                        <TableCell>
                          {task.relatedTab && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleTaskAction(task, "navigate")}
                            >
                              View
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}
      
      <div className="p-4 border rounded-md mt-6 bg-blue-50 border-blue-100">
        <div className="flex gap-4 items-center">
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.7 14.9C15.3 14.6 13.7 17.3 12 21C10.3 17.3 8.7 14.6 4.3 14.9C4.7 8.9 9.8 2.9 12 2.9C14.2 2.9 19.3 8.9 19.7 14.9Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-700">Nitidina Assistant</h4>
            <p className="text-xs text-blue-600">You have 2 tasks due this week for this deal. Click on any task for more options or assistance.</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto border-blue-200 text-blue-700"
            onClick={() => {
              openNitidinaChat("What tasks are due this week for this deal?");
            }}
          >
            Ask for help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TasksTab;
