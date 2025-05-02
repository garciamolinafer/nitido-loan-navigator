
import React from "react";
import { Button } from "@/components/ui/button";
import { User, FileText, Search } from "lucide-react";
import { KycEntity } from "./mockKycData";
import { getCheckStatusIcon, getDocumentStatusIcon } from "./StatusBadges";

interface KycEntityDetailsProps {
  entity: KycEntity;
  handleRunFinScan: (entity: KycEntity) => void;
}

export const KycEntityDetails = ({ entity, handleRunFinScan }: KycEntityDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Entity Details</h4>
        <p className="text-sm">Contact: {entity.contact}</p>
        <p className="text-sm">ID Verification: {entity.status === "approved" ? "Complete" : 
          entity.status === "pending" ? "Partial" :
          entity.status === "not_started" ? "Not Started" : 
          "Requires Review"}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Sanctions Check</h4>
        <div className="flex items-center gap-2">
          {getCheckStatusIcon(entity.sanctionsCheck)}
          <span className="text-sm">{entity.sanctionsCheck}</span>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">AML Check</h4>
        <div className="flex items-center gap-2">
          {getCheckStatusIcon(entity.amlCheck)}
          <span className="text-sm">{entity.amlCheck}</span>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">PEP Check</h4>
        <div className="flex items-center gap-2">
          {getCheckStatusIcon(entity.pepCheck)}
          <span className="text-sm">{entity.pepCheck}</span>
        </div>
      </div>
      
      {/* Document status section */}
      <div className="md:col-span-2">
        <h4 className="text-sm font-medium mb-2">Documents</h4>
        <div className="space-y-1">
          {entity.documents.map((doc, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {getDocumentStatusIcon(doc.status)}
              <span className="text-sm">{doc.name}: {doc.status === "verified" ? "Verified" : doc.status === "pending" ? "Pending Review" : "Not Submitted"}</span>
            </div>
          ))}
        </div>
        
        {/* Show missing information if pending */}
        {entity.status === "pending" && entity.missingInfo && (
          <div className="mt-2">
            <p className="text-sm text-yellow-600">Missing: {entity.missingInfo}</p>
          </div>
        )}
        
        {/* Show flag details if flagged */}
        {entity.status === "flagged" && entity.flagDetails && (
          <div className="mt-2">
            <p className="text-sm text-red-600">{entity.flagDetails}</p>
          </div>
        )}
      </div>
      
      <div className="md:col-span-4 flex gap-2 pt-3">
        <Button variant="outline" size="sm">
          <User className="h-4 w-4 mr-1" />
          View Contact
        </Button>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-1" />
          View Documents
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleRunFinScan(entity)}>
          <Search className="h-4 w-4 mr-1" />
          Run Re-screen
        </Button>
        <Button size="sm">Update Status</Button>
      </div>
    </div>
  );
};
