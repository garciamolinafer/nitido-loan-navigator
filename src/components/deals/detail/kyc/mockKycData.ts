
// Mock KYC data
export const mockKycData = [
  {
    id: "kyc-1",
    entityName: "Alpha Corporation",
    entityType: "Borrower",
    status: "approved" as KycStatus,
    lastUpdated: "Jan 15, 2025",
    expiryDate: "Jan 15, 2026",
    contact: "Michael Chen",
    riskScore: "Low",
    sanctionsCheck: "Passed" as CheckStatus,
    amlCheck: "Passed" as CheckStatus,
    pepCheck: "Passed" as CheckStatus,
    documents: [
      { name: "Certificate of Incorporation", status: "verified" as DocumentStatus },
      { name: "Beneficial Ownership Declaration", status: "verified" as DocumentStatus },
      { name: "Board Resolution", status: "verified" as DocumentStatus }
    ]
  },
  {
    id: "kyc-2",
    entityName: "Beta Investments",
    entityType: "Guarantor",
    status: "pending" as KycStatus,
    lastUpdated: "Apr 22, 2025",
    expiryDate: "-",
    contact: "Sarah Johnson",
    riskScore: "Medium",
    sanctionsCheck: "Pending" as CheckStatus,
    amlCheck: "Passed" as CheckStatus,
    pepCheck: "Pending" as CheckStatus,
    documents: [
      { name: "Certificate of Incorporation", status: "verified" as DocumentStatus },
      { name: "Beneficial Ownership Declaration", status: "pending" as DocumentStatus },
      { name: "Board Resolution", status: "not_submitted" as DocumentStatus }
    ],
    missingInfo: "Beneficial ownership information and board resolution"
  },
  {
    id: "kyc-3",
    entityName: "Delta Financial Services",
    entityType: "Lender",
    status: "approved" as KycStatus,
    lastUpdated: "Mar 3, 2025",
    expiryDate: "Mar 3, 2026",
    contact: "David Wilson",
    riskScore: "Low",
    sanctionsCheck: "Passed" as CheckStatus,
    amlCheck: "Passed" as CheckStatus,
    pepCheck: "Passed" as CheckStatus,
    documents: [
      { name: "Certificate of Incorporation", status: "verified" as DocumentStatus },
      { name: "Beneficial Ownership Declaration", status: "verified" as DocumentStatus },
      { name: "Board Resolution", status: "verified" as DocumentStatus }
    ]
  },
  {
    id: "kyc-4",
    entityName: "Gamma Holdings Ltd",
    entityType: "Borrower Subsidiary",
    status: "flagged" as KycStatus,
    lastUpdated: "Apr 10, 2025",
    expiryDate: "-",
    contact: "Sophia Martinez",
    riskScore: "High",
    sanctionsCheck: "Flagged" as CheckStatus,
    amlCheck: "Passed" as CheckStatus,
    pepCheck: "Flagged" as CheckStatus,
    documents: [
      { name: "Certificate of Incorporation", status: "verified" as DocumentStatus },
      { name: "Beneficial Ownership Declaration", status: "verified" as DocumentStatus },
      { name: "Board Resolution", status: "verified" as DocumentStatus }
    ],
    flagDetails: "PEP Match: Two board members are former government officials. Enhanced due diligence required. FinScan Score: 87 (High)."
  },
  {
    id: "kyc-5",
    entityName: "Omega Bank",
    entityType: "Lender",
    status: "expired" as KycStatus,
    lastUpdated: "Dec 5, 2024",
    expiryDate: "Apr 1, 2025",
    contact: "James Wilson",
    riskScore: "Low",
    sanctionsCheck: "Passed" as CheckStatus,
    amlCheck: "Passed" as CheckStatus,
    pepCheck: "Passed" as CheckStatus,
    documents: [
      { name: "Certificate of Incorporation", status: "verified" as DocumentStatus },
      { name: "Beneficial Ownership Declaration", status: "verified" as DocumentStatus },
      { name: "Board Resolution", status: "verified" as DocumentStatus }
    ]
  },
  {
    id: "kyc-6",
    entityName: "EFG Bank",
    entityType: "Lender",
    status: "pending" as KycStatus,
    lastUpdated: "Apr 20, 2025",
    expiryDate: "-",
    contact: "Carol Smith",
    riskScore: "Medium",
    sanctionsCheck: "Passed" as CheckStatus,
    amlCheck: "Passed" as CheckStatus,
    pepCheck: "Pending" as CheckStatus,
    documents: [
      { name: "Certificate of Incorporation", status: "verified" as DocumentStatus },
      { name: "Beneficial Ownership Declaration", status: "pending" as DocumentStatus },
      { name: "Board Resolution", status: "verified" as DocumentStatus }
    ],
    missingInfo: "Beneficial ownership information"
  },
  {
    id: "kyc-7",
    entityName: "HK Finance",
    entityType: "Lender",
    status: "flagged" as KycStatus,
    lastUpdated: "Apr 18, 2025",
    expiryDate: "-",
    contact: "Daniel Wu",
    riskScore: "High",
    sanctionsCheck: "Flagged" as CheckStatus,
    amlCheck: "Passed" as CheckStatus,
    pepCheck: "Flagged" as CheckStatus,
    documents: [
      { name: "Certificate of Incorporation", status: "verified" as DocumentStatus },
      { name: "Beneficial Ownership Declaration", status: "verified" as DocumentStatus },
      { name: "Board Resolution", status: "verified" as DocumentStatus }
    ],
    flagDetails: "PEP Match: Individual shareholder is a former minister. FinScan Score: 85 (High). Additional due diligence required."
  },
  {
    id: "kyc-8",
    entityName: "Zeta Investments",
    entityType: "Lender",
    status: "not_started" as KycStatus,
    lastUpdated: "-",
    expiryDate: "-",
    contact: "Emma Kumar",
    riskScore: "-",
    sanctionsCheck: "Not Started" as CheckStatus,
    amlCheck: "Not Started" as CheckStatus,
    pepCheck: "Not Started" as CheckStatus,
    documents: [
      { name: "Certificate of Incorporation", status: "not_submitted" as DocumentStatus },
      { name: "Beneficial Ownership Declaration", status: "not_submitted" as DocumentStatus },
      { name: "Board Resolution", status: "not_submitted" as DocumentStatus }
    ]
  }
];

export type KycEntity = typeof mockKycData[0];
export type KycStatus = "approved" | "pending" | "flagged" | "expired" | "not_started";
export type DocumentStatus = "verified" | "pending" | "not_submitted";
export type CheckStatus = "Passed" | "Pending" | "Flagged" | "Not Started";
