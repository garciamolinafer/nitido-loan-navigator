import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  CircleHelp,
  BookOpen,
  Search,
  SlidersHorizontal,
  Stars,
  Eye
} from "lucide-react";
import { DocumentTreeNode, DocumentMetadata, DocumentSearchFilters, CATEGORY_COLORS } from "@/types/documents";
import { FolderTree } from "./documents/FolderTree";
import { DocumentInfo } from "./documents/DocumentInfo";
import { DocumentAssistant } from "./documents/DocumentAssistant";
import { ContractsAIExtractor } from "./documents/ContractsAIExtractor";
import { DocumentSearch } from "./documents/DocumentSearch";

// Mock data structure with sample documents
const mockFolderStructure: DocumentTreeNode[] = [
  {
    id: "01-transaction-agreements",
    name: "01. Transaction Agreements",
    type: "folder",
    children: [
      {
        id: "signing-20240315",
        name: "2024-03-15 Signing",
        type: "folder",
        children: [
          {
            id: "credit-agreement-signing",
            name: "Credit Agreement.pdf",
            type: "document",
            metadata: {
              id: "doc-001",
              name: "Credit Agreement",
              fileName: "Credit Agreement.pdf",
              fileType: "pdf",
              category: "loan_agreement",
              uploadDate: "2024-03-15",
              uploaderId: "user-001",
              uploaderName: "John Smith",
              size: "2.4 MB",
              tags: ["signing", "credit agreement", "final"],
              status: "active",
              lastModified: "2024-03-15",
              version: 1,
              path: ["01. Transaction Agreements", "2024-03-15 Signing"]
            }
          },
          {
            id: "security-agreement-signing",
            name: "Security Agreement.pdf",
            type: "document",
            metadata: {
              id: "doc-001b",
              name: "Security Agreement",
              fileName: "Security Agreement.pdf",
              fileType: "pdf",
              category: "securities",
              uploadDate: "2024-03-15",
              uploaderId: "user-001",
              uploaderName: "John Smith",
              size: "1.8 MB",
              tags: ["signing", "security agreement", "final"],
              status: "active",
              lastModified: "2024-03-15",
              version: 1,
              path: ["01. Transaction Agreements", "2024-03-15 Signing"]
            }
          },
          {
            id: "fee-letter-signing",
            name: "Fee Letter.pdf",
            type: "document",
            metadata: {
              id: "doc-001c",
              name: "Fee Letter",
              fileName: "Fee Letter.pdf",
              fileType: "pdf",
              category: "other_agreements",
              uploadDate: "2024-03-15",
              uploaderId: "user-001",
              uploaderName: "John Smith",
              size: "0.5 MB",
              tags: ["signing", "fee letter", "final"],
              status: "active",
              lastModified: "2024-03-15",
              version: 1,
              path: ["01. Transaction Agreements", "2024-03-15 Signing"]
            }
          }
        ]
      },
      {
        id: "closing-20240401",
        name: "2024-04-01 Closing",
        type: "folder",
        children: [
          {
            id: "closing-certificate",
            name: "Closing Certificate.pdf",
            type: "document",
            metadata: {
              id: "doc-002",
              name: "Closing Certificate",
              fileName: "Closing Certificate.pdf",
              fileType: "pdf",
              category: "legal",
              uploadDate: "2024-04-01",
              uploaderId: "user-002",
              uploaderName: "Sarah Johnson",
              size: "1.2 MB",
              tags: ["closing", "certificate"],
              status: "active",
              lastModified: "2024-04-01",
              version: 1,
              path: ["01. Transaction Agreements", "2024-04-01 Closing"]
            }
          },
          {
            id: "funds-flow",
            name: "Funds Flow.xlsx",
            type: "document",
            metadata: {
              id: "doc-002b",
              name: "Funds Flow",
              fileName: "Funds Flow.xlsx",
              fileType: "xlsx",
              category: "financials",
              uploadDate: "2024-04-01",
              uploaderId: "user-002",
              uploaderName: "Sarah Johnson",
              size: "0.8 MB",
              tags: ["closing", "funds flow"],
              status: "active",
              lastModified: "2024-04-01",
              version: 1,
              path: ["01. Transaction Agreements", "2024-04-01 Closing"]
            }
          },
          {
            id: "closing-checklist",
            name: "Closing Checklist.xlsx",
            type: "document",
            metadata: {
              id: "doc-002c",
              name: "Closing Checklist",
              fileName: "Closing Checklist.xlsx",
              fileType: "xlsx",
              category: "others",
              uploadDate: "2024-04-01",
              uploaderId: "user-002",
              uploaderName: "Sarah Johnson",
              size: "0.5 MB",
              tags: ["closing", "checklist"],
              status: "active",
              lastModified: "2024-04-01",
              version: 1,
              path: ["01. Transaction Agreements", "2024-04-01 Closing"]
            }
          }
        ]
      }
    ]
  },
  {
    id: "02-supporting-reports",
    name: "02. Supporting Reports",
    type: "folder",
    children: [
      {
        id: "legal-opinion",
        name: "Legal Opinion",
        type: "folder",
        children: [
          {
            id: "signing-20240315",
            name: "2024-03-15 Signing",
            type: "folder",
            children: [
              {
                id: "legal-opinion-doc",
                name: "Legal Opinion.pdf",
                type: "document",
                metadata: {
                  id: "doc-003",
                  name: "Legal Opinion",
                  fileName: "Legal Opinion.pdf",
                  fileType: "pdf",
                  category: "legal",
                  uploadDate: "2024-03-15",
                  uploaderId: "user-003",
                  uploaderName: "Michael Lee",
                  size: "3.1 MB",
                  tags: ["legal opinion", "signing"],
                  status: "active",
                  lastModified: "2024-03-15",
                  version: 1,
                  path: ["02. Supporting Reports", "Legal Opinion", "2024-03-15 Signing"]
                }
              },
              {
                id: "legal-memo",
                name: "Legal Memorandum.pdf",
                type: "document",
                metadata: {
                  id: "doc-003b",
                  name: "Legal Memorandum",
                  fileName: "Legal Memorandum.pdf",
                  fileType: "pdf",
                  category: "legal",
                  uploadDate: "2024-03-15",
                  uploaderId: "user-003",
                  uploaderName: "Michael Lee",
                  size: "2.5 MB",
                  tags: ["legal memo", "signing"],
                  status: "active",
                  lastModified: "2024-03-15",
                  version: 1,
                  path: ["02. Supporting Reports", "Legal Opinion", "2024-03-15 Signing"]
                }
              }
            ]
          }
        ]
      },
      {
        id: "technical-report",
        name: "Technical Report",
        type: "folder",
        children: [
          {
            id: "signing-20240315",
            name: "2024-03-15 Signing",
            type: "folder",
            children: [
              {
                id: "technical-assessment",
                name: "Technical Assessment Report.pdf",
                type: "document",
                metadata: {
                  id: "doc-004",
                  name: "Technical Assessment Report",
                  fileName: "Technical Assessment Report.pdf",
                  fileType: "pdf",
                  category: "technical",
                  uploadDate: "2024-03-15",
                  uploaderId: "user-004",
                  uploaderName: "Emma Wilson",
                  size: "5.2 MB",
                  tags: ["technical", "assessment"],
                  status: "active",
                  lastModified: "2024-03-15",
                  version: 1,
                  path: ["02. Supporting Reports", "Technical Report", "2024-03-15 Signing"]
                }
              },
              {
                id: "technical-appendix",
                name: "Technical Appendices.xlsx",
                type: "document",
                metadata: {
                  id: "doc-004b",
                  name: "Technical Appendices",
                  fileName: "Technical Appendices.xlsx",
                  fileType: "xlsx",
                  category: "technical",
                  uploadDate: "2024-03-15",
                  uploaderId: "user-004",
                  uploaderName: "Emma Wilson",
                  size: "3.8 MB",
                  tags: ["technical", "appendices"],
                  status: "active",
                  lastModified: "2024-03-15",
                  version: 1,
                  path: ["02. Supporting Reports", "Technical Report", "2024-03-15 Signing"]
                }
              },
              {
                id: "site-photos",
                name: "Site Photos.pdf",
                type: "document",
                metadata: {
                  id: "doc-004c",
                  name: "Site Photos",
                  fileName: "Site Photos.pdf",
                  fileType: "pdf",
                  category: "technical",
                  uploadDate: "2024-03-15",
                  uploaderId: "user-004",
                  uploaderName: "Emma Wilson",
                  size: "8.5 MB",
                  tags: ["technical", "photos"],
                  status: "active",
                  lastModified: "2024-03-15",
                  version: 1,
                  path: ["02. Supporting Reports", "Technical Report", "2024-03-15 Signing"]
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "03-covenants-monitoring",
    name: "03. Covenants & Monitoring",
    type: "folder",
    children: [
      {
        id: "audited-financials",
        name: "Audited Financial Statements",
        type: "folder",
        children: [
          {
            id: "2024",
            name: "2024",
            type: "folder",
            children: [
              {
                id: "annual-report-2024",
                name: "Annual Report 2024.pdf",
                type: "document",
                metadata: {
                  id: "doc-005",
                  name: "Annual Report 2024",
                  fileName: "Annual Report 2024.pdf",
                  fileType: "pdf",
                  category: "financials",
                  uploadDate: "2024-12-31",
                  uploaderId: "user-005",
                  uploaderName: "David Brown",
                  size: "8.4 MB",
                  tags: ["annual report", "audited"],
                  status: "active",
                  lastModified: "2024-12-31",
                  version: 1,
                  path: ["03. Covenants & Monitoring", "Audited Financial Statements", "2024"]
                }
              },
              {
                id: "audit-opinion-2024",
                name: "Audit Opinion 2024.pdf",
                type: "document",
                metadata: {
                  id: "doc-005b",
                  name: "Audit Opinion 2024",
                  fileName: "Audit Opinion 2024.pdf",
                  fileType: "pdf",
                  category: "financials",
                  uploadDate: "2024-12-31",
                  uploaderId: "user-005",
                  uploaderName: "David Brown",
                  size: "1.2 MB",
                  tags: ["audit opinion", "audited"],
                  status: "active",
                  lastModified: "2024-12-31",
                  version: 1,
                  path: ["03. Covenants & Monitoring", "Audited Financial Statements", "2024"]
                }
              },
              {
                id: "financial-statements-2024",
                name: "Financial Statements 2024.xlsx",
                type: "document",
                metadata: {
                  id: "doc-005c",
                  name: "Financial Statements 2024",
                  fileName: "Financial Statements 2024.xlsx",
                  fileType: "xlsx",
                  category: "financials",
                  uploadDate: "2024-12-31",
                  uploaderId: "user-005",
                  uploaderName: "David Brown",
                  size: "2.8 MB",
                  tags: ["financial statements", "audited"],
                  status: "active",
                  lastModified: "2024-12-31",
                  version: 1,
                  path: ["03. Covenants & Monitoring", "Audited Financial Statements", "2024"]
                }
              }
            ]
          }
        ]
      },
      {
        id: "quarterly-reports",
        name: "Quarterly Financial Report",
        type: "folder",
        children: [
          {
            id: "2024",
            name: "2024",
            type: "folder",
            children: [
              {
                id: "q1",
                name: "Q1",
                type: "folder",
                children: [
                  {
                    id: "q1-report",
                    name: "Q1 2024 Financial Report.xlsx",
                    type: "document",
                    metadata: {
                      id: "doc-006",
                      name: "Q1 2024 Financial Report",
                      fileName: "Q1 2024 Financial Report.xlsx",
                      fileType: "xlsx",
                      category: "financials",
                      uploadDate: "2024-04-30",
                      uploaderId: "user-005",
                      uploaderName: "David Brown",
                      size: "1.2 MB",
                      tags: ["quarterly", "Q1"],
                      status: "active",
                      lastModified: "2024-04-30",
                      version: 1,
                      path: ["03. Covenants & Monitoring", "Quarterly Financial Report", "2024", "Q1"]
                    }
                  },
                  {
                    id: "q1-compliance-cert",
                    name: "Q1 2024 Compliance Certificate.pdf",
                    type: "document",
                    metadata: {
                      id: "doc-006b",
                      name: "Q1 2024 Compliance Certificate",
                      fileName: "Q1 2024 Compliance Certificate.pdf",
                      fileType: "pdf",
                      category: "financials",
                      uploadDate: "2024-04-30",
                      uploaderId: "user-005",
                      uploaderName: "David Brown",
                      size: "0.8 MB",
                      tags: ["quarterly", "Q1", "compliance"],
                      status: "active",
                      lastModified: "2024-04-30",
                      version: 1,
                      path: ["03. Covenants & Monitoring", "Quarterly Financial Report", "2024", "Q1"]
                    }
                  },
                  {
                    id: "q1-covenant-calc",
                    name: "Q1 2024 Covenant Calculations.xlsx",
                    type: "document",
                    metadata: {
                      id: "doc-006c",
                      name: "Q1 2024 Covenant Calculations",
                      fileName: "Q1 2024 Covenant Calculations.xlsx",
                      fileType: "xlsx",
                      category: "financials",
                      uploadDate: "2024-04-30",
                      uploaderId: "user-005",
                      uploaderName: "David Brown",
                      size: "0.5 MB",
                      tags: ["quarterly", "Q1", "covenants"],
                      status: "active",
                      lastModified: "2024-04-30",
                      version: 1,
                      path: ["03. Covenants & Monitoring", "Quarterly Financial Report", "2024", "Q1"]
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "04-bookkeeping-trading",
    name: "04. Bookkeeping & Trading",
    type: "folder",
    children: [
      {
        id: "2024",
        name: "2024",
        type: "folder",
        children: [
          {
            id: "trading-report-q1",
            name: "Q1 2024 Trading Report.xlsx",
            type: "document",
            metadata: {
              id: "doc-007",
              name: "Q1 2024 Trading Report",
              fileName: "Q1 2024 Trading Report.xlsx",
              fileType: "xlsx",
              category: "financials",
              uploadDate: "2024-04-15",
              uploaderId: "user-009",
              uploaderName: "James Wilson",
              size: "1.5 MB",
              tags: ["trading", "Q1"],
              status: "active",
              lastModified: "2024-04-15",
              version: 1,
              path: ["04. Bookkeeping & Trading", "2024"]
            }
          },
          {
            id: "trading-positions-q1",
            name: "Q1 2024 Trading Positions.xlsx",
            type: "document",
            metadata: {
              id: "doc-007b",
              name: "Q1 2024 Trading Positions",
              fileName: "Q1 2024 Trading Positions.xlsx",
              fileType: "xlsx",
              category: "financials",
              uploadDate: "2024-04-15",
              uploaderId: "user-009",
              uploaderName: "James Wilson",
              size: "2.1 MB",
              tags: ["trading", "positions", "Q1"],
              status: "active",
              lastModified: "2024-04-15",
              version: 1,
              path: ["04. Bookkeeping & Trading", "2024"]
            }
          },
          {
            id: "trading-summary-q1",
            name: "Q1 2024 Trading Summary.pdf",
            type: "document",
            metadata: {
              id: "doc-007c",
              name: "Q1 2024 Trading Summary",
              fileName: "Q1 2024 Trading Summary.pdf",
              fileType: "pdf",
              category: "financials",
              uploadDate: "2024-04-15",
              uploaderId: "user-009",
              uploaderName: "James Wilson",
              size: "0.8 MB",
              tags: ["trading", "summary", "Q1"],
              status: "active",
              lastModified: "2024-04-15",
              version: 1,
              path: ["04. Bookkeeping & Trading", "2024"]
            }
          }
        ]
      }
    ]
  },
  {
    id: "05-aml-kyc",
    name: "05. AML & KYC",
    type: "folder",
    children: [
      {
        id: "borrowers",
        name: "Borrowers",
        type: "folder",
        children: [
          {
            id: "borrower-kyc",
            name: "Borrower KYC Package.pdf",
            type: "document",
            metadata: {
              id: "doc-008",
              name: "Borrower KYC Package",
              fileName: "Borrower KYC Package.pdf",
              fileType: "pdf",
              category: "aml",
              uploadDate: "2024-03-01",
              uploaderId: "user-006",
              uploaderName: "Alice Chen",
              size: "4.5 MB",
              tags: ["kyc", "borrower"],
              status: "active",
              lastModified: "2024-03-01",
              version: 1,
              path: ["05. AML & KYC", "Borrowers"]
            }
          },
          {
            id: "borrower-screening",
            name: "Borrower Screening Report.pdf",
            type: "document",
            metadata: {
              id: "doc-008b",
              name: "Borrower Screening Report",
              fileName: "Borrower Screening Report.pdf",
              fileType: "pdf",
              category: "aml",
              uploadDate: "2024-03-01",
              uploaderId: "user-006",
              uploaderName: "Alice Chen",
              size: "2.8 MB",
              tags: ["screening", "borrower"],
              status: "active",
              lastModified: "2024-03-01",
              version: 1,
              path: ["05. AML & KYC", "Borrowers"]
            }
          },
          {
            id: "borrower-ownership",
            name: "Borrower Ownership Structure.pdf",
            type: "document",
            metadata: {
              id: "doc-008c",
              name: "Borrower Ownership Structure",
              fileName: "Borrower Ownership Structure.pdf",
              fileType: "pdf",
              category: "aml",
              uploadDate: "2024-03-01",
              uploaderId: "user-006",
              uploaderName: "Alice Chen",
              size: "1.2 MB",
              tags: ["ownership", "borrower"],
              status: "active",
              lastModified: "2024-03-01",
              version: 1,
              path: ["05. AML & KYC", "Borrowers"]
            }
          }
        ]
      }
    ]
  },
  {
    id: "06-miscellaneous",
    name: "06. Miscellaneous",
    type: "folder",
    children: [
      {
        id: "agency-docs",
        name: "Agency Documents",
        type: "folder",
        children: [
          {
            id: "agency-fee-letter",
            name: "Agency Fee Letter.docx",
            type: "document",
            metadata: {
              id: "doc-009",
              name: "Agency Fee Letter",
              fileName: "Agency Fee Letter.docx",
              fileType: "docx",
              category: "others",
              uploadDate: "2024-03-15",
              uploaderId: "user-007",
              uploaderName: "Robert Taylor",
              size: "0.8 MB",
              tags: ["agency", "fees"],
              status: "active",
              lastModified: "2024-03-15",
              version: 1,
              path: ["06. Miscellaneous", "Agency Documents"]
            }
          },
          {
            id: "agency-contacts",
            name: "Agency Contact List.xlsx",
            type: "document",
            metadata: {
              id: "doc-009b",
              name: "Agency Contact List",
              fileName: "Agency Contact List.xlsx",
              fileType: "xlsx",
              category: "others",
              uploadDate: "2024-03-15",
              uploaderId: "user-007",
              uploaderName: "Robert Taylor",
              size: "0.3 MB",
              tags: ["agency", "contacts"],
              status: "active",
              lastModified: "2024-03-15",
              version: 1,
              path: ["06. Miscellaneous", "Agency Documents"]
            }
          },
          {
            id: "agency-procedures",
            name: "Agency Procedures Manual.pdf",
            type: "document",
            metadata: {
              id: "doc-009c",
              name: "Agency Procedures Manual",
              fileName: "Agency Procedures Manual.pdf",
              fileType: "pdf",
              category: "others",
              uploadDate: "2024-03-15",
              uploaderId: "user-007",
              uploaderName: "Robert Taylor",
              size: "2.5 MB",
              tags: ["agency", "procedures"],
              status: "active",
              lastModified: "2024-03-15",
              version: 1,
              path: ["06. Miscellaneous", "Agency Documents"]
            }
          }
        ]
      }
    ]
  }
];

const DocumentsTab = () => {
  const [selectedNode, setSelectedNode] = useState<DocumentTreeNode | null>(null);
  const [showExtractor, setShowExtractor] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentMetadata | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentMetadata[]>([]);

  const handleNodeSelect = (node: DocumentTreeNode) => {
    setSelectedNode(node);
    if (node.type === "document" && node.metadata) {
      setSelectedDocument(node.metadata);
    }
  };

  const handleDocumentSelect = (document: DocumentMetadata) => {
    setSelectedDocuments(current => {
      const isSelected = current.some(doc => doc.id === document.id);
      if (isSelected) {
        return current.filter(doc => doc.id !== document.id);
      } else {
        return [...current, document];
      }
    });
  };

  const handleSearch = (filters: DocumentSearchFilters) => {
    // TODO: Implement search functionality
    console.log('Search filters:', filters);
  };

  const handleShowAssistant = () => {
    if (selectedDocument) {
      setShowAssistant(true);
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      {/* Header section */}
      <div className="space-y-4 mb-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex gap-3">
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
            <Button variant="outline" className="gap-1" onClick={() => setShowExtractor(true)}>
              <BookOpen className="h-4 w-4" />
              Contracts AI Extractor
            </Button>
          </div>
          <div className="flex gap-2 flex-1 max-w-2xl">
            <DocumentSearch onSearch={handleSearch} />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setViewMode(current => current === 'list' ? 'grid' : 'list')}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Integration indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="gap-1 px-2 py-0.5 border-dashed">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Synced with Intralinks
            </Badge>
            <span className="text-xs">Last synced: May 1, 2025</span>
          </div>
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <CircleHelp className="h-3.5 w-3.5" />
            Document Help
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Folder tree */}
        <div className="min-w-[250px] max-w-[300px] h-full overflow-y-auto border-r">
          <FolderTree
            data={mockFolderStructure}
            onSelect={handleNodeSelect}
            selectedId={selectedNode?.id}
          />
        </div>

        {/* Document list and info */}
        <div className="flex-1 flex gap-6">
          {/* Document list */}
          <div className="flex-1 overflow-y-auto">
            {selectedNode?.type === 'folder' && selectedNode.children && (
              <div className="space-y-2">
                {selectedNode.children.map((node) => {
                  if (node.type === 'document' && node.metadata) {
                    const isSelected = selectedDocuments.some(doc => doc.id === node.metadata?.id);
                    return (
                      <div
                        key={node.id}
                        className={`flex items-center gap-3 p-2 rounded-lg border ${
                          isSelected ? 'bg-secondary' : 'hover:bg-secondary/50'
                        } cursor-pointer`}
                        onClick={() => handleDocumentSelect(node.metadata!)}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleDocumentSelect(node.metadata!)}
                          className="h-4 w-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{node.name}</span>
                            <Badge 
                              style={{ backgroundColor: CATEGORY_COLORS[node.metadata.category] }}
                              className="text-white"
                            >
                              {node.metadata.category.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {node.metadata.uploadDate} • {node.metadata.size}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDocument(node.metadata);
                              handleShowAssistant();
                            }}
                          >
                            <Stars className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDocument(node.metadata);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>

          {/* Document info or AI assistant */}
          <div className="w-[400px]">
            {showExtractor ? (
              <ContractsAIExtractor
                onClose={() => setShowExtractor(false)}
                onMinimize={() => setShowExtractor(false)}
              />
            ) : selectedDocument ? (
              <DocumentInfo
                document={selectedDocument}
                onPreview={() => {}}
                onDownload={() => {}}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-6 text-center">
                <div className="text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>Select a document to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant Dialog */}
      {showAssistant && selectedDocument && (
        <DocumentAssistant
          document={selectedDocument}
          onClose={() => setShowAssistant(false)}
        />
      )}
    </div>
  );
};

export default DocumentsTab;
