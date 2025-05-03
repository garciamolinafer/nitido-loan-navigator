import { createContext, useContext, useState, ReactNode } from "react";
import { mockWorkflows, mockTemplates } from "@/data/mock-workflows";

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

interface CoworkerContextType {
  workflows: Workflow[];
  workflowRuns: WorkflowRun[];
  templates: WorkflowTemplate[];
  approvals: ApprovalItem[];
  selectedWorkflowId: string | null;
  selectedTemplateId: string | null;
  selectedRunId: string | null;
  agenticMessages: {role: "user" | "assistant", content: string}[];
  setSelectedWorkflowId: (id: string | null) => void;
  setSelectedTemplateId: (id: string | null) => void;
  setSelectedRunId: (id: string | null) => void;
  addAgenticMessage: (message: {role: "user" | "assistant", content: string}) => void;
  approveWorkflowStep: (approvalId: string) => void;
  rejectWorkflowStep: (approvalId: string) => void;
  createWorkflowFromTemplate: (templateId: string, name: string, deal: string) => void;
  runWorkflow: (workflowId: string) => void;
}

const CoworkerContext = createContext<CoworkerContextType | undefined>(undefined);

export const CoworkerProvider = ({ children }: { children: ReactNode }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [workflowRuns, setWorkflowRuns] = useState<WorkflowRun[]>([]);
  const [templates, setTemplates] = useState<WorkflowTemplate[]>(mockTemplates);
  const [approvals, setApprovals] = useState<ApprovalItem[]>([
    {
      id: "approval1",
      workflowRunId: "run1",
      workflowName: "Apollo Interest Reminder",
      deal: "Apollo Energy",
      stepId: "step3",
      stepName: "Send email to lenders",
      description: "Send reminder email to Apollo Energy lenders about upcoming interest payment due on 08/15/25",
      createdAt: new Date().toISOString(),
    },
    {
      id: "approval2",
      workflowRunId: "run2",
      workflowName: "Project Titan Covenant Certificate",
      deal: "Project Titan",
      stepId: "step4",
      stepName: "Generate compliance certificate",
      description: "Generate and distribute Q2 covenant compliance certificate for Project Titan",
      createdAt: new Date().toISOString(),
    }
  ]);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [agenticMessages, setAgenticMessages] = useState<{role: "user" | "assistant", content: string}[]>([
    {role: "assistant", content: "Hello Marina, I'm Nítido Coworker. How can I help you automate your workflows today? You can ask me to create a new workflow, run an existing one, or help you monitor your tasks."}
  ]);

  const addAgenticMessage = (message: {role: "user" | "assistant", content: string}) => {
    setAgenticMessages(prev => [...prev, message]);
  };

  const approveWorkflowStep = (approvalId: string) => {
    // In a real app, this would trigger the workflow to continue
    setApprovals(prev => prev.filter(a => a.id !== approvalId));
    
    // Add a message from Nítido Coworker acknowledging the approval
    addAgenticMessage({
      role: "assistant", 
      content: `Thank you for approving this step. I'll continue with the workflow execution.`
    });

    // Mock adding a successful run
    const approval = approvals.find(a => a.id === approvalId);
    if (approval) {
      const newRun: WorkflowRun = {
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
      
      setWorkflowRuns(prev => [newRun, ...prev]);
    }
  };

  const rejectWorkflowStep = (approvalId: string) => {
    setApprovals(prev => prev.filter(a => a.id !== approvalId));
    addAgenticMessage({
      role: "assistant", 
      content: "I've cancelled that workflow step. Is there something you'd like me to modify?"
    });
  };

  const createWorkflowFromTemplate = (templateId: string, name: string, deal: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    
    // Create a new workflow from the template
    const newWorkflow: Workflow = {
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
      })) as WorkflowStep[]
    };
    
    setWorkflows(prev => [...prev, newWorkflow]);
    setSelectedWorkflowId(newWorkflow.id);
    addAgenticMessage({
      role: "assistant", 
      content: `I've created a new workflow called "${name}" for ${deal} based on the ${template.name} template. You can now customize it or run it.`
    });
  };

  const runWorkflow = (workflowId: string) => {
    const workflow = workflows.find(w => w.id === workflowId);
    if (!workflow) return;
    
    addAgenticMessage({
      role: "assistant", 
      content: `I'm running the "${workflow.name}" workflow for ${workflow.deal}. I'll keep you updated on the progress.`
    });
    
    // Find approval steps
    const approvalStep = workflow.steps.find(step => step.requiresApproval);
    
    if (approvalStep) {
      // If there's an approval step, create an approval item
      const newApproval: ApprovalItem = {
        id: `approval-${Date.now()}`,
        workflowRunId: `run-${Date.now()}`,
        workflowName: workflow.name,
        deal: workflow.deal,
        stepId: approvalStep.id,
        stepName: approvalStep.name,
        description: `Approve ${approvalStep.name.toLowerCase()} for ${workflow.deal}`,
        createdAt: new Date().toISOString()
      };
      
      setApprovals(prev => [...prev, newApproval]);
      
      addAgenticMessage({
        role: "assistant", 
        content: `The workflow requires your approval to continue. Please check the Approvals panel.`
      });
    } else {
      // If no approval is needed, complete the workflow
      const newRun: WorkflowRun = {
        id: `run-${Date.now()}`,
        workflowId,
        name: workflow.name,
        status: "success",
        executionDate: new Date().toISOString(),
        deal: workflow.deal,
        steps: workflow.steps.map(step => ({...step, status: "completed"})),
        summary: `Successfully completed ${workflow.name} for ${workflow.deal}`
      };
      
      setWorkflowRuns(prev => [newRun, ...prev]);
      
      addAgenticMessage({
        role: "assistant", 
        content: `The "${workflow.name}" workflow has completed successfully!`
      });
    }
  };

  return (
    <CoworkerContext.Provider value={{
      workflows,
      workflowRuns,
      templates,
      approvals,
      selectedWorkflowId,
      selectedTemplateId,
      selectedRunId,
      agenticMessages,
      setSelectedWorkflowId,
      setSelectedTemplateId,
      setSelectedRunId,
      addAgenticMessage,
      approveWorkflowStep,
      rejectWorkflowStep,
      createWorkflowFromTemplate,
      runWorkflow
    }}>
      {children}
    </CoworkerContext.Provider>
  );
};

export const useCoworker = () => {
  const context = useContext(CoworkerContext);
  if (context === undefined) {
    throw new Error('useCoworker must be used within a CoworkerProvider');
  }
  return context;
};
