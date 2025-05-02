
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, RefreshCw, ShieldCheck, Mail, FileText } from "lucide-react";
import { KycEntity } from "./mockKycData";
import { getStatusBadge } from "./StatusBadges";
import { KycEntityDetails } from "./KycEntityDetails";

interface KycTableProps {
  kycData: KycEntity[];
  expandedEntity: string | null;
  toggleEntityDetails: (entityId: string) => void;
  handleSendReminder: (entity: KycEntity) => void;
  handleRunFinScan: (entity: KycEntity) => void;
  handleViewDetails: (entity: KycEntity) => void;
}

export const KycTable = ({
  kycData,
  expandedEntity,
  toggleEntityDetails,
  handleSendReminder,
  handleRunFinScan,
  handleViewDetails
}: KycTableProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium">KYC/AML Status</h2>
          <p className="text-sm text-muted-foreground">Sanctions and PEP screening powered by FinScan</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Search className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh All
          </Button>
          <Button size="sm" className="gap-1">
            <ShieldCheck className="h-4 w-4" />
            Batch Screen
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Entity</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kycData.map((entity) => (
            <React.Fragment key={entity.id}>
              <TableRow>
                <TableCell className="font-medium">
                  {entity.entityName}
                </TableCell>
                <TableCell>{entity.entityType}</TableCell>
                <TableCell>{getStatusBadge(entity.status)}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      entity.riskScore === "Low" ? "bg-green-50 border-green-200 text-green-600" :
                      entity.riskScore === "Medium" ? "bg-yellow-50 border-yellow-200 text-yellow-600" :
                      entity.riskScore === "High" ? "bg-red-50 border-red-200 text-red-600" :
                      "bg-gray-50 border-gray-200 text-gray-600"
                    }
                  >
                    {entity.riskScore}
                  </Badge>
                </TableCell>
                <TableCell>{entity.lastUpdated}</TableCell>
                <TableCell>{entity.expiryDate}</TableCell>
                <TableCell className="text-right space-x-1">
                  {entity.status === "pending" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSendReminder(entity)}
                      title="Send reminder"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Remind</span>
                    </Button>
                  )}
                  
                  {entity.status === "not_started" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSendReminder(entity)}
                      title="Request KYC"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Request</span>
                    </Button>
                  )}
                  
                  {entity.status === "flagged" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(entity)}
                      title="View flag details"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Report</span>
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRunFinScan(entity)}
                    title="Run screening"
                  >
                    <Search className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:ml-2">Screen</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleEntityDetails(entity.id)}
                    title="Toggle details"
                  >
                    {expandedEntity === entity.id ? "Hide" : "Details"}
                  </Button>
                </TableCell>
              </TableRow>
              
              {/* Expanded details row */}
              {expandedEntity === entity.id && (
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={7} className="p-4">
                    <KycEntityDetails entity={entity} handleRunFinScan={handleRunFinScan} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
