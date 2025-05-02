
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  AlertTriangle, 
  Check, 
  Search, 
  Clock,
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock KYC data
const mockKycData = [
  {
    id: "kyc-1",
    entityName: "Alpha Corporation",
    entityType: "Borrower",
    status: "approved",
    lastUpdated: "Jan 15, 2025",
    expiryDate: "Jan 15, 2026",
    contact: "Michael Chen",
    riskScore: "Low",
    sanctionsCheck: "Passed",
    amlCheck: "Passed",
    pepCheck: "Passed"
  },
  {
    id: "kyc-2",
    entityName: "Beta Investments",
    entityType: "Guarantor",
    status: "pending",
    lastUpdated: "Apr 22, 2025",
    expiryDate: "-",
    contact: "Sarah Johnson",
    riskScore: "Medium",
    sanctionsCheck: "Pending",
    amlCheck: "Passed",
    pepCheck: "Pending"
  },
  {
    id: "kyc-3",
    entityName: "Delta Financial Services",
    entityType: "Lender",
    status: "approved",
    lastUpdated: "Mar 3, 2025",
    expiryDate: "Mar 3, 2026",
    contact: "David Wilson",
    riskScore: "Low",
    sanctionsCheck: "Passed",
    amlCheck: "Passed",
    pepCheck: "Passed"
  },
  {
    id: "kyc-4",
    entityName: "Gamma Holdings Ltd",
    entityType: "Borrower Subsidiary",
    status: "flagged",
    lastUpdated: "Apr 10, 2025",
    expiryDate: "-",
    contact: "Sophia Martinez",
    riskScore: "High",
    sanctionsCheck: "Flagged",
    amlCheck: "Passed",
    pepCheck: "Flagged"
  },
  {
    id: "kyc-5",
    entityName: "Omega Bank",
    entityType: "Lender",
    status: "expired",
    lastUpdated: "Dec 5, 2024",
    expiryDate: "Apr 1, 2025",
    contact: "James Wilson",
    riskScore: "Low",
    sanctionsCheck: "Passed",
    amlCheck: "Passed",
    pepCheck: "Passed"
  }
];

const KycAmlTab = () => {
  const [expandedEntity, setExpandedEntity] = useState<string | null>(null);
  
  const toggleEntityDetails = (entityId: string) => {
    setExpandedEntity(expandedEntity === entityId ? null : entityId);
  };
  
  // Calculate KYC compliance statistics
  const totalEntities = mockKycData.length;
  const approvedEntities = mockKycData.filter(entity => entity.status === "approved").length;
  const pendingEntities = mockKycData.filter(entity => entity.status === "pending").length;
  const flaggedEntities = mockKycData.filter(entity => entity.status === "flagged").length;
  const expiredEntities = mockKycData.filter(entity => entity.status === "expired").length;
  
  const compliancePercentage = Math.round((approvedEntities / totalEntities) * 100);
  
  // Get status badge
  const getStatusBadge = (status: string) => {
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
      default:
        return null;
    }
  };
  
  // Get check status icon
  const getCheckStatusIcon = (status: string) => {
    switch(status) {
      case "Passed":
        return <Check className="h-4 w-4 text-green-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Flagged":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* KYC Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>KYC Compliance</CardDescription>
            <CardTitle className="text-2xl">
              {compliancePercentage}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={compliancePercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {approvedEntities} of {totalEntities} entities approved
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardDescription>Approved</CardDescription>
              <CardTitle className="text-2xl text-green-500">{approvedEntities}</CardTitle>
            </div>
            <ShieldCheck className="h-6 w-6 text-green-500 opacity-75" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Last approval: Apr 22, 2025
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-2xl text-yellow-500">{pendingEntities}</CardTitle>
            </div>
            <Clock className="h-6 w-6 text-yellow-500 opacity-75" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Oldest pending: Apr 22, 2025
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardDescription>Flagged / Expired</CardDescription>
              <CardTitle className="text-2xl text-red-500">{flaggedEntities + expiredEntities}</CardTitle>
            </div>
            <ShieldAlert className="h-6 w-6 text-red-500 opacity-75" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {flaggedEntities} flagged, {expiredEntities} expired
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* KYC Table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">KYC/AML Status</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Search className="h-4 w-4" />
              Run Screening
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              Refresh All
            </Button>
            <Button size="sm" className="gap-1">
              <ShieldCheck className="h-4 w-4" />
              Update Status
            </Button>
          </div>
        </div>
        
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Entity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockKycData.map((entity) => (
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
                          "bg-red-50 border-red-200 text-red-600"
                        }
                      >
                        {entity.riskScore}
                      </Badge>
                    </TableCell>
                    <TableCell>{entity.lastUpdated}</TableCell>
                    <TableCell>{entity.expiryDate}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleEntityDetails(entity.id)}
                      >
                        {expandedEntity === entity.id ? "Hide" : "Details"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded details row */}
                  {expandedEntity === entity.id && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={7} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Entity Details</h4>
                            <p className="text-sm">Contact: {entity.contact}</p>
                            <p className="text-sm">ID Verification: Complete</p>
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
                          
                          <div className="md:col-span-4 flex gap-2 pt-3">
                            <Button variant="outline" size="sm">View Documents</Button>
                            <Button variant="outline" size="sm">Run Re-screen</Button>
                            <Button size="sm">Update Status</Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default KycAmlTab;
