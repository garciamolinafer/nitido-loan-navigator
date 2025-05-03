
import { 
  Workflow, 
  WorkflowRun, 
  AgenticMessage 
} from "@/types/workflow";

// Create a new run based on the approval
export const createRunFromApproval = (
  approval: { 
    workflowName: string; 
    deal: string;
  }
): WorkflowRun => {
  return {
    id: `run-${Date.now()}`,
    workflowId: "workflow1", // This would be the real workflow ID in a real app
    name: approval.workflowName,
    status: "success",
    executionDate: new Date().toISOString(),
    deal: approval.deal,
    steps: [
      {
        id: "step1",
        name: "Retrieve payment data",
        system: "loaniq",
        description: "Get payment details from LoanIQ",
        status: "completed"
      },
      {
        id: "step2",
        name: "Draft email",
        system: "agentic",
        description: "Compose reminder email",
        status: "completed"
      },
      {
        id: "step3",
        name: "Send email",
        system: "outlook",
        description: "Send email to all lenders",
        status: "completed",
        requiresApproval: true
      }
    ],
    summary: `Successfully sent reminder email to ${approval.deal} lenders`
  };
};

// Create workflow from template
export const generateWorkflowFromTemplate = (
  templateId: string, 
  name: string, 
  deal: string,
  template: { 
    description: string; 
    category: string; 
    steps: Partial<import("@/types/workflow").WorkflowStep>[] 
  } | undefined
): Workflow | null => {
  if (!template) return null;
  
  return {
    id: `workflow-${Date.now()}`,
    name,
    description: template.description,
    category: template.category,
    deal,
    requiresApproval: true,
    active: true,
    steps: template.steps.map((step, index) => ({
      id: `step-${index}-${Date.now()}`,
      name: step.name || '',
      system: step.system || 'agentic',
      description: step.description || '',
      status: 'pending',
      requiresApproval: step.requiresApproval
    })) as import("@/types/workflow").WorkflowStep[]
  };
};

// Generate run from workflow
export const generateRunFromWorkflow = (workflow: Workflow): WorkflowRun => {
  return {
    id: `run-${Date.now()}`,
    workflowId: workflow.id,
    name: workflow.name,
    status: "success",
    executionDate: new Date().toISOString(),
    deal: workflow.deal,
    steps: workflow.steps.map(step => ({...step, status: "completed"})),
    summary: `Successfully completed ${workflow.name} for ${workflow.deal}`
  };
};

export const getCompletedMessage = (workflow: Workflow): AgenticMessage => {
  return {
    role: "assistant", 
    content: `The "${workflow.name}" workflow has completed successfully!`
  };
};

export const getRunningMessage = (workflow: Workflow): AgenticMessage => {
  return {
    role: "assistant", 
    content: `I'm running the "${workflow.name}" workflow for ${workflow.deal}. I'll keep you updated on the progress.`
  };
};

export const getApprovalMessage = (): AgenticMessage => {
  return {
    role: "assistant", 
    content: `The workflow requires your approval to continue. Please check the Approvals panel.`
  };
};

export const getTemplateCreationMessage = (name: string, deal: string, templateName: string): AgenticMessage => {
  return {
    role: "assistant", 
    content: `I've created a new workflow called "${name}" for ${deal} based on the ${templateName} template. You can now customize it or run it.`
  };
};
