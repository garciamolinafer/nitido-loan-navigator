
import { useCoworker } from "@/hooks/useCoworker";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Library, Clock, CheckSquare } from "lucide-react";

export function CoworkerSidebar() {
  const { 
    workflows, 
    templates, 
    approvals,
    selectedWorkflowId, 
    selectedTemplateId,
    setSelectedWorkflowId,
    setSelectedTemplateId,
    addAgenticMessage
  } = useCoworker();
  
  const handleNewWorkflow = () => {
    setSelectedWorkflowId(null);
    setSelectedTemplateId(null);
    addAgenticMessage({
      role: "assistant", 
      content: "Let's create a new workflow. Would you like to start from scratch or use a template?"
    });
  };
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setSelectedWorkflowId(null);
    
    const template = templates.find(t => t.id === templateId);
    if (template) {
      addAgenticMessage({
        role: "assistant", 
        content: `I've selected the "${template.name}" template. This template helps you ${template.description.toLowerCase()}. Would you like to customize it for a specific deal?`
      });
    }
  };
  
  const handleSelectWorkflow = (workflowId: string) => {
    setSelectedWorkflowId(workflowId);
    setSelectedTemplateId(null);
    
    const workflow = workflows.find(w => w.id === workflowId);
    if (workflow) {
      addAgenticMessage({
        role: "assistant", 
        content: `I've loaded the "${workflow.name}" workflow for ${workflow.deal}. Would you like to run it, edit it, or view its history?`
      });
    }
  };

  return (
    <div className="w-64 border-r bg-muted/20 h-full flex flex-col">
      <div className="p-4">
        <Button 
          onClick={handleNewWorkflow}
          className="w-full flex items-center gap-2"
        >
          <Plus size={16} />
          New Workflow
        </Button>
      </div>
      
      <Separator />
      
      <ScrollArea className="flex-1">
        {/* My Workflows Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} />
            <h3 className="font-medium">My Workflows</h3>
          </div>
          <div className="space-y-1">
            {workflows.map(workflow => (
              <Button 
                key={workflow.id}
                variant={selectedWorkflowId === workflow.id ? "secondary" : "ghost"}
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => handleSelectWorkflow(workflow.id)}
              >
                <div className="truncate">
                  <div className="font-medium text-sm truncate">{workflow.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{workflow.deal}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
        
        <Separator className="my-2" />
        
        {/* Templates Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Library size={16} />
            <h3 className="font-medium">Templates</h3>
          </div>
          <div className="space-y-1">
            {templates.map(template => (
              <Button 
                key={template.id}
                variant={selectedTemplateId === template.id ? "secondary" : "ghost"}
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => handleSelectTemplate(template.id)}
              >
                <div className="truncate">
                  <div className="font-medium text-sm truncate">{template.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{template.category}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
        
        <Separator className="my-2" />
        
        {/* Approvals Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare size={16} />
            <h3 className="font-medium">Approvals</h3>
            {approvals.length > 0 && (
              <span className="bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {approvals.length}
              </span>
            )}
          </div>
          <div className="space-y-1">
            {approvals.length === 0 ? (
              <p className="text-xs text-muted-foreground">No pending approvals</p>
            ) : (
              approvals.map(approval => (
                <Button 
                  key={approval.id}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-2"
                >
                  <div className="truncate">
                    <div className="font-medium text-sm truncate">{approval.workflowName}</div>
                    <div className="text-xs text-muted-foreground truncate">{approval.stepName}</div>
                  </div>
                </Button>
              ))
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
