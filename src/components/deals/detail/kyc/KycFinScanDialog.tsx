
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { KycEntity } from "./mockKycData";

interface KycFinScanDialogProps {
  selectedEntity: KycEntity | null;
  showFinscanDialog: boolean;
  setShowFinscanDialog: (show: boolean) => void;
  isRunningScreen: boolean;
}

export const KycFinScanDialog = ({
  selectedEntity,
  showFinscanDialog,
  setShowFinscanDialog,
  isRunningScreen
}: KycFinScanDialogProps) => {
  if (!selectedEntity) {
    return null;
  }
  
  return (
    <Dialog open={showFinscanDialog} onOpenChange={setShowFinscanDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>FinScan Screening</DialogTitle>
          <DialogDescription>
            {isRunningScreen ? 
              "Running compliance screening..." : 
              `Screening results for ${selectedEntity.entityName}`}
          </DialogDescription>
        </DialogHeader>
        
        {isRunningScreen ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-sm text-muted-foreground">
              Checking sanctions lists, PEP databases, and adverse media...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium">Screening Summary</h4>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-sm text-muted-foreground">Sanctions</p>
                  <p className={`font-medium ${selectedEntity.sanctionsCheck === "Flagged" ? "text-red-500" : "text-green-500"}`}>
                    {selectedEntity.sanctionsCheck || "No Matches"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">PEP</p>
                  <p className={`font-medium ${selectedEntity.pepCheck === "Flagged" ? "text-red-500" : "text-green-500"}`}>
                    {selectedEntity.pepCheck || "No Matches"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Risk Score</p>
                  <p className={`font-medium ${
                    selectedEntity.riskScore === "High" ? "text-red-500" : 
                    selectedEntity.riskScore === "Medium" ? "text-yellow-500" : 
                    "text-green-500"
                  }`}>
                    {selectedEntity.riskScore || "Low"}
                  </p>
                </div>
              </div>
            </div>
            
            {selectedEntity.status === "flagged" && selectedEntity.flagDetails && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-md">
                <h4 className="font-medium text-red-800">Alert Details</h4>
                <p className="text-sm text-red-700 mt-2">{selectedEntity.flagDetails}</p>
              </div>
            )}
            
            <div>
              <h4 className="font-medium mb-2">Recommended Actions</h4>
              <ul className="text-sm space-y-1">
                {selectedEntity.status === "flagged" && (
                  <>
                    <li>• Conduct enhanced due diligence</li>
                    <li>• Escalate to compliance team for review</li>
                    <li>• Document risk assessment decision</li>
                  </>
                )}
                {selectedEntity.status === "pending" && (
                  <>
                    <li>• Request missing documentation</li>
                    <li>• Follow up with entity contact</li>
                  </>
                )}
                {selectedEntity.status === "approved" && (
                  <li>• No further action required at this time</li>
                )}
                {selectedEntity.status === "not_started" && (
                  <li>• Initiate KYC process and request documentation</li>
                )}
              </ul>
            </div>
          </div>
        )}
        
        <DialogFooter>
          {!isRunningScreen && (
            <>
              <Button variant="outline" onClick={() => setShowFinscanDialog(false)}>Close</Button>
              <Button>Export Report</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
