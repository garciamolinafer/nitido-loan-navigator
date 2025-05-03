
// Re-export the provider and hook for backward compatibility
export { CoworkerProvider } from "@/providers/CoworkerProvider";
export { useCoworker } from "@/context/CoworkerContext";
export type { 
  WorkflowStatus,
  WorkflowStep,
  WorkflowRun,
  WorkflowTemplate,
  Workflow,
  ApprovalItem
} from "@/types/workflow";
