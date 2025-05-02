
import { Deal } from "@/hooks/useDealData";

export const dealData: Deal[] = [
  {
    id: "eland-001",
    name: "Project Eland Windfarm",
    type: "Project Finance",
    amount: "€380M",
    lenders: 6,
    region: "UK",
    leadArranger: "NatWest",
    signedDate: "Mar 2025",
    maturityDate: "Sep 2040",
    status: "Active",
    flag: {
      type: "error",
      message: "KYC Missing"
    },
    description: "Renewable energy project finance deal"
  },
  {
    id: "apollo-002",
    name: "Apollo Energy Corp",
    type: "Term Loan B",
    amount: "€650M",
    lenders: 8,
    region: "US",
    leadArranger: "Barclays",
    signedDate: "Feb 2025",
    maturityDate: "Feb 2032",
    status: "Active",
    description: "Large corporate Term Loan B financing"
  },
  {
    id: "beta-003",
    name: "Beta Rail Infrastructure",
    type: "RCF + Term Loan",
    amount: "€900M",
    lenders: 12,
    region: "ES",
    leadArranger: "Santander",
    signedDate: "Apr 2025",
    maturityDate: "Apr 2035",
    status: "Active",
    flag: {
      type: "warning",
      message: "Document Action Required"
    },
    description: "Mixed Revolving Credit + Term Loan structure for infrastructure"
  },
  {
    id: "gammatech-004",
    name: "GammaTech Series C Facility",
    type: "Convertible Loan",
    amount: "€120M",
    lenders: 4,
    region: "ES",
    leadArranger: "BBVA",
    signedDate: "Nov 2024",
    maturityDate: "Nov 2028",
    status: "Closed",
    description: "Convertible loan for a tech company's funding round (completed)"
  },
  {
    id: "borealis-005",
    name: "Borealis Equity Partners",
    type: "Leveraged Loan",
    amount: "€440M",
    lenders: 9,
    region: "DE",
    leadArranger: "Deutsche Bank",
    signedDate: "Jan 2025",
    maturityDate: "Jan 2030",
    status: "Monitoring",
    flag: {
      type: "error",
      message: "Covenant Breach"
    },
    description: "Leveraged loan for a private equity deal, under post-close monitoring"
  },
  {
    id: "outerbanks-006",
    name: "Outer Banks Real Estate",
    type: "Syndicated Mortgage",
    amount: "€210M",
    lenders: 5,
    region: "FR",
    leadArranger: "BNP Paribas",
    signedDate: "Dec 2024",
    maturityDate: "Dec 2034",
    status: "Active",
    description: "Real estate financing through a syndicated mortgage"
  },
  {
    id: "novaflux-007",
    name: "Novaflux Green Transition Fund",
    type: "Bridge Loan",
    amount: "€300M",
    lenders: 7,
    region: "NL",
    leadArranger: "ING",
    signedDate: "Pending",
    maturityDate: "Jun 2026",
    status: "Pending Review",
    flag: {
      type: "info",
      message: "Pending Rollover"
    },
    description: "Bridge loan for short-term funding"
  },
  {
    id: "vivazinc-008",
    name: "VivaZinc Metals Trade",
    type: "Asset-Backed Revolver",
    amount: "€110M",
    lenders: 3,
    region: "PT",
    leadArranger: "Millennium BCP",
    signedDate: "Mar 2025",
    maturityDate: "Mar 2028",
    status: "Active",
    description: "Asset-backed revolving credit for commodity financing"
  },
  {
    id: "verona-009",
    name: "Verona Airport Upgrade",
    type: "Public-Private Finance",
    amount: "€530M",
    lenders: 6,
    region: "IT",
    leadArranger: "UniCredit",
    signedDate: "Pending",
    maturityDate: "Dec 2045",
    status: "Pending Review",
    description: "Public-private partnership for infrastructure development"
  },
  {
    id: "libratel-010",
    name: "LibraTel Telecom Group",
    type: "Cross-Border LBO Loan",
    amount: "€870M",
    lenders: 10,
    region: "US/ES",
    leadArranger: "J.P. Morgan",
    signedDate: "Feb 2025",
    maturityDate: "Feb 2032",
    status: "Active",
    description: "Cross-border leveraged buyout loan"
  },
  {
    id: "delta-011",
    name: "Delta Biotech Licensing Loan",
    type: "IP-Backed Loan",
    amount: "€150M",
    lenders: 6,
    region: "UK",
    leadArranger: "HSBC",
    signedDate: "Apr 2025",
    maturityDate: "Apr 2030",
    status: "Active",
    description: "Intellectual property-backed loan for biotech's licensing needs"
  },
  {
    id: "zeta-012",
    name: "Zeta Shipping Group",
    type: "Shipping Loan",
    amount: "€320M",
    lenders: 4,
    region: "CY/GR",
    leadArranger: "Piraeus Bank",
    signedDate: "Dec 2024",
    maturityDate: "Dec 2032",
    status: "Monitoring",
    description: "Shipping industry loan across Cyprus/Greece, under monitoring"
  }
];
