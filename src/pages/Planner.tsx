
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskFilterToolbar } from "@/components/planner/TaskFilterToolbar";
import { ConnectedApps } from "@/components/planner/ConnectedApps";
import { ListView } from "@/components/planner/ListView";
import { CalendarView } from "@/components/planner/CalendarView";
import { useTasks } from "@/hooks/useTasks";

const Planner = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"list" | "calendar">("list");
  const [filters, setFilters] = useState({
    deal: "all",
    taskType: "all",
    assignee: "my-tasks",
    search: "",
  });

  const { tasks, filteredTasks, filterTasks, toggleTaskStatus } = useTasks(filters);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => {
      const updatedFilters = { ...prev, ...newFilters };
      filterTasks(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <Layout title="Task Planner">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold">Task Planner</h1>
            <p className="text-muted-foreground">
              Manage tasks, deadlines, and actions across all your deals.
            </p>
          </div>

          <Button 
            variant="outline"
            className="gap-2"
            onClick={() => navigate("/deals")}
          >
            Back to Deals
          </Button>
        </div>

        <ConnectedApps />

        <div className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <TaskFilterToolbar filters={filters} onFilterChange={handleFilterChange} />
            
            <Tabs value={view} onValueChange={(v) => setView(v as "list" | "calendar")} className="w-full md:w-auto">
              <TabsList className="grid w-full md:w-[200px] grid-cols-2">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span>List View</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Calendar View</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {view === "list" ? (
            <ListView tasks={filteredTasks} onToggleStatus={toggleTaskStatus} />
          ) : (
            <CalendarView tasks={filteredTasks} onToggleStatus={toggleTaskStatus} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Planner;
