
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { KycSummaryCards } from "./kyc/KycSummaryCards";
import { KycAlert } from "./kyc/KycAlert";
import { KycTable } from "./kyc/KycTable";
import { KycEntityDetailDialog } from "./kyc/KycEntityDetailDialog";
import { KycFinScanDialog } from "./kyc/KycFinScanDialog";
import { mockKycData, KycEntity } from "./kyc/mockKycData";

const KycAmlTab = () => {
  const { toast } = useToast();
  const [expandedEntity, setExpandedEntity] = useState<string | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<KycEntity | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showFinscanDialog, setShowFinscanDialog] = useState(false);
  const [isRunningScreen, setIsRunningScreen] = useState(false);
  
  const toggleEntityDetails = (entityId: string) => {
    setExpandedEntity(expandedEntity === entityId ? null : entityId);
  };
  
  // Handle sending reminders
  const handleSendReminder = (entity: KycEntity) => {
    toast({
      title: "Reminder Sent",
      description: `Email notification sent to ${entity.contact} requesting KYC information for ${entity.entityName}.`,
    });
  };
  
  // Handle running FinScan
  const handleRunFinScan = (entity: KycEntity) => {
    setSelectedEntity(entity);
    setShowFinscanDialog(true);
    setIsRunningScreen(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRunningScreen(false);
    }, 2000);
  };
  
  // Handle viewing details
  const handleViewDetails = (entity: KycEntity) => {
    setSelectedEntity(entity);
    setShowDetailsDialog(true);
  };
  
  return (
    <div className="space-y-6">
      {/* KYC Summary Cards */}
      <KycSummaryCards />
      
      {/* Status notification */}
      <KycAlert />
      
      {/* KYC Table */}
      <Card>
        <KycTable 
          kycData={mockKycData}
          expandedEntity={expandedEntity}
          toggleEntityDetails={toggleEntityDetails}
          handleSendReminder={handleSendReminder}
          handleRunFinScan={handleRunFinScan}
          handleViewDetails={handleViewDetails}
        />
      </Card>
      
      {/* Dialogs */}
      <KycEntityDetailDialog 
        selectedEntity={selectedEntity}
        showDetailsDialog={showDetailsDialog}
        setShowDetailsDialog={setShowDetailsDialog}
        handleSendReminder={handleSendReminder}
      />
      
      <KycFinScanDialog 
        selectedEntity={selectedEntity}
        showFinscanDialog={showFinscanDialog}
        setShowFinscanDialog={setShowFinscanDialog}
        isRunningScreen={isRunningScreen}
      />
    </div>
  );
};

export default KycAmlTab;
