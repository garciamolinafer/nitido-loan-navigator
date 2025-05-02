
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle, CheckCircle, Clock } from "lucide-react";

// Mock data for tasks
const mockTasks = [
  {
    id: "task-1",
    title: "Review Q1 Compliance Certificate",
    status: "pending",
    priority: "high",
    dueDate: "May 5, 2025",
    assignee: "Marina K.",
    relatedTab: "documents"
  },
  {
    id: "task-2",
    title: "Approve covenant waiver request",
    status: "in-progress",
    priority: "high",
    dueDate: "May 3, 2025",
    assignee: "Marina K.",
    relatedTab: "covenants"
  },
  {
    id: "task-3",
    title: "Update borrower contact information",
    status: "completed",
    priority: "medium",
    dueDate: "Apr 28, 2025",
    assignee: "John D.",
    relatedTab: "contacts"
  },
  {
    id: "task-4",
    title: "Schedule loan committee meeting",
    status: "pending",
    priority: "medium",
    dueDate: "May 10, 2025",
    assignee: "Marina K.",
    relatedTab: null
  },
  {
    id: "task-5",
    title: "KYC refresh for Delta Bank",
    status: "in-progress",
    priority: "medium",
    dueDate: "May 7, 2025",
    assignee: "Sarah L.",
    relatedTab: "kyc"
  }
];

const TasksTab = () => {
  const [filter, setFilter] = useState("all"); // all, pending, in-progress, completed
  
  const filteredTasks = filter === "all" 
    ? mockTasks 
    : mockTasks.filter(task => task.status === filter);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Deal Tasks</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button 
          variant={filter === "pending" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("pending")}
          className="gap-1"
        >
          <AlertCircle className="h-3.5 w-3.5 text-yellow-500" />
          Pending
        </Button>
        <Button 
          variant={filter === "in-progress" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("in-progress")}
          className="gap-1"
        >
          <Clock className="h-3.5 w-3.5 text-blue-500" />
          In Progress
        </Button>
        <Button 
          variant={filter === "completed" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("completed")}
          className="gap-1"
        >
          <CheckCircle className="h-3.5 w-3.5 text-green-500" />
          Completed
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div className="font-medium">{task.title}</div>
                  {task.relatedTab && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Related: <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        {task.relatedTab.charAt(0).toUpperCase() + task.relatedTab.slice(1)}
                      </Button>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      task.status === "completed" ? "outline" : 
                      task.status === "in-progress" ? "secondary" : 
                      "default"
                    }
                    className={
                      task.status === "completed" ? "text-green-500 bg-green-50" : 
                      task.status === "in-progress" ? "text-blue-500 bg-blue-50" : 
                      "text-yellow-500 bg-yellow-50"
                    }
                  >
                    {task.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {task.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                    {task.status === "pending" && <AlertCircle className="h-3 w-3 mr-1" />}
                    {task.status === "completed" ? "Completed" : 
                     task.status === "in-progress" ? "In Progress" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className={task.priority === "high" ? "text-red-500 font-medium" : ""}>
                  {task.dueDate}
                </TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      task.priority === "high" ? "border-red-200 text-red-600" : 
                      task.priority === "medium" ? "border-yellow-200 text-yellow-600" : 
                      "border-green-200 text-green-600"
                    }
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TasksTab;
