
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, FileText } from "lucide-react";
import { KycEntity } from "./mockKycData";
import { getStatusBadge, getCheckStatusIcon, getDocumentStatusIcon } from "./StatusBadges";

interface KycEntityDetailDialogProps {
  selectedEntity: KycEntity | null;
  showDetailsDialog: boolean;
  setShowDetailsDialog: (show: boolean) => void;
  handleSendReminder: (entity: KycEntity) => void;
}

export const KycEntityDetailDialog = ({
  selectedEntity,
  showDetailsDialog,
  setShowDetailsDialog,
  handleSendReminder
}: KycEntityDetailDialogProps) => {
  if (!selectedEntity) {
    return null;
  }
  
  return (
    <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>KYC Details: {selectedEntity.entityName}</DialogTitle>
          <DialogDescription>
            Full compliance information and documentation status
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Entity Type</h3>
              <p>{selectedEntity.entityType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
              <div>{getStatusBadge(selectedEntity.status)}</div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Risk Score</h3>
              <Badge 
                variant="outline" 
                className={
                  selectedEntity.riskScore === "Low" ? "bg-green-50 border-green-200 text-green-600" :
                  selectedEntity.riskScore === "Medium" ? "bg-yellow-50 border-yellow-200 text-yellow-600" :
                  selectedEntity.riskScore === "High" ? "bg-red-50 border-red-200 text-red-600" :
                  "bg-gray-50 border-gray-200 text-gray-600"
                }
              >
                {selectedEntity.riskScore}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h3>
              <p>{selectedEntity.lastUpdated}</p>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-md space-y-4">
            <div>
              <h3 className="font-medium">Verification Checks</h3>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="flex items-center gap-2">
                  {getCheckStatusIcon(selectedEntity.sanctionsCheck)}
                  <div>
                    <p className="text-sm font-medium">Sanctions</p>
                    <p className="text-xs text-muted-foreground">{selectedEntity.sanctionsCheck}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getCheckStatusIcon(selectedEntity.amlCheck)}
                  <div>
                    <p className="text-sm font-medium">AML</p>
                    <p className="text-xs text-muted-foreground">{selectedEntity.amlCheck}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getCheckStatusIcon(selectedEntity.pepCheck)}
                  <div>
                    <p className="text-sm font-medium">PEP</p>
                    <p className="text-xs text-muted-foreground">{selectedEntity.pepCheck}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium">Documents</h3>
              <div className="space-y-2 mt-2">
                {selectedEntity.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-background p-2 rounded">
                    <div className="flex items-center gap-2">
                      {getDocumentStatusIcon(doc.status)}
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <Badge variant="outline">
                      {doc.status === "verified" ? "Verified" : 
                       doc.status === "pending" ? "Pending" : "Not Submitted"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedEntity.status === "flagged" && selectedEntity.flagDetails && (
              <div className="bg-red-50 border border-red-100 p-3 rounded">
                <h3 className="font-medium text-red-800">Alert Information</h3>
                <p className="text-sm text-red-700 mt-1">{selectedEntity.flagDetails}</p>
              </div>
            )}
            
            {selectedEntity.status === "pending" && selectedEntity.missingInfo && (
              <div className="bg-yellow-50 border border-yellow-100 p-3 rounded">
                <h3 className="font-medium text-yellow-800">Missing Information</h3>
                <p className="text-sm text-yellow-700 mt-1">{selectedEntity.missingInfo}</p>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>Close</Button>
          {selectedEntity.status === "pending" && (
            <Button onClick={() => {
              handleSendReminder(selectedEntity);
              setShowDetailsDialog(false);
            }}>
              <Mail className="h-4 w-4 mr-2" />
              Send Reminder
            </Button>
          )}
          {selectedEntity.status === "not_started" && (
            <Button onClick={() => {
              handleSendReminder(selectedEntity);
              setShowDetailsDialog(false);
            }}>
              <Mail className="h-4 w-4 mr-2" />
              Request KYC
            </Button>
          )}
          {selectedEntity.status === "flagged" && (
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Complete Review
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
