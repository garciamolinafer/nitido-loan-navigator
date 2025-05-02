
export interface Document {
  id: string;
  title: string;
  fileName: string;
  fileType: "pdf" | "docx" | "xlsx" | "png" | "jpg";
  category: "legal" | "financial" | "notices" | "kyc" | "miscellaneous";
  uploadDate: string;
  size: string;
  status?: "new" | "reviewed" | "draft" | "pending";
  description?: string;
}

export const mockDocuments: Document[] = [
  // Legal Agreements
  {
    id: "doc-001",
    title: "Credit Agreement",
    fileName: "CreditAgreement.pdf",
    fileType: "pdf",
    category: "legal",
    uploadDate: "Jan 1, 2025",
    size: "2.4 MB",
    description: "Final signed credit agreement"
  },
  {
    id: "doc-002",
    title: "Security Agreement",
    fileName: "SecurityAgreement.pdf",
    fileType: "pdf",
    category: "legal",
    uploadDate: "Jan 1, 2025",
    size: "1.8 MB"
  },
  {
    id: "doc-003",
    title: "Intercreditor Agreement",
    fileName: "Intercreditor_Agreement.pdf",
    fileType: "pdf",
    category: "legal",
    uploadDate: "Jan 1, 2025",
    size: "3.2 MB"
  },
  {
    id: "doc-004",
    title: "Amendment No.1",
    fileName: "Amendment_No1.pdf",
    fileType: "pdf",
    category: "legal",
    uploadDate: "Mar 20, 2025",
    size: "0.8 MB",
    status: "new"
  },
  
  // Financial Reports
  {
    id: "doc-005",
    title: "Q1 2025 Financials",
    fileName: "AlphaCo_Q1_2025_Financials.xlsx",
    fileType: "xlsx",
    category: "financial",
    uploadDate: "Apr 15, 2025",
    size: "1.2 MB",
    status: "new"
  },
  {
    id: "doc-006",
    title: "Compliance Certificate Q4 2024",
    fileName: "ComplianceCert_Q4_2024.pdf",
    fileType: "pdf",
    category: "financial",
    uploadDate: "Mar 1, 2025",
    size: "0.5 MB",
    status: "reviewed"
  },
  {
    id: "doc-007",
    title: "Annual Report 2024",
    fileName: "AnnualReport_2024.pdf",
    fileType: "pdf",
    category: "financial",
    uploadDate: "Feb 28, 2025",
    size: "4.2 MB"
  },
  
  // Notices & Communications
  {
    id: "doc-008",
    title: "Utilization Notice - Jan 2025",
    fileName: "UtilizationNotice_Jan2025.docx",
    fileType: "docx",
    category: "notices",
    uploadDate: "Jan 5, 2025",
    size: "0.3 MB"
  },
  {
    id: "doc-009",
    title: "Rate Change Notice - Mar 2025",
    fileName: "RateChangeNotice_Mar2025.pdf",
    fileType: "pdf",
    category: "notices",
    uploadDate: "Mar 10, 2025",
    size: "0.4 MB",
    status: "new"
  },
  
  // KYC/Compliance Docs
  {
    id: "doc-010",
    title: "KYC - Alpha Corporation",
    fileName: "KYC_AlphaCo.pdf",
    fileType: "pdf",
    category: "kyc",
    uploadDate: "Dec 15, 2024",
    size: "1.7 MB",
    status: "reviewed"
  },
  {
    id: "doc-011",
    title: "Sanctions Check - Delta Bank",
    fileName: "SanctionsCheck_DeltaBank.pdf",
    fileType: "pdf",
    category: "kyc",
    uploadDate: "Dec 20, 2024",
    size: "0.9 MB"
  },
  
  // Miscellaneous
  {
    id: "doc-012",
    title: "Meeting Minutes - Feb 2025",
    fileName: "MeetingMinutes_Feb2025.docx",
    fileType: "docx",
    category: "miscellaneous",
    uploadDate: "Feb 15, 2025",
    size: "0.2 MB"
  },
  {
    id: "doc-013",
    title: "Fee Schedule",
    fileName: "FeeSchedule.png",
    fileType: "png",
    category: "miscellaneous",
    uploadDate: "Jan 2, 2025",
    size: "0.1 MB"
  }
];

export const documentCategories = [
  { id: "legal", name: "Legal Agreements", description: "Credit agreements, security documents, and amendments" },
  { id: "financial", name: "Financial Reports", description: "Financial statements, compliance certificates, and reports" },
  { id: "notices", name: "Notices & Communications", description: "Formal notices, letters, and communications" },
  { id: "kyc", name: "KYC/Compliance Docs", description: "Know Your Customer and compliance documentation" },
  { id: "miscellaneous", name: "Miscellaneous", description: "Other deal-related documents and files" }
];
