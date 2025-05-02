
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  AlertTriangle, 
  Check, 
  Search, 
  Clock,
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
  AlertCircle,
  Mail,
  FileText,
  User
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

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
    pepCheck: "Passed",
    documents: [
      { name: "Certificate of Incorporation", status: "verified" },
      { name: "Beneficial Ownership Declaration", status: "verified" },
      { name: "Board Resolution", status: "verified" }
    ]
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
    pepCheck: "Pending",
    documents: [
      { name: "Certificate of Incorporation", status: "verified" },
      { name: "Beneficial Ownership Declaration", status: "pending" },
      { name: "Board Resolution", status: "not_submitted" }
    ],
    missingInfo: "Beneficial ownership information and board resolution"
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
    pepCheck: "Passed",
    documents: [
      { name: "Certificate of Incorporation", status: "verified" },
      { name: "Beneficial Ownership Declaration", status: "verified" },
      { name: "Board Resolution", status: "verified" }
    ]
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
    pepCheck: "Flagged",
    documents: [
      { name: "Certificate of Incorporation", status: "verified" },
      { name: "Beneficial Ownership Declaration", status: "verified" },
      { name: "Board Resolution", status: "verified" }
    ],
    flagDetails: "PEP Match: Two board members are former government officials. Enhanced due diligence required. FinScan Score: 87 (High)."
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
    pepCheck: "Passed",
    documents: [
      { name: "Certificate of Incorporation", status: "verified" },
      { name: "Beneficial Ownership Declaration", status: "verified" },
      { name: "Board Resolution", status: "verified" }
    ]
  },
  {
    id: "kyc-6",
    entityName: "EFG Bank",
    entityType: "Lender",
    status: "pending",
    lastUpdated: "Apr 20, 2025",
    expiryDate: "-",
    contact: "Carol Smith",
    riskScore: "Medium",
    sanctionsCheck: "Passed",
    amlCheck: "Passed",
    pepCheck: "Pending",
    documents: [
      { name: "Certificate of Incorporation", status: "verified" },
      { name: "Beneficial Ownership Declaration", status: "pending" },
      { name: "Board Resolution", status: "verified" }
    ],
    missingInfo: "Beneficial ownership information"
  },
  {
    id: "kyc-7",
    entityName: "HK Finance",
    entityType: "Lender",
    status: "flagged",
    lastUpdated: "Apr 18, 2025",
    expiryDate: "-",
    contact: "Daniel Wu",
    riskScore: "High",
    sanctionsCheck: "Flagged",
    amlCheck: "Passed",
    pepCheck: "Flagged",
    documents: [
      { name: "Certificate of Incorporation", status: "verified" },
      { name: "Beneficial Ownership Declaration", status: "verified" },
      { name: "Board Resolution", status: "verified" }
    ],
    flagDetails: "PEP Match: Individual shareholder is a former minister. FinScan Score: 85 (High). Additional due diligence required."
  },
  {
    id: "kyc-8",
    entityName: "Zeta Investments",
    entityType: "Lender",
    status: "not_started",
    lastUpdated: "-",
    expiryDate: "-",
    contact: "Emma Kumar",
    riskScore: "-",
    sanctionsCheck: "Not Started",
    amlCheck: "Not Started",
    pepCheck: "Not Started",
    documents: [
      { name: "Certificate of Incorporation", status: "not_submitted" },
      { name: "Beneficial Ownership Declaration", status: "not_submitted" },
      { name: "Board Resolution", status: "not_submitted" }
    ]
  }
];

