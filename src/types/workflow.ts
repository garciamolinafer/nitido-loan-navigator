
export type WorkflowStatus = "success" | "failed" | "pending" | "running";

export interface WorkflowStep {
  id: string;
  name: string;
  system: "loaniq" | "finscan" | "intralinks" | "outlook" | "versana" | "word" | "agentic";
  description: string;
  status: "completed" | "pending" | "error" | "waiting" | "running";
  requiresApproval?: boolean;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  name: string;
  status: WorkflowStatus;
  executionDate: string;
  deal: string;
  steps: WorkflowStep[];
  summary: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  systems: string[];
  defaultDeal?: string;
  steps: Partial<WorkflowStep>[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  deal: string;
  schedule?: string;
  requiresApproval: boolean;
  active: boolean;
  lastRun?: string;
  steps: WorkflowStep[];
}

export interface ApprovalItem {
  id: string;
  workflowRunId: string;
  workflowName: string;
  deal: string;
  stepId: string;
  stepName: string;
  description: string;
  createdAt: string;
}

export interface AgenticMessage {
  role: "user" | "assistant";
  content: string;
}
