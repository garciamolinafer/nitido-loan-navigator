
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Planner = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Task Planner">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Task Planner</h1>
            <p className="text-muted-foreground">
              Manage tasks, deadlines, and upcoming steps for all deals.
            </p>
          </div>

          <Button 
            className="gap-2"
            variant="outline"
            onClick={() => navigate("/deals")}
          >
            <Calendar className="h-4 w-4" />
            Back to Deals
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
          <h2 className="text-xl font-medium mb-2">Global Task Planner</h2>
          <p className="text-muted-foreground mb-4">
            This page will show tasks from all deals in a unified task view.
          </p>
          <Button onClick={() => navigate("/deals")}>
            View Deals Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Planner;
