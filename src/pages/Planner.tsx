
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { TaskItem, Task } from "@/components/planner/TaskItem";
import { TaskFilterToolbar } from "@/components/planner/TaskFilterToolbar";
import { CalendarView } from "@/components/planner/CalendarView";
import { NitidinaWelcomeBanner } from "@/components/planner/NitidinaWelcomeBanner";
import { ConnectedApps } from "@/components/planner/ConnectedApps";
import { mockTasks, getDealsFromTasks, connectedApps } from "@/data/mock-tasks";
import { useToast } from "@/hooks/use-toast";
import { 
  Sheet,
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NitidinaAvatar } from "@/components/assistants/NitidinaAvatar";

const Planner = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [showBanner, setShowBanner] = useState(true);
  const [showAssistantSheet, setShowAssistantSheet] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [groupedTasks, setGroupedTasks] = useState<Record<string, Task[]>>({});
  
  // Stats for welcome banner
  const overdueCount = tasks.filter(t => t.status === "Overdue").length;
  const dueTodayCount = tasks.filter(t => t.status === "Due Today").length;
  
  // Get unique deals
  const deals = getDealsFromTasks();

  // Helper function to group tasks by status
  const groupTasksByStatus = (taskList: Task[]) => {
    return taskList.reduce((acc, task) => {
      const key = task.status;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(task);
      return acc;
    }, {} as Record<string, Task[]>);
  };

  // Update grouped tasks when filtered tasks change
  useEffect(() => {
    setGroupedTasks(groupTasksByStatus(filteredTasks));
  }, [filteredTasks]);
  
  // Handle filter changes
  const handleFilterChange = (filters: {
    search: string;
    dealNames: string[];
    categories: string[];
    statuses: string[];
  }) => {
    let filtered = [...tasks];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(task => 
        task.description.toLowerCase().includes(searchLower) ||
        task.dealName.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.dealNames.length > 0) {
      filtered = filtered.filter(task => 
        filters.dealNames.includes(task.dealName)
      );
    }
    
    if (filters.categories.length > 0) {
      filtered = filtered.filter(task => 
        filters.categories.includes(task.category)
      );
    }
    
    if (filters.statuses.length > 0) {
      filtered = filtered.filter(task => 
        filters.statuses.includes(task.status)
      );
    }
    
    setFilteredTasks(filtered);
  };
  
  // Handle marking a task as complete
  const handleMarkComplete = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: "Completed" } 
          : task
      )
    );
    
    setFilteredTasks(prevFilteredTasks => 
      prevFilteredTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: "Completed" } 
          : task
      )
    );
    
    toast({
      title: "Task completed",
      description: "The task has been marked as completed.",
    });
  };
  
  // Handle opening the assistant sheet
  const handleAssistClick = (task: Task) => {
    setCurrentTask(task);
    setShowAssistantSheet(true);
  };
  
  // Handle showing top priorities
  const handleShowPriorities = () => {
    // Filter to high priority and overdue tasks
    const highPriorityTasks = tasks.filter(
      task => task.priority === "High" || task.status === "Overdue" || task.status === "Due Today"
    );
    setFilteredTasks(highPriorityTasks);
    
    toast({
      title: "Priority tasks",
      description: "Showing your highest priority tasks.",
    });
  };

  // Render group header
  const renderGroupHeader = (groupName: string) => {
    const groupLabels: Record<string, string> = {
      "Overdue": "Overdue Tasks",
      "Due Today": "Due Today",
      "Upcoming": "Upcoming Tasks",
      "Open": "Open Tasks",
      "Scheduled": "Scheduled Tasks",
      "Completed": "Completed Tasks",
    };

    return (
      <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-2 mt-6 first:mt-0">
        {groupLabels[groupName] || groupName} ({groupedTasks[groupName]?.length || 0})
      </h3>
    );
  };

  // Render the priority order for grouped tasks
  const priorityOrder = ["Overdue", "Due Today", "Upcoming", "Open", "Scheduled", "Completed"];

  return (
    <Layout title="Task Planner">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Task Planner</h1>
            <p className="text-muted-foreground">
              Manage all your tasks, deadlines, and upcoming steps across deals.
            </p>
          </div>
          
          <ConnectedApps apps={connectedApps} />
        </div>

        {showBanner && (
          <NitidinaWelcomeBanner 
            userName="Marina"
            overdueCount={overdueCount}
            dueToday={dueTodayCount}
            newTasks={2}
            onShowPriorities={handleShowPriorities}
            onDismiss={() => setShowBanner(false)}
          />
        )}

        <TaskFilterToolbar 
          onFilterChange={handleFilterChange}
          onViewChange={setView}
          currentView={view}
          deals={deals}
        />
        
        {view === "list" ? (
          <Card>
            <CardContent className="p-0">
              {filteredTasks.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No tasks match your filters.</p>
                  <Button 
                    variant="link" 
                    onClick={() => setFilteredTasks(tasks)}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div>
                  {priorityOrder.map(status => (
                    groupedTasks[status] && groupedTasks[status].length > 0 && (
                      <div key={status} className="px-4">
                        {renderGroupHeader(status)}
                        <div className="border rounded-md overflow-hidden mb-4">
                          {groupedTasks[status].map(task => (
                            <TaskItem 
                              key={task.id} 
                              task={task} 
                              onAssistClick={handleAssistClick}
                              onMarkComplete={handleMarkComplete}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t p-4 text-sm text-gray-500">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </CardFooter>
          </Card>
        ) : (
          <CalendarView tasks={filteredTasks} />
        )}

        {/* Nitidina Assistant Sheet */}
        <Sheet open={showAssistantSheet} onOpenChange={setShowAssistantSheet}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <NitidinaAvatar size="sm" />
                <span>Nitidina Assistant</span>
              </SheetTitle>
              <SheetDescription>
                Let me help you with this task
              </SheetDescription>
            </SheetHeader>
            
            {currentTask && (
              <div className="py-6">
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <p className="font-medium text-sm">{currentTask.dealName}</p>
                  <p className="text-sm">{currentTask.description}</p>
                </div>
                
                {currentTask.category === "KYC" && (
                  <>
                    <h4 className="font-medium mb-2">Recommended approach:</h4>
                    <p className="text-sm mb-4">
                      For KYC tasks, I recommend using the KYC-BOT workflow in Coworker. It can automatically:
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-sm">
                      <li>Retrieve counterparty data from our systems</li>
                      <li>Run FinScan checks on all related entities</li>
                      <li>Generate the required AML documentation</li>
                      <li>Flag any potential compliance issues for your review</li>
                    </ul>
                    <p className="text-sm mb-4">
                      This would reduce the manual work significantly and ensure all compliance protocols are followed.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button asChild>
                        <Link to="/coworker">Use KYC-BOT Workflow</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to={`/deals/${currentTask.dealId}`}>Open Deal</Link>
                      </Button>
                    </div>
                  </>
                )}
                
                {currentTask.category !== "KYC" && currentTask.isAutomatable && (
                  <>
                    <h4 className="font-medium mb-2">Recommended approach:</h4>
                    <p className="text-sm mb-4">
                      This task can be automated using the Drawdown-Notice Auto-Builder in Coworker. Would you like me to:
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-sm">
                      <li>Generate the notice based on deal terms</li>
                      <li>Format it according to lender requirements</li>
                      <li>Prepare it for your final review and signature</li>
                    </ul>
                    <div className="flex gap-2 mt-4">
                      <Button asChild>
                        <Link to="/coworker">Auto-Generate Notice</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to={`/deals/${currentTask.dealId}`}>Open Deal</Link>
                      </Button>
                    </div>
                  </>
                )}
                
                {!currentTask.isAutomatable && currentTask.category !== "KYC" && (
                  <>
                    <h4 className="font-medium mb-2">Analysis:</h4>
                    <p className="text-sm mb-4">
                      This task requires manual review, but I can help streamline the process:
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-sm">
                      <li>I've prepared the relevant documents for your review</li>
                      <li>The deadlines have been added to your calendar</li>
                      <li>All stakeholders have been notified of the pending task</li>
                    </ul>
                    <p className="text-sm mb-4">
                      Would you like to review the documents now or schedule this for later today?
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button asChild>
                        <Link to={`/deals/${currentTask.dealId}`}>Review Now</Link>
                      </Button>
                      <Button variant="outline">Schedule For Later</Button>
                    </div>
                  </>
                )}
              </div>
            )}
            
            <SheetFooter className="mt-auto">
              <Button variant="outline" onClick={() => setShowAssistantSheet(false)}>
                Close
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </Layout>
  );
};

export default Planner;
