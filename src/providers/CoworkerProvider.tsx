
import { useState, ReactNode } from "react";
import { CoworkerContext } from "@/context/CoworkerContext";
import { 
  Workflow, 
  WorkflowRun, 
  ApprovalItem, 
  AgenticMessage,
  WorkflowTemplate
} from "@/types/workflow";
import { mockWorkflows, mockTemplates } from "@/data/mock-workflows";
import { 
  createRunFromApproval,
  generateWorkflowFromTemplate,
  generateRunFromWorkflow,
  getCompletedMessage,
  getRunningMessage,
  getApprovalMessage,
  getTemplateCreationMessage
} from "@/utils/workflowOperations";

interface CoworkerProviderProps {
  children: ReactNode;
}

export const CoworkerProvider = ({ children }: CoworkerProviderProps) => {
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
  const [agenticMessages, setAgenticMessages] = useState<AgenticMessage[]>([
    {role: "assistant", content: "Hello Marina, I'm Nítido Coworker. How can I help you automate your workflows today? You can ask me to create a new workflow, run an existing one, or help you monitor your tasks."}
  ]);

  const addAgenticMessage = (message: AgenticMessage) => {
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
      const newRun = createRunFromApproval(approval);
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
    const newWorkflow = generateWorkflowFromTemplate(templateId, name, deal, template);
    
    if (newWorkflow) {
      setWorkflows(prev => [...prev, newWorkflow]);
      setSelectedWorkflowId(newWorkflow.id);
      
      if (template) {
        addAgenticMessage(getTemplateCreationMessage(name, deal, template.name));
      }
    }
  };

  const runWorkflow = (workflowId: string) => {
    const workflow = workflows.find(w => w.id === workflowId);
    if (!workflow) return;
    
    addAgenticMessage(getRunningMessage(workflow));
    
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
      addAgenticMessage(getApprovalMessage());
    } else {
      // If no approval is needed, complete the workflow
      const newRun = generateRunFromWorkflow(workflow);
      setWorkflowRuns(prev => [newRun, ...prev]);
      addAgenticMessage(getCompletedMessage(workflow));
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
