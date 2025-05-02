
import { useState } from "react";
import { useCoworker } from "@/hooks/useCoworker";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play, Edit } from "lucide-react";

export function CoworkerWorkflowBuilder() {
  const { 
    workflows, 
    templates, 
    selectedWorkflowId, 
    selectedTemplateId,
    runWorkflow,
    createWorkflowFromTemplate
  } = useCoworker();
  
  const [dealName, setDealName] = useState("");
  const [workflowName, setWorkflowName] = useState("");
  
  const selectedWorkflow = selectedWorkflowId 
    ? workflows.find(w => w.id === selectedWorkflowId) 
    : null;
  
  const selectedTemplate = selectedTemplateId 
    ? templates.find(t => t.id === selectedTemplateId) 
    : null;

  const handleRunWorkflow = () => {
    if (selectedWorkflowId) {
      runWorkflow(selectedWorkflowId);
    }
  };
  
  const handleCreateFromTemplate = () => {
    if (selectedTemplateId && workflowName && dealName) {
      createWorkflowFromTemplate(selectedTemplateId, workflowName, dealName);
      setWorkflowName("");
      setDealName("");
    }
  };
  
  // If no workflow or template is selected, show empty state
  if (!selectedWorkflow && !selectedTemplate) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create a Workflow</CardTitle>
            <CardDescription>
              Select a template from the sidebar or start a conversation with Agentic
              to create a new workflow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 items-center py-8">
              <p className="text-sm text-muted-foreground text-center">
                Choose a template from the sidebar to get started, or ask Agentic
                for recommendations based on your needs.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If a workflow is selected, show workflow details
  if (selectedWorkflow) {
    return (
      <Card className="m-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{selectedWorkflow.name}</CardTitle>
              <CardDescription>
                {selectedWorkflow.deal} • {selectedWorkflow.category}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit size={16} className="mr-1" /> Edit
              </Button>
              <Button size="sm" onClick={handleRunWorkflow}>
                <Play size={16} className="mr-1" /> Run
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">
              {selectedWorkflow.description}
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Schedule</h3>
            <p className="text-sm text-muted-foreground">
              {selectedWorkflow.schedule || "No schedule set - manual execution only"}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Workflow Steps</h3>
            <div className="space-y-3">
              {selectedWorkflow.steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`p-3 border rounded-lg relative ${
                    step.status === "completed" ? "bg-green-50 border-green-200" :
                    step.status === "waiting" ? "bg-amber-50 border-amber-200" :
                    step.status === "error" ? "bg-red-50 border-red-200" :
                    "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">
                        {index + 1}. {step.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {step.requiresApproval && (
                        <Badge variant="outline" className="text-xs">
                          Requires Approval
                        </Badge>
                      )}
                      <Badge 
                        variant={
                          step.status === "completed" ? "success" :
                          step.status === "waiting" ? "warning" :
                          step.status === "error" ? "destructive" :
                          "outline"
                        }
                        className="text-xs"
                      >
                        {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Badge variant="outline" className="text-xs">
                      System: {step.system}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If a template is selected, show template details with form to create workflow
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>{selectedTemplate?.name}</CardTitle>
        <CardDescription>
          {selectedTemplate?.category} template
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Description</h3>
          <p className="text-sm text-muted-foreground">
            {selectedTemplate?.description}
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Integrated Systems</h3>
          <div className="flex flex-wrap gap-1">
            {selectedTemplate?.systems.map(system => (
              <Badge key={system} variant="outline">
                {system}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="workflow-name">Workflow Name</Label>
            <Input 
              id="workflow-name" 
              placeholder="Enter a name for this workflow"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
            />
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="deal-name">Deal</Label>
            <Select onValueChange={setDealName}>
              <SelectTrigger>
                <SelectValue placeholder="Select a deal" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Active Deals</SelectLabel>
                  <SelectItem value="Apollo Energy">Apollo Energy</SelectItem>
                  <SelectItem value="Project Titan">Project Titan</SelectItem>
                  <SelectItem value="BrightFuture Solar">BrightFuture Solar</SelectItem>
                  <SelectItem value="Phoenix Automotive">Phoenix Automotive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleCreateFromTemplate}
          disabled={!workflowName || !dealName}
        >
          Create Workflow
        </Button>
      </CardFooter>
    </Card>
  );
}
