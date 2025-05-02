
import { StatCard } from "./StatCard";
import { Briefcase, CheckSquare, MessageSquare, AlertTriangle } from "lucide-react";

export function StatGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <StatCard
        title="Active Deals"
        count={10}
        icon={Briefcase}
        linkTo="/deals"
      />
      <StatCard
        title="Open Tasks" 
        count={5}
        icon={CheckSquare}
        linkTo="/planner"
        variant="warning"
      />
      <StatCard
        title="Unread Messages"
        count={3}
        icon={MessageSquare}
        linkTo="/communications"
      />
      <StatCard
        title="Overdue Covenants"
        count={2}
        icon={AlertTriangle}
        linkTo="/deals"
        variant="danger"
      />
    </div>
  );
}
