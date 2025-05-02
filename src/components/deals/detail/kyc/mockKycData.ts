
// Mock KYC data
export const mockKycData = [
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

export type KycEntity = typeof mockKycData[0];
export type KycStatus = "approved" | "pending" | "flagged" | "expired" | "not_started";
export type DocumentStatus = "verified" | "pending" | "not_submitted";
export type CheckStatus = "Passed" | "Pending" | "Flagged" | "Not Started";