const KycAmlTab = () => {
  const { toast } = useToast();
  const [expandedEntity, setExpandedEntity] = useState<string | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<typeof mockKycData[0] | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showFinscanDialog, setShowFinscanDialog] = useState(false);
  const [isRunningScreen, setIsRunningScreen] = useState(false);
  
  const toggleEntityDetails = (entityId: string) => {
    setExpandedEntity(expandedEntity === entityId ? null : entityId);
  };
  
  // Calculate KYC compliance statistics
  const totalEntities = mockKycData.length;
  const approvedEntities = mockKycData.filter(entity => entity.status === "approved").length;
  const pendingEntities = mockKycData.filter(entity => entity.status === "pending").length;
  const flaggedEntities = mockKycData.filter(entity => entity.status === "flagged").length;
  const expiredEntities = mockKycData.filter(entity => entity.status === "expired").length;
  const notStartedEntities = mockKycData.filter(entity => entity.status === "not_started").length;
  
  const compliancePercentage = Math.round((approvedEntities / totalEntities) * 100);
  
  // Handle sending reminders
  const handleSendReminder = (entity: typeof mockKycData[0]) => {
    toast({
      title: "Reminder Sent",
      description: `Email notification sent to ${entity.contact} requesting KYC information for ${entity.entityName}.`,
    });
  };
  
  // Handle running FinScan
  const handleRunFinScan = (entity: typeof mockKycData[0]) => {
    setSelectedEntity(entity);
    setShowFinscanDialog(true);
    setIsRunningScreen(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRunningScreen(false);
    }, 2000);
  };
  
  // Handle viewing details
  const handleViewDetails = (entity: typeof mockKycData[0]) => {
    setSelectedEntity(entity);
    setShowDetailsDialog(true);
  };
  
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
  
  // Get check status icon
  const getCheckStatusIcon = (status: string) => {
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

  // Get document status icon
  const getDocumentStatusIcon = (status: string) => {
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
              <CardDescription>Pending / Not Started</CardDescription>
              <CardTitle className="text-2xl text-yellow-500">{pendingEntities + notStartedEntities}</CardTitle>
            </div>
            <Clock className="h-6 w-6 text-yellow-500 opacity-75" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {pendingEntities} pending, {notStartedEntities} not started
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

      {/* Nitidina-style notification */}
      {(flaggedEntities > 0 || pendingEntities > 0) && (
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
      )}
      
      {/* KYC Table */}
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
                <TableHead className="text-right">Actions</TableHead>
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
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      
      {/* FinScan dialog */}
      <Dialog open={showFinscanDialog} onOpenChange={setShowFinscanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>FinScan Screening</DialogTitle>
            <DialogDescription>
              {isRunningScreen ? 
                "Running compliance screening..." : 
                `Screening results for ${selectedEntity?.entityName}`}
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
                    <p className={`font-medium ${selectedEntity?.sanctionsCheck === "Flagged" ? "text-red-500" : "text-green-500"}`}>
                      {selectedEntity?.sanctionsCheck || "No Matches"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">PEP</p>
                    <p className={`font-medium ${selectedEntity?.pepCheck === "Flagged" ? "text-red-500" : "text-green-500"}`}>
                      {selectedEntity?.pepCheck || "No Matches"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Score</p>
                    <p className={`font-medium ${
                      selectedEntity?.riskScore === "High" ? "text-red-500" : 
                      selectedEntity?.riskScore === "Medium" ? "text-yellow-500" : 
                      "text-green-500"
                    }`}>
                      {selectedEntity?.riskScore || "Low"}
                    </p>
                  </div>
                </div>
              </div>
              
              {selectedEntity?.status === "flagged" && selectedEntity?.flagDetails && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-md">
                  <h4 className="font-medium text-red-800">Alert Details</h4>
                  <p className="text-sm text-red-700 mt-2">{selectedEntity.flagDetails}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-2">Recommended Actions</h4>
                <ul className="text-sm space-y-1">
                  {selectedEntity?.status === "flagged" && (
                    <>
                      <li>• Conduct enhanced due diligence</li>
                      <li>• Escalate to compliance team for review</li>
                      <li>• Document risk assessment decision</li>
                    </>
                  )}
                  {selectedEntity?.status === "pending" && (
                    <>
                      <li>• Request missing documentation</li>
                      <li>• Follow up with entity contact</li>
                    </>
                  )}
                  {selectedEntity?.status === "approved" && (
                    <li>• No further action required at this time</li>
                  )}
                  {selectedEntity?.status === "not_started" && (
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
      
      {/* Details dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>KYC Details: {selectedEntity?.entityName}</DialogTitle>
            <DialogDescription>
              Full compliance information and documentation status
            </DialogDescription>
          </DialogHeader>
          
          {selectedEntity && (
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
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>Close</Button>
            {selectedEntity?.status === "pending" && (
              <Button onClick={() => {
                handleSendReminder(selectedEntity);
                setShowDetailsDialog(false);
              }}>
                <Mail className="h-4 w-4 mr-2" />
                Send Reminder
              </Button>
            )}
            {selectedEntity?.status === "not_started" && (
              <Button onClick={() => {
                handleSendReminder(selectedEntity);
                setShowDetailsDialog(false);
              }}>
                <Mail className="h-4 w-4 mr-2" />
                Request KYC
              </Button>
            )}
            {selectedEntity?.status === "flagged" && (
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Complete Review
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KycAmlTab;
