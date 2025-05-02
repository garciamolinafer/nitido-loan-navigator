
import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  dealId: string;
  dealName: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "not-started" | "in-progress" | "completed";
  type: string;
  assignee: string;
  completed: boolean;
  appIcon?: string;
}

// Sample task data based on the requirements
const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Review Financial Covenant Compliance",
    description: "Check that Q1 financials meet the covenants. One covenant is close to threshold.",
    dealId: "orion-bridge",
    dealName: "Orion Bridge Loan",
    dueDate: "2025-05-05",
    priority: "high",
    status: "in-progress",
    type: "covenant",
    assignee: "marina",
    completed: false,
  },
  {
    id: "task-2",
    title: "Approve Updated Credit Agreement Doc",
    description: "A legal document in IntraLinks needs your approval.",
    dealId: "apex-syndicate",
    dealName: "Apex Syndicate Loan",
    dueDate: "2025-05-06",
    priority: "medium",
    status: "not-started",
    type: "document",
    assignee: "marina",
    completed: false,
  },
  {
    id: "task-3",
    title: "Draft Lender Rate Change Notice",
    description: "Prepare a notice to lenders about an upcoming interest rate adjustment.",
    dealId: "betacorp",
    dealName: "BetaCorp Revolver",
    dueDate: "2025-05-04",
    priority: "high",
    status: "not-started",
    type: "notice",
    assignee: "marina",
    completed: false,
  },
  {
    id: "task-4",
    title: "Send Borrower Collateral Reminder",
    description: "A reminder email to the borrower to submit collateral docs.",
    dealId: "gammaltd",
    dealName: "GammaLtd Credit",
    dueDate: "2025-05-07",
    priority: "low",
    status: "not-started",
    type: "notice",
    assignee: "team",
    completed: false,
  },
  {
    id: "task-5",
    title: "Run KYC Check on New Lender",
    description: "Complete a KYC background check using FinScan before onboarding a new lender.",
    dealId: "epsilon-green",
    dealName: "Epsilon Green Loan",
    dueDate: "2025-05-08",
    priority: "medium",
    status: "not-started",
    type: "compliance",
    assignee: "marina",
    completed: false,
  },
  {
    id: "task-6",
    title: "Submit Drawdown Request Form",
    description: "A drawdown request needs to be prepared and sent via LoanIQ.",
    dealId: "omega-debt",
    dealName: "Omega Debt Facility",
    dueDate: "2025-05-10",
    priority: "medium",
    status: "not-started",
    type: "drawdown",
    assignee: "marina",
    completed: false,
  },
  {
    id: "task-7",
    title: "Process Amendment to Credit Agreement",
    description: "Changes have been made and must be applied.",
    dealId: "delta-mezzanine",
    dealName: "Delta Mezzanine Loan",
    dueDate: "2025-05-09",
    priority: "high",
    status: "not-started",
    type: "document",
    assignee: "marina",
    completed: false,
  },
  {
    id: "task-8",
    title: "File Annual Compliance Certificate",
    description: "File a compliance certificate with regulators.",
    dealId: "zeta-pharma",
    dealName: "Zeta Pharma Loan",
    dueDate: "2025-05-12",
    priority: "high",
    status: "not-started",
    type: "compliance",
    assignee: "marina",
    completed: false,
  },
  {
    id: "task-9",
    title: "Sync Market Rates Data",
    description: "Update the loan's market rate assumptions via Versana.",
    dealId: "theta-mortgage",
    dealName: "Theta Mortgage",
    dueDate: "2025-05-15",
    priority: "low",
    status: "not-started",
    type: "market",
    assignee: "team",
    completed: false,
  },
  {
    id: "task-10",
    title: "Review Interest Payment Schedule",
    description: "Verify next interest payment amount and due date.",
    dealId: "sigma-construction",
    dealName: "Sigma Construction Loan",
    dueDate: "2025-05-14",
    priority: "medium",
    status: "not-started",
    type: "drawdown",
    assignee: "marina",
    completed: false,
  }
];

interface TaskFilters {
  deal: string;
  taskType: string;
  assignee: string;
  search: string;
}

export function useTasks(initialFilters: TaskFilters) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks);

  // Apply filters to tasks
  const filterTasks = (filters: TaskFilters) => {
    let result = [...tasks];
    
    // Filter by deal
    if (filters.deal && filters.deal !== 'all') {
      result = result.filter(task => task.dealId === filters.deal);
    }
    
    // Filter by task type
    if (filters.taskType && filters.taskType !== 'all') {
      result = result.filter(task => task.type === filters.taskType);
    }
    
    // Filter by assignee
    if (filters.assignee) {
      if (filters.assignee === 'my-tasks') {
        result = result.filter(task => task.assignee === 'marina');
      } else if (filters.assignee === 'team-tasks') {
        result = result.filter(task => task.assignee === 'team');
      }
      // 'all-tasks' doesn't need filtering
    }
    
    // Filter by search term
    if (filters.search) {
      const searchTermLower = filters.search.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTermLower) || 
        task.dealName.toLowerCase().includes(searchTermLower) ||
        task.description.toLowerCase().includes(searchTermLower)
      );
    }
    
    setFilteredTasks(result);
  };

  // Toggle task completion status
  const toggleTaskStatus = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };

  // Apply filters whenever tasks or filters change
  useEffect(() => {
    filterTasks(initialFilters);
  }, [tasks, initialFilters]);

  return {
    tasks,
    filteredTasks,
    filterTasks,
    toggleTaskStatus
  };
}
