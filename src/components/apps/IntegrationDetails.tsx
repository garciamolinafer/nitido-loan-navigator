
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, X } from "lucide-react";
import { Integration } from "@/types/integration";

interface IntegrationDetailsProps {
  integration: Integration;
  onClose: () => void;
}

export function IntegrationDetails({ integration, onClose }: IntegrationDetailsProps) {
  // In a real app, these would come from the API
  const activityLogs = integration.activityLogs || [
    { 
      id: "1", 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), 
      type: "sync", 
      message: "Data sync completed successfully", 
      records: 124 
    },
    { 
      id: "2", 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), 
      type: "error", 
      message: "API authentication failed", 
      records: 0 
    },
    { 
      id: "3", 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), 
      type: "sync", 
      message: "Initial data import", 
      records: 312 
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "sync": return "text-green-600 bg-green-100";
      case "error": return "text-red-600 bg-red-100";
      case "warning": return "text-amber-600 bg-amber-100";
      default: return "text-blue-600 bg-blue-100";
    }
  };

  return (
    <Card className="border-t-0 rounded-t-none border-primary shadow-lg">
      <CardHeader className="px-4 py-3 border-b flex flex-row justify-between items-center">
        <CardTitle className="text-base">Activity Log</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 p-0">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b bg-muted/20">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-muted-foreground">Last 30 days</p>
              <p className="font-medium">
                {activityLogs.filter(log => log.type === "sync").length} syncs, {activityLogs.filter(log => log.type === "error").length} errors
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Records processed</p>
              <p className="font-medium">{activityLogs.reduce((sum, log) => sum + (log.records || 0), 0)} records</p>
            </div>
          </div>
        </div>

        <div className="max-h-80 overflow-auto">
          <table className="w-full">
            <thead className="bg-muted/30 sticky top-0 text-xs">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Details</th>
                <th className="px-4 py-2 text-right font-medium text-muted-foreground">Records</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {activityLogs.map(log => (
                <tr key={log.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3">{formatDate(log.timestamp)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full ${getActivityTypeColor(log.type)}`}>
                      {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">{log.message}</td>
                  <td className="px-4 py-3 text-right">{log.records !== undefined ? log.records : '-'}</td>
                </tr>
              ))}
              {activityLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                    No activity logs available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t">
          <Button variant="outline" size="sm" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            View Full Logs
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
