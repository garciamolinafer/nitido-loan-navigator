
import { createContext, useContext, ReactNode } from "react";
import { 
  Workflow, 
  WorkflowTemplate, 
  WorkflowRun, 
  ApprovalItem, 
  AgenticMessage 
} from "@/types/workflow";

export interface CoworkerContextType {
  workflows: Workflow[];
  workflowRuns: WorkflowRun[];
  templates: WorkflowTemplate[];
  approvals: ApprovalItem[];
  selectedWorkflowId: string | null;
  selectedTemplateId: string | null;
  selectedRunId: string | null;
  agenticMessages: AgenticMessage[];
  setSelectedWorkflowId: (id: string | null) => void;
  setSelectedTemplateId: (id: string | null) => void;
  setSelectedRunId: (id: string | null) => void;
  addAgenticMessage: (message: AgenticMessage) => void;
  approveWorkflowStep: (approvalId: string) => void;
  rejectWorkflowStep: (approvalId: string) => void;
  createWorkflowFromTemplate: (templateId: string, name: string, deal: string) => void;
  runWorkflow: (workflowId: string) => void;
}

export const CoworkerContext = createContext<CoworkerContextType | undefined>(undefined);

export const useCoworker = () => {
  const context = useContext(CoworkerContext);
  if (context === undefined) {
    throw new Error('useCoworker must be used within a CoworkerProvider');
  }
  return context;
};
