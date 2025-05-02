
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, AlertTriangle, AlertCircle } from "lucide-react";
import { KycStatus, CheckStatus, DocumentStatus } from "./mockKycData";

export const getStatusBadge = (status: KycStatus) => {
  switch(status) {
    case "approved":
      return (
        <Badge variant="outline" className="text-green-500 border-green-200 flex items-center gap-1">
          <Check className="h-3 w-3" />
          Approved
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="text-yellow-500 border-yellow-200 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      );
    case "flagged":
      return (
        <Badge variant="outline" className="text-red-500 border-red-200 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Flagged
        </Badge>
      );
    case "expired":
      return (
        <Badge variant="outline" className="text-gray-500 border-gray-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Expired
        </Badge>
      );
    case "not_started":
      return (
        <Badge variant="outline" className="text-gray-500 border-gray-200 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Not Started
        </Badge>
      );
    default:
      return null;
  }
};

export const getCheckStatusIcon = (status: CheckStatus) => {
  switch(status) {
    case "Passed":
      return <Check className="h-4 w-4 text-green-500" />;
    case "Pending":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "Flagged":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case "Not Started":
      return <Clock className="h-4 w-4 text-gray-500" />;
    default:
      return null;
  }
};

export const getDocumentStatusIcon = (status: DocumentStatus) => {
  switch(status) {
    case "verified":
      return <Check className="h-4 w-4 text-green-500" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "not_submitted":
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
    default:
      return null;
  }
};
