
import React from "react";
import { AlertCircle } from "lucide-react";
import { mockKycData } from "./mockKycData";

export const KycAlert = () => {
  const flaggedEntities = mockKycData.filter(entity => entity.status === "flagged").length;
  const pendingEntities = mockKycData.filter(entity => entity.status === "pending").length;
  const notStartedEntities = mockKycData.filter(entity => entity.status === "not_started").length;
  
  if (flaggedEntities === 0 && pendingEntities === 0 && notStartedEntities === 0) {
    return null;
  }
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start gap-3">
      <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
        <AlertCircle className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <h4 className="font-medium text-blue-900">KYC Status Update</h4>
        <p className="text-sm text-blue-700 mt-1">
          {flaggedEntities > 0 ? 
            `${flaggedEntities} ${flaggedEntities === 1 ? 'entity has' : 'entities have'} been flagged and requires enhanced due diligence. ` : ''}
          {pendingEntities > 0 ? 
            `${pendingEntities} ${pendingEntities === 1 ? 'entity is' : 'entities are'} pending additional information. ` : ''}
          {notStartedEntities > 0 ? 
            `${notStartedEntities} ${notStartedEntities === 1 ? 'entity has' : 'entities have'} not started KYC. ` : ''}
          Please review and take appropriate action.
        </p>
      </div>
    </div>
  );
};
