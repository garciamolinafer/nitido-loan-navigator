
import { useCoworker } from "@/hooks/useCoworker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

export function CoworkerDashboard() {
  const { workflows, workflowRuns, approvals } = useCoworker();
  
  const activeWorkflows = workflows.filter(w => w.active).length;
  const successfulRuns = workflowRuns.filter(r => r.status === "success").length;
  const failedRuns = workflowRuns.filter(r => r.status === "failed").length;
  const pendingApprovals = approvals.length;
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Workflows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{activeWorkflows}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Successful Runs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{successfulRuns}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Failed Runs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
              <div className="text-2xl font-bold">{failedRuns}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">{pendingApprovals}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow History</CardTitle>
            </CardHeader>
            <CardContent>
              {workflowRuns.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">
                  No workflow runs yet. Run a workflow to see its execution history.
                </p>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 bg-muted p-3 text-sm font-medium">
                    <div>Workflow</div>
                    <div>Deal</div>
                    <div>Date</div>
                    <div>Status</div>
                  </div>
                  <div className="divide-y">
                    {workflowRuns.map((run) => (
                      <div key={run.id} className="grid grid-cols-4 p-3 text-sm">
                        <div className="font-medium">{run.name}</div>
                        <div>{run.deal}</div>
                        <div>{new Date(run.executionDate).toLocaleString()}</div>
                        <div>
                          <Badge
                            variant={
                              run.status === "success" ? "success" :
                              run.status === "failed" ? "destructive" : 
                              "outline"
                            }
                          >
                            {run.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approvals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              {approvals.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">
                  No approvals pending.
                </p>
              ) : (
                <div className="space-y-4">
                  {approvals.map((approval) => (
                    <Card key={approval.id}>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">{approval.workflowName}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="flex flex-col">
                          <div className="text-sm text-muted-foreground mb-1">
                            <strong>Deal:</strong> {approval.deal}
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">
                            <strong>Step:</strong> {approval.stepName}
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">
                            <strong>Description:</strong> {approval.description}
                          </div>
                          <div className="flex justify-end gap-2 mt-2">
                            <Badge className="cursor-pointer hover:bg-red-600" variant="destructive">
                              Reject
                            </Badge>
                            <Badge className="cursor-pointer hover:bg-green-600" variant="success">
                              Approve
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
