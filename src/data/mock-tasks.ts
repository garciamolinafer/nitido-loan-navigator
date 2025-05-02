
import { Task } from "@/components/planner/TaskItem";

// Helper function to create dates relative to today
const createDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

export const mockTasks: Task[] = [
  {
    id: "task-1",
    dealId: "alphaco-001",
    dealName: "AlphaCo Term Loan – $50M",
    description: "Review Covenant Compliance – Check the borrower's latest financial ratios in LoanIQ; prepare covenant report.",
    dueDate: createDate(-1), // Yesterday
    status: "Overdue",
    priority: "High",
    category: "Compliance",
  },
  {
    id: "task-2",
    dealId: "betaind-002",
    dealName: "BetaInd $30M Revolver",
    description: "Borrower Interest Reminder – Send email reminder to the borrower that May's interest payment is due next week.",
    dueDate: createDate(3),
    status: "Upcoming",
    priority: "Medium",
    category: "Communications",
  },
  {
    id: "task-3",
    dealId: "gammadev-003",
    dealName: "GammaDev $25M Construction Loan",
    description: "Validate Lender Commitments – Cross-check each lender's capital commitment booking in LoanIQ against syndication docs.",
    dueDate: createDate(0), // Today
    status: "Due Today", 
    priority: "High",
    category: "LoanIQ",
  },
  {
    id: "task-4",
    dealId: "deltareal-004",
    dealName: "DeltaReal $40M Real Estate Loan",
    description: "Document Review – Review and approve the signed mortgage agreement in the IntraLinks VDR.",
    dueDate: createDate(5),
    status: "Open",
    priority: "Medium",
    category: "Document",
  },
  {
    id: "task-5",
    dealId: "epsilontech-005",
    dealName: "EpsilonTech $60M Syndicated Loan",
    description: "Lender Notification – Issue updated interest rate notice to all participating lenders (log via the Comms module).",
    dueDate: createDate(2),
    status: "Open",
    priority: "Low",
    category: "Communications",
  },
  {
    id: "task-6",
    dealId: "zetabio-006",
    dealName: "ZetaBio $80M Facility B",
    description: "Covenant Follow-Up – Prepare the quarterly financial covenant certification form and send it to the borrower for completion.",
    dueDate: createDate(4),
    status: "Open",
    priority: "Medium",
    category: "Compliance",
  },
  {
    id: "task-7",
    dealId: "etaservices-007",
    dealName: "EtaServices $20M Acquisition Loan",
    description: "KYC Check – Perform AML/KYC screening for the new lender KappaBank using FinScan; flag any issues.",
    dueDate: createDate(0), // Today
    status: "Due Today",
    priority: "High",
    category: "KYC",
    isAutomatable: true,
  },
  {
    id: "task-8",
    dealId: "thetaenergy-008",
    dealName: "ThetaEnergy $100M Facility",
    description: "Finalize Amendment – Upload the signed amendment document to IntraLinks, then route to legal for final sign-off.",
    dueDate: createDate(7),
    status: "Open",
    priority: "Medium",
    category: "Document",
  },
  {
    id: "task-9",
    dealId: "iotaretail-009",
    dealName: "IotaRetail $15M Term Loan",
    description: "Automated Drawdown Notice – Generate and send the next drawdown notice via the Drawdown-Notice Auto-Builder workflow.",
    dueDate: createDate(1),
    status: "Scheduled",
    priority: "Medium",
    category: "Other",
    isAutomatable: true,
  },
  {
    id: "task-10",
    dealId: "lambdahosp-010",
    dealName: "LambdaHosp $45M Syndicated Loan",
    description: "Compliance Certificate – Prepare the compliance certificate for lenders.",
    dueDate: createDate(30), // Due in 30 days
    status: "Open",
    priority: "Low",
    category: "Compliance",
  },
  {
    id: "task-11",
    dealId: "musolar-011",
    dealName: "MuSolar $55M Solar Project Loan",
    description: "Loan Setup Validation – Verify in LoanIQ that the loan parameters match the signed agreement.",
    dueDate: createDate(-2), // 2 days ago
    status: "Overdue",
    priority: "High",
    category: "LoanIQ",
  },
  {
    id: "task-12",
    dealId: "nusigma-012",
    dealName: "NuSigma $35M Revolver",
    description: "Versana Data Sync – Sync latest market data from the Versana syndicated-loan database and update deal analytics.",
    dueDate: createDate(2),
    status: "Open",
    priority: "Low",
    category: "Versana",
  },
  {
    id: "task-13",
    dealId: "eland-001",
    dealName: "Project Eland Windfarm",
    description: "KYC delay resolution – Contact legal department to resolve outstanding KYC issues with new investor.",
    dueDate: createDate(-3), // 3 days ago
    status: "Overdue",
    priority: "High",
    category: "KYC",
    isAutomatable: true,
  }
];

// Get unique deals from tasks
export const getDealsFromTasks = () => {
  const uniqueDeals = new Map();
  mockTasks.forEach(task => {
    uniqueDeals.set(task.dealId, { id: task.dealId, name: task.dealName });
  });
  return Array.from(uniqueDeals.values());
};

// Mock connected apps
export const connectedApps = [
  { name: "LoanIQ", logoSrc: "/lovable-uploads/loaniq-icon.svg", status: "connected" as const },
  { name: "FinScan", logoSrc: "/lovable-uploads/finscan-icon.svg", status: "connected" as const },
  { name: "IntraLinks", logoSrc: "/lovable-uploads/intralinks-icon.svg", status: "connected" as const },
  { name: "Versana", logoSrc: "/lovable-uploads/versana-icon.svg", status: "syncing" as const },
  { name: "Outlook", logoSrc: "/lovable-uploads/outlook-icon.svg", status: "connected" as const }
];
